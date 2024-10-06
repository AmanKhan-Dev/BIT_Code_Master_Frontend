import React, { useEffect, useState } from "react";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';
import axios from "axios";


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
  const [response, setResponse] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategories(); // Call your backend to get categories
      setCategoryOptions(categoriesData);
    } catch (error) {
      console.error(error);
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
      const result = {
        question,
        questionDescription,
        questionCategory,
        sampleInput,
        sampleOutput,
        testCases
      };

      console.log("Data to be submitted:", result);

      await createQuestion(result);

      setQuestionText("");
      setQuestionDescription("");
      setQuestionCategory("");
      setSampleInput("");
      setSampleOutput("");
      setTestCases([{ input: "", output: "" }]);
    } catch (error) {
      console.error("Error saving the question:", error);
    }
  };

 
  const handleRunCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(""); // Clear previous response

    try {
        const response = await axios.post('http://localhost:8080/api/compiler/compile', {
            sourceCode,
            language: language === 'c_cpp' ? 'C++' : 'C',
            userInput,
        });

        const resultData = response.data;
        setResult(resultData); // Set the raw response directly
    } catch (error) {
        // Log the error for debugging purposes
        console.error("Error running code:", error);

        // Get the raw response from the error
        const errorMessage = error.response
            ? error.response.data
            : error.message || 'An unexpected error occurred';

        setResult(errorMessage); // Display the raw error message directly
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="add-question-container">
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
          style={{ borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <textarea
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Enter input for your program (if any)"
          rows="4"
          className="user-input"
        />
        <button
          onClick={handleRunCode}
          className="btn btn-outline-primary mt-2"
        >
          Run Code
        </button>
        {loading && <div className="loading">Running...</div>}
        <pre className="result-output">{result}</pre>
      </div>

      <div className="form-section">
        <form onSubmit={handleSubmit}>
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
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
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
              className="form-control"
              rows="2"
              value={sampleInput}
              onChange={(e) => setSampleInput(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="form-label">Sample Output</label>
            <textarea
              className="form-control"
              rows="2"
              value={sampleOutput}
              onChange={(e) => setSampleOutput(e.target.value)}
            ></textarea>
          </div>

          <div className="test-cases-section">
            <label className="form-label">Test Cases</label>
            {testCases.map((testCase, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  placeholder="Test Case Input"
                  value={testCase.input}
                  onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  placeholder="Test Case Output"
                  value={testCase.output}
                  onChange={(e) => handleTestCaseChange(index, "output", e.target.value)}
                  className="form-control mb-2"
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveTestCase(index)}
                    className="btn btn-outline-danger mb-2"
                  >
                    Remove Test Case
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTestCase}
              className="btn btn-outline-info"
            >
              Add Test Case
            </button>
          </div>

          <button type="submit" className="btn btn-outline-success mt-2">
            Save Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion