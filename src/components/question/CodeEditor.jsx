import React, { useState } from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp'; // For C and C++
import 'ace-builds/src-noconflict/theme-github'; // Choose a theme you like
import 'ace-builds/src-noconflict/ext-language_tools'; // For autocomplete

const CodeEditor = () => {
    const [sourceCode, setSourceCode] = useState('');
    const [language, setLanguage] = useState('c_cpp');
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const testCases = [
        { input: '', expectedOutput: 'hello' },
        //  { input: '', expectedOutput: '15' },
    ]; // Example test cases

    const checkTestCases = (result) => {
    let allPassed = true;

    for (const testCase of testCases) {
        // Compare raw result with the expected output
        if (result.trim() !== testCase.expectedOutput.trim()) {
            allPassed = false;
            break;
        }
    }

    if (allPassed) {
        alert('All test cases passed');
    } else {
        alert('Some test cases failed');
    }
};

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
        checkTestCases(resultData); // Pass result to checkTestCases
    } catch (error) {
        console.error("Error occurred:", error);
        setResult(error.response?.data || 'An error occurred');
    } finally {
        setLoading(false);
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
                <h2>Question Title</h2>
                <p>Description of the problem goes here. It explains what the user needs to solve, including any constraints.</p>
                <h3>Sample Input</h3>
                <pre>2 3</pre>
                <h3>Sample Output</h3>
                <pre>5</pre>
                <h3>Test Cases</h3>
                {testCases.map((testCase, index) => (
                    <div key={index}>
                        <strong>Input:</strong> {testCase.input}<br />
                        <strong>Expected Output:</strong> {testCase.expectedOutput}
                    </div>
                ))}
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

export default CodeEditor;
