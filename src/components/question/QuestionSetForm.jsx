import React, { useState } from 'react';
import axios from 'axios';

const formStyle = {
  maxWidth: '600px',
  margin: 'auto',
  padding: '20px',
  backgroundColor: '#f4f4f4',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  color: '#333',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  transition: 'border-color 0.3s',
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s',
};

const buttonHoverStyle = {
  backgroundColor: '#0056b3',
};

const QuestionSetForm = () => {
  const [questionSet, setQuestionSet] = useState({
    questionSetId: '',
    setPassword: '',
    questionSetName: '',
    questionSetDescription: '',
  });
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionSet({ ...questionSet, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://34.123.112.154:8080/sets/addset', questionSet);
      setResponseMessage(response.data);
    } catch (error) {
      setResponseMessage(error.response ? error.response.data : 'An error occurred');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Add New Question Set</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div>
          <label htmlFor="questionSetId" style={labelStyle}>Set ID:</label>
          <input
            type="text"
            id="questionSetId"
            name="questionSetId"
            value={questionSet.questionSetId}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="setPassword" style={labelStyle}>Password:</label>
          <input
            type="password"
            id="setPassword"
            name="setPassword"
            value={questionSet.setPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="questionSetName" style={labelStyle}>Set Name:</label>
          <input
            type="text"
            id="questionSetName"
            name="questionSetName"
            value={questionSet.questionSetName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div>
          <label htmlFor="questionSetDescription" style={labelStyle}>Description:</label>
          <textarea
            id="questionSetDescription"
            name="questionSetDescription"
            value={questionSet.questionSetDescription}
            onChange={handleChange}
            required
            rows="4"
            style={{ ...inputStyle, resize: 'none' }} // Making the textarea style consistent with the input style
          />
        </div>
        <button 
          type="submit" 
          style={buttonStyle} 
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor} 
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Add Set
        </button>
      </form>
      {responseMessage && <p style={{ color: '#007bff', marginTop: '20px' }}>{responseMessage}</p>}
    </div>
  );
};

export default QuestionSetForm;
