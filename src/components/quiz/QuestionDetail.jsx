import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp'; 
import 'ace-builds/src-noconflict/theme-github'; 
import 'ace-builds/src-noconflict/ext-language_tools'; 
import './QuestionDetail.css';

const QuestionDetail = () => {
  const { questionSetId, questionNo } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [questionData, setQuestionData] = useState(null);
  const [error, setError] = useState(null);
  const [sourceCode, setSourceCode] = useState('');
  const [language, setLanguage] = useState('c_cpp');
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState('');
  const [runHistory, setRunHistory] = useState([]); // New state for run response history
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [saveMessage, setSaveMessage] = useState('');
  
  const { email, userData } = location.state || {};

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const url = `http://myspringapp-env.eba-guzhenp3.us-east-1.elasticbeanstalk.com/codingQuestions/questions/${questionSetId}/${questionNo}`;
        const response = await axios.get(url);
        setQuestionData(response.data);
      } catch (err) {
        setError('Error fetching question data');
      }
    };
  
    fetchQuestionData();
    fetchSavedCode();
  }, [questionSetId, questionNo, email]);
  
  const fetchSavedCode = async () => {
    try {
      const url = `http://myspringapp-env.eba-guzhenp3.us-east-1.elasticbeanstalk.com/code/get?student_email=${email}&question_set_id=${questionSetId}&question_no=${questionNo}`;
      const response = await axios.get(url);
      setSourceCode(response.data);
    } catch (err) {
      console.error('Error fetching saved code:', err);
    }
  };
  
  const saveResult = async (resultData) => {
    try {
      await axios.post('http://myspringapp-env.eba-guzhenp3.us-east-1.elasticbeanstalk.com/api/results/saveResult', {
        questionSetId,
        questionNo,
        email,
        studentName: userData.full_name,
        prn: userData.prn_no,
        studentRollNo: userData.roll_no,
        solvingStatus: 1, 
      });
    } catch (error) {
      console.error('Error saving result:', error);
      setResponse(`Error saving result: ${error.response ? error.response.data : error.message}`);
    }
  };

  const handleCompileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const response = await axios.post('http://myspringapp-env.eba-guzhenp3.us-east-1.elasticbeanstalk.com/api/compiler/compile', {
            sourceCode,
            language: language === 'c_cpp' ? 'C++' : 'C',
            userInput,
        });
        const resultData = response.data;
        setResult(resultData);
        const testCasesPassed = checkTestCases(resultData);
        alert(testCasesPassed ? 'All test cases passed' : 'Some test cases did not pass');
    } catch (error) {
        console.error("Error response:", error);
        const errorMessage = error.response?.data || error.message || "An unknown error occurred.";
        setResponse(`Error: ${errorMessage}`);
    } finally {
        setLoading(false);
    }
};

  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const compileResponse = await axios.post('http://myspringapp-env.eba-guzhenp3.us-east-1.elasticbeanstalk.com/api/compiler/compile', {
        sourceCode,
        language: language === 'c_cpp' ? 'C++' : 'C',
        userInput
      });

      const resultData = compileResponse.data;
      setResult(resultData);

      const verifyResponse = await axios.post('http://myspringapp-env.eba-guzhenp3.us-east-1.elasticbeanstalk.com/api/compiler/compileTests', {
        sourceCode,
        language,
        questionSetId,
        questionNo,
      });

      setResponse(verifyResponse.data);
      const testCasesPassed = checkTestCases(resultData);

      if (verifyResponse.status === 200 && testCasesPassed) {
        await saveResult(resultData);
        await handleSaveCode();
        alert("All test cases passed! Code saved successfully.");
        navigate(-1);
      } else {
        alert("Sample Input Or Output Mismatched");
      }
    } catch (error) {
      const errorMessage = error.response?.data || error.message || "An unknown error occurred.";
      setResponse(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
};

  const handleSaveCode = async () => {
    try {
      const saveCodeResponse = await axios.post('http://myspringapp-env.eba-guzhenp3.us-east-1.elasticbeanstalk.com/code/save', {
        codeSaverId: {
          student_email: email,
          question_set_id: questionSetId,
          question_no: questionNo
        },
        code: sourceCode
      });
      alert("Code Saved Successfully !")
    } catch (error) {
      setSaveMessage(`Error saving code: ${error.response ? error.response.data : error.message}`);
    }
  };

  const handleRunCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://myspringapp-env.eba-guzhenp3.us-east-1.elasticbeanstalk.com/api/compiler/compile', {
        sourceCode,
        language: language === 'c_cpp' ? 'C++' : 'C',
        userInput
      });

      const resultData = response.data;
      setResult(resultData);
      // Add to run history with timestamp
      setRunHistory(prev => [
        {
          id: Date.now(), // Unique ID for each run
          result: resultData,
          timestamp: new Date().toLocaleString(),
          input: userInput,
        },
        ...prev.slice(0, 9) // Keep only the latest 10 runs
      ]);
      const testCasesPassed = checkTestCases(resultData);
      alert(testCasesPassed ? 'All test cases passed' : 'Some test cases did not pass');
    } catch (error) {
      const errorMessage = error.response?.data || error.message || "An unknown error occurred.";
      setResponse(`Error: ${errorMessage}`);
      // Add error to run history
      setRunHistory(prev => [
        {
          id: Date.now(),
          result: `Error: ${errorMessage}`,
          timestamp: new Date().toLocaleString(),
          input: userInput,
        },
        ...prev.slice(0, 9)
      ]);
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
        for (let i = 0; i < testCaseOutputs.length; i++) {
          const expectedOutput = testCaseOutputs[i];
          const normalizedExpectedOutput = expectedOutput.replace(/\r\n|\r|\n/g, '\n').trim();
          const normalizedResultString = resultString.replace(/\r\n|\r|\n/g, '\n').trim();

          if (normalizedExpectedOutput !== normalizedResultString) {
            allTestsPassed = false;
          }
        }

        if (!testCaseInputs.includes(userInput.trim())) {
          allTestsPassed = false;
        }

        return allTestsPassed;
      } else {
        alert('Test case input or output not available');
        return false;
      }
    } else {
      alert('Question data not available');
      return false;
    }
  };

  const handleEditorLoad = (editor) => {
    editor.setOptions({
      // enableBasicAutocompletion: true,
      // enableLiveAutocompletion: true,
    });

    editor.container.addEventListener("copy", (e) => e.preventDefault());
    editor.container.addEventListener("paste", (e) => e.preventDefault());
    editor.container.addEventListener("cut", (e) => e.preventDefault());
    editor.container.addEventListener("contextmenu", (e) => e.preventDefault());

    editor.commands.addCommand({
      name: "disableCopyPaste",
      bindKey: { win: "Ctrl-C|Ctrl-V", mac: "Command-C|Command-V" },
      exec: () => {},
      readOnly: true,
    });

    document.addEventListener("copy", (e) => e.preventDefault());
    document.addEventListener("cut", (e) => e.preventDefault());
    document.addEventListener("paste", (e) => e.preventDefault());
  };

  return (
    <div className="question-detail-container">
      <div className="question-info">
        <h2>Question Details</h2>
        {error && <div className="error-message">{error}</div>}
        {questionData ? (
          <div className="question-card">
            <p><strong>Question Set ID:</strong> {questionData.id.questionSetId}</p>
            <p><strong>Question No:</strong> {questionData.id.questionNo}</p>
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
          <div className="loading">Loading...</div>
        )}
      </div>

      <div className="code-editor-section">
        <AceEditor
          mode={language}
          theme="github"
          name="codeEditor"
          value={sourceCode}
          onChange={(newValue) => setSourceCode(newValue)}
          width="100%"
          height="70%"
          editorProps={{ $blockScrolling: true }}
          style={{ borderRadius: '4px', border: '1px solid #ddd', minHeight: '500px' }}
          onLoad={handleEditorLoad}
        />

        <form onSubmit={handleVerifySubmit} className="code-form">
          <div className="form-group">
            <label htmlFor="language">Language:</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select"
            >
              <option value="c_cpp">C</option>
            </select>
          </div>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter input for your program (if any)"
            rows="4"
            className="user-input"
          />
          <div className="button-group">
            <button type="submit" className="verify-button">
              Verify
            </button>
            <button onClick={handleRunCode} className="run-code-button">
              Run Code
            </button>
            <button onClick={handleSaveCode} className="save-code-button">
              Save Code
            </button>
          </div>
          {loading && <div className="loading">Loading...</div>}
          <pre className="result-output">{result}</pre>
        </form>

        {saveMessage && (
          <div className="save-message">
            <p>{saveMessage}</p>
          </div>
        )}

        {response && (
          <div className="response-container">
            <p><strong>Response:</strong></p>
            <pre>{response}</pre>
          </div>
        )}

        {runHistory.length > 0 && (
          <div className="run-history-container">
            <h3 className="run-history-title">Run History</h3>
            <div className="run-history-list">
              {runHistory.map((entry) => (
                <div key={entry.id} className="run-history-item">
                  <p><strong>Time:</strong> {entry.timestamp}</p>
                  <p><strong>Input:</strong> <pre>{entry.input || 'No input'}</pre></p>
                  <p><strong>Output:</strong> <pre>{entry.result}</pre></p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionDetail;