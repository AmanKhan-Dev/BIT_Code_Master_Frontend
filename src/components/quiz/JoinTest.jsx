// JoinChallenge.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const JoinChallenge = () => {
  const [questionSetId, setQuestionSetId] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setQuestionSetId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (questionSetId.trim()) {
      navigate(`/pallate/${questionSetId}`);
    }
  };

  return (
    <StyledSection>
      <h2>Join Challenge</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="questionSetId">Enter Question Set ID:</label>
        <input
          type="text"
          id="questionSetId"
          value={questionSetId}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Join</button>
      </form>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  h2 {
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 300px;
  }

  label {
    margin-bottom: 5px;
    font-size: 1.2em;
  }

  input {
    padding: 10px;
    font-size: 1em;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
  }

  button:hover {
    background-color: green;
  }
`;

export default JoinChallenge;
