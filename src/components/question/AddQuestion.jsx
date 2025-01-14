import React, { useEffect, useState } from "react";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';
import axios from "axios";
import { useLocation } from "react-router-dom"; 

const AddQuestion = () => {
  const [question, setQuestionText] = useState("");
  const [questionDescription, setQuestionDescription] = useState("");
  const [questionCategory, setQuestionCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [testCases, setTestCases] = useState([{ input: "", output: "" }]);
  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const [sourceCode, setSourceCode] = useState('');
  const [language, setLanguage] = useState('c_cpp');
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [questionNumber, setQuestionNumber] = useState("");
  const [categoryMessage, setCategoryMessage] = useState(""); // State to hold category messages

  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search);
  const questionSetId = queryParams.get("setId"); 

  useEffect(() => {
    fetchCategories();
  }, [questionSetId]);

  const fetchCategories = async () => {
    if (!questionSetId) return; 
    try {
      const response = await axios.get(`https://bit-code-master-backend-879855cbe9fa.herokuapp.com/api/categories/set/${questionSetId}`);
      setCategoryOptions(response.data); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleRemoveTestCase = (index) => {
    setTestCases(testCases.filter((_, i) => i !== index));
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = testCases.map((testCase, i) =>
      i === index ? { ...testCase, [field]: value } : testCase
    );
    setTestCases(updatedTestCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const questionId = {
            questionSetId: questionSetId,
            questionNo: parseInt(questionNumber), // Ensure it's an integer
        };
        
        const questionAdder = {
            id: questionId,
            question: question,
            question_description: questionDescription,
            question_category: questionCategory === "New" ? newCategory : questionCategory, // Use new category if selected
        };

        console.log("Data to be submitted:", questionAdder);

        // Send POST request to add the question
        await axios.post("https://bit-code-master-backend-879855cbe9fa.herokuapp.com/codingQuestions/add", questionAdder);
        
        // After the question is added, send the test cases
        await addTestCases(questionId); // Call the function to add test cases

        // Reset fields after submission
        setQuestionText("");
        setQuestionDescription("");
        setQuestionCategory("");
        setSampleInput("");
        setSampleOutput("");
        setTestCases([{ input: "", output: "" }]);
        setQuestionNumber(""); // Reset question number
        setNewCategory(""); // Reset new category input
        alert('Question and Test Cases Added Successfully');
    } catch (error) {
        console.error("Error saving the question:", error);
    }
};

// Function to add test cases
const addTestCases = async (questionId) => {
    const testCasesToAdd = testCases.map(testCase => ({
        questionSetId: questionId.questionSetId,
        questionNo: questionId.questionNo,
        testCaseInput: testCase.input,
        testCaseOutput: testCase.output,
    }));

    try {
        // Send POST request to add test cases
        await axios.post("https://bit-code-master-backend-879855cbe9fa.herokuapp.com/api/testcases/add", testCasesToAdd);
        console.log("Test cases added successfully:", testCasesToAdd);
    } catch (error) {
        console.error("Error adding test cases:", error);
        alert("Error adding test cases. Please check the console for more details.");
    }
};

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
        setCategoryMessage("Category name cannot be empty.");
        return;
    }
    try {
        // Prepare the category object in the specified format
        const categoryData = {
            id: {
                question_set_id: questionSetId, // Using the set ID from the query params
                available_category: newCategory // The new category name
            }
        };

        const response = await axios.post("https://bit-code-master-backend-879855cbe9fa.herokuapp.com/api/categories/add", categoryData);

        // Add new category to the local state to update UI
        setCategoryOptions([...categoryOptions, newCategory]);
        setNewCategory(""); // Reset the input field
        setCategoryMessage("Category added successfully!");

        // Optional: Automatically select the new category
        setQuestionCategory(newCategory);
    } catch (error) {
        console.error("Error adding category:", error);
        setCategoryMessage("Error adding category. Please try again.");
    }
};


  const handleRunCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://bit-code-master-backend-879855cbe9fa.herokuapp.com/api/compiler/compile', {
        sourceCode,
        language: language === 'c_cpp' ? 'C++' : 'C',
        userInput,
      });

      setResult(response.data); 
    } catch (error) {
      console.error("Error running code:", error);
      const errorMessage = error.response ? error.response.data : error.message || 'An unexpected error occurred';
      setResult(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-question-container">
      <h4>Question Set ID: {questionSetId}</h4> 

      <div className="code-editor-section">
        <h5>Code Editor</h5>
        <AceEditor
          mode={language}
          theme="github"
          name="codeEditor"
          value={sourceCode}
          onChange={(newValue) => setSourceCode(newValue)}
          width="100%"
          height="400px"
          editorProps={{ $blockScrolling: true }}
        />
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter input for your program (if any)"
          rows="4"
          className="user-input"
        />
        <button onClick={handleRunCode} className="btn btn-outline-primary mt-2">
          Run Code
        </button>
        {loading && <div className="loading">Running...</div>}
        <pre className="result-output">{result}</pre>
      </div>

      <div className="form-section">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="questionNumber" className="form-label">Question Number</label>
            <input
              type="text"
              id="questionNumber"
              value={questionNumber}
              onChange={(e) => setQuestionNumber(e.target.value)}
              className="form-control"
              placeholder="Enter Question Number"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label">Select a Category</label>
            <select
              id="category"
              value={questionCategory}
              onChange={(e) => setQuestionCategory(e.target.value)}
              className="form-control"
            >
              <option value="">Select category</option>
              <option value="New">Add New</option>
              {categoryOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {questionCategory === "New" && (
            <div className="mb-3">
              <input
                type="text"
                placeholder="Add New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="form-control"
              />
              <button type="button" className="btn btn-outline-secondary mt-2" onClick={handleAddCategory}>
                Add Category
              </button>
              {categoryMessage && <div className="text-success mt-1">{categoryMessage}</div>}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="question" className="form-label">Question</label>
            <textarea
              id="question"
              value={question}
              onChange={(e) => setQuestionText(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              value={questionDescription}
              onChange={(e) => setQuestionDescription(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Sample Input</label>
            <textarea
              type="text"
              value={sampleInput}
              onChange={(e) => setSampleInput(e.target.value)}
              className="form-control"
              placeholder="Enter sample input"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Sample Output</label>
            <textarea
              type="text"
              value={sampleOutput}
              onChange={(e) => setSampleOutput(e.target.value)}
              className="form-control"
              placeholder="Enter sample output"
            />
          </div>

          {testCases.map((testCase, index) => (
            <div key={index} className="test-case mb-3">
              <div>
                <label className="form-label">Test Case Input {index + 1}</label>
                <textarea
                  type="text"
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
                  className="form-control"
                  placeholder="Test case input"
                />
                <label className="form-label">Test Case Output {index + 1}</label>
                <textarea
                  type="text"
                  value={testCase.output}
                  onChange={(e) => handleTestCaseChange(index, "output", e.target.value)}
                  className="form-control"
                  placeholder="Test case output"
                />
              </div>
              <button type="button" onClick={() => handleRemoveTestCase(index)} className="btn btn-danger mt-2">
                Remove Test Case
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddTestCase} className="btn btn-outline-secondary mb-3">
            Add Test Case
          </button>

          <button  type="submit" className="btn btn-primary">Add Question</button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;
