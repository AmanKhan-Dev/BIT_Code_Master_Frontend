import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuestionById, updateQuestion } from "../../../utils/QuizService";
import axios from "axios";
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';

const UpdateQuestion = () => {
	const { id } = useParams();
	const navigate = useNavigate();
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
	const [categoryMessage, setCategoryMessage] = useState(""); 
	const [isLoading, setIsLoading] = useState(true);
  
	useEffect(() => {
		fetchQuestion();
	}, [id]);

	const fetchQuestion = async () => {
		try {
			const questionToUpdate = await getQuestionById(id);
			if (questionToUpdate) {
				setQuestionText(questionToUpdate.question);
				setQuestionDescription(questionToUpdate.question_description);
				setQuestionCategory(questionToUpdate.question_category);
				setSampleInput(questionToUpdate.sampleInput || "");
				setSampleOutput(questionToUpdate.sampleOutput || "");
				setTestCases(questionToUpdate.testCases || [{ input: "", output: "" }]);
				setQuestionNumber(questionToUpdate.questionNumber);
			}
			setIsLoading(false);
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

	const handleAddCategory = async () => {
		if (!newCategory.trim()) {
			setCategoryMessage("Category name cannot be empty.");
			return;
		}
		try {
			const categoryData = {
				id: {
					question_set_id: id,
					available_category: newCategory
				}
			};

			const response = await axios.post("https://measuring-advanced-yoga-cooking.trycloudflare.com/api/categories/add", categoryData);

			setCategoryOptions([...categoryOptions, newCategory]);
			setNewCategory("");
			setCategoryMessage("Category added successfully!");
			setQuestionCategory(newCategory);
		} catch (error) {
			console.error("Error adding category:", error);
			setCategoryMessage("Error adding category. Please try again.");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const questionToUpdate = {
				id: {
					questionSetId: id,
					questionNo: parseInt(questionNumber)
				},
				question,
				question_description: questionDescription,
				question_category: questionCategory === "New" ? newCategory : questionCategory,
			};

			await updateQuestion(id, questionToUpdate);

			// Handle updating the test cases
			await addTestCases(questionToUpdate.id);

			alert('Question and Test Cases Updated Successfully');
			navigate("/all-quizzes");
		} catch (error) {
			console.error("Error updating the question:", error);
		}
	};

	const addTestCases = async (questionId) => {
		const testCasesToAdd = testCases.map(testCase => ({
			questionSetId: questionId.questionSetId,
			questionNo: questionId.questionNo,
			testCaseInput: testCase.input,
			testCaseOutput: testCase.output,
		}));

		try {
			await axios.post("https://measuring-advanced-yoga-cooking.trycloudflare.com/api/testcases/add", testCasesToAdd);
		} catch (error) {
			console.error("Error updating test cases:", error);
		}
	};

	const handleRunCode = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await axios.post('https://measuring-advanced-yoga-cooking.trycloudflare.com/api/compiler/compile', {
				sourceCode,
				language: language === 'c_cpp' ? 'C++' : 'C',
				userInput,
			});

			setResult(response.data);
		} catch (error) {
			console.error("Error running code:", error);
			setResult(error.response?.data || 'An unexpected error occurred');
		} finally {
			setLoading(false);
		}
	};

	if (isLoading) {
		return <p>Loading...</p>;
	}

	return (
		<div className="container">
			<h4 className="mt-5" style={{ color: "GrayText" }}>Update Quiz Question</h4>
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
							<option key={index} value={option}>{option}</option>
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
							/>
						</div>
						<div>
							<label className="form-label">Test Case Output {index + 1}</label>
							<textarea
								type="text"
								value={testCase.output}
								onChange={(e) => handleTestCaseChange(index, "output", e.target.value)}
								className="form-control"
							/>
						</div>
						<button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveTestCase(index)}>
							Remove Test Case
						</button>
					</div>
				))}
				<button type="button" className="btn btn-secondary" onClick={handleAddTestCase}>
					Add Test Case
				</button>

				<div className="mb-3">
					<label className="form-label">Source Code</label>
					<AceEditor
						mode="c_cpp"
						theme="github"
						name="sourceCode"
						value={sourceCode}
						onChange={setSourceCode}
						fontSize={14}
						width="100%"
						height="200px"
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">User Input</label>
					<textarea
						value={userInput}
						onChange={(e) => setUserInput(e.target.value)}
						className="form-control"
					/>
				</div>

				<div className="mb-3">
					<label className="form-label">Language</label>
					<select value={language} onChange={(e) => setLanguage(e.target.value)} className="form-control">
						<option value="c_cpp">C/C++</option>
					</select>
				</div>

				<button type="submit" className="btn btn-primary mt-3">
					Update Question
				</button>
				<button type="button" className="btn btn-secondary mt-3" onClick={handleRunCode}>
					Run Code
				</button>
			</form>

			<div className="mt-4">
				{loading ? (
					<p>Loading...</p>
				) : (
					<div>
						<h5>Output</h5>
						<pre>{result}</pre>
					</div>
				)}
			</div>
		</div>
	);
};

export default UpdateQuestion;
