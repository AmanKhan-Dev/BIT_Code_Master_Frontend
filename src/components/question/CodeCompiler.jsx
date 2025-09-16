// src/components/CompileTests.js

import React, { useState } from 'react';
import axios from 'axios';

const CompileTests = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [language, setLanguage] = useState('C');
  const [questionSetId, setQuestionSetId] = useState('');
  const [questionNo, setQuestionNo] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const codeRequest = {
      sourceCode,
      language,
      questionSetId,
      questionNo,
    };

    try {
      const res = await axios.post('http://myspringapp-env.eba-guzhenp3.us-east-1.elasticbeanstalk.com/api/compiler/compileTests', codeRequest);
      setResponse(res.data);
    } catch (error) {
      setResponse(`Error: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <div>
      <h1>Compile Code and Test</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="language">Language:</label>
          <select id="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="C">C</option>
            <option value="C++">C++</option>
          </select>
        </div>
        <div>
          <label htmlFor="sourceCode">Source Code:</label>
          <textarea
            id="sourceCode"
            value={sourceCode}
            onChange={(e) => setSourceCode(e.target.value)}
            rows="10"
            cols="50"
          />
        </div>
        <div>
          <label htmlFor="questionSetId">Question Set ID:</label>
          <input
            id="questionSetId"
            type="text"
            value={questionSetId}
            onChange={(e) => setQuestionSetId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="questionNo">Question Number:</label>
          <input
            id="questionNo"
            type="text"
            value={questionNo}
            onChange={(e) => setQuestionNo(e.target.value)}
          />
        </div>
        <button type="submit">Compile and Test</button>
      </form>
      <div>
        <h2>Response</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default CompileTests;
