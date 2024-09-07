import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp'; // For C and C++
import 'ace-builds/src-noconflict/theme-github'; // Choose a theme you like
import 'ace-builds/src-noconflict/ext-language_tools'; // For autocomplete

const QuestionDetail = () => {
  const { questionSetId, questionNo } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);
  const [sourceCode, setSourceCode] = useState('');
  const [language, setLanguage] = useState('c_cpp');
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/codingQuestions/questions/${questionSetId}/${questionNo}`);
        setQuestionData(response.data);
      } catch (err) {
        setError('Error fetching question data');
      }
    };

    fetchQuestionData();
  }, [questionSetId, questionNo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/compiler/compile', {
        sourceCode,
        language: language === 'c_cpp' ? 'C++' : 'C',
        userInput
      });
      const resultData = response.data;
      setResult(resultData);
      checkTestCases(resultData);
    } catch (error) {
      console.error("Error occurred:", error);
      setResult(error.response?.data || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const checkTestCases = (result) => {
    if (questionData) {
      const { test_case_output, test_case_input } = questionData;

      if (test_case_output && test_case_input) {
        const testCaseInputs = test_case_input.split('|').map(input => input.trim());
        const testCaseOutputs = test_case_output.split('|').map(output => output.trim());

        let allTestsPassed = true;

        const resultString = String(result).trim();

        if (testCaseInputs.includes(userInput.trim())) {
          console.log('User input matches one of the test case inputs');
        } else {
          console.log('User input does not match any of the test case inputs');
          allTestsPassed = false;
        }

        for (let i = 0; i < testCaseOutputs.length; i++) {
          const expectedOutput = testCaseOutputs[i];
          const normalizedExpectedOutput = expectedOutput.replace(/\r\n|\r|\n/g, '\n');
          const normalizedResultString = resultString.replace(/\r\n|\r|\n/g, '\n');

          if (normalizedExpectedOutput === normalizedResultString) {
            console.log(`Output matched for test case ${i + 1}`);
          } else {
            console.log(`Output did not match for test case ${i + 1}`);
            allTestsPassed = false;
          }
        }

        if (allTestsPassed) {
          alert('All test cases passed');
        } else {
          alert('Some test cases did not pass');
        }
      } else {
        alert('Test case input or output not available');
      }
    } else {
      alert('Question data not available');
    }
  };

  const handleEditorLoad = (editor) => {
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true
    });
  };

  return (
    <div style={{ display: 'flex', padding: '20px', maxWidth: '1200px', margin: 'auto' }}>
      {/* Left Column for Question and Details */}
      <div style={{ flex: '1', marginRight: '20px', borderRight: '1px solid #ddd', paddingRight: '20px' }}>
        <h2>Question Details</h2>
        {error && <div className="text-red-500">{error}</div>}
        {questionData ? (
          <div className="bg-white shadow-md rounded p-4">
            <p><strong>Question Set ID:</strong> {questionData.questionSetId}</p>
            <p><strong>Question No:</strong> {questionData.questionNo}</p>
            <p><strong>Question:</strong> {questionData.question}</p>
            {questionData.question_description && (
              <p><strong>Description:</strong> <pre>{questionData.question_description}</pre></p>
            )}
            {questionData.test_case_input && (
              <p><strong>Test Case Input:</strong> <pre>{questionData.test_case_input}</pre></p>
            )}
            {questionData.test_case_output && (
              <p><strong>Test Case Output:</strong> <pre>{questionData.test_case_output}</pre></p>
            )}
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      {/* Right Column for Code Editor and Output */}
      <div style={{ flex: '2', display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
          onLoad={handleEditorLoad}
        />
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label htmlFor="language" style={{ marginRight: '10px', fontWeight: 'bold' }}>Language:</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              style={{ padding: '10px', fontSize: '16px', borderColor: '#ddd', borderRadius: '4px', flex: '1' }}
            >
              <option value="c_cpp">C</option>
            </select>
          </div>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter input for your program (if any)"
            rows="4"
            style={{ width: '100%', padding: '10px', fontSize: '16px', borderColor: '#ddd', borderRadius: '4px' }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background-color 0.3s',
              marginTop: '10px'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
          >
            {loading ? 'Compiling...' : 'Compile'}
          </button>
        </form>
        <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', border: '1px solid #ddd', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
          <h2 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 'bold' }}>Output:</h2>
          <pre>{result}</pre>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
