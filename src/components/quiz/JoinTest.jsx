import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const JoinChallenge = () => {
  const [questionSetId, setQuestionSetId] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);

  useEffect(() => {
    // Retrieve user data from location state if available
    const userInfo = location.state?.userData;
    if (userInfo) {
      setUserData(userInfo);
    }
  }, [location.state]);

  useEffect(() => {
    if (userData) {
      drawUserData();
    }
  }, [userData]);

  const handleInputChange = (event) => {
    setQuestionSetId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (questionSetId.trim()) {
      navigate(`/pallate/${questionSetId}`, { state: { email: userData.email, userData } });
    }
  };
  

  const drawUserData = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
      ctx.font = '16px Arial';
      ctx.fillStyle = 'black';
      ctx.fillText(`Full Name: ${userData.full_name}`, 10, 30);
      ctx.fillText(`Email: ${userData.email}`, 10, 60);
      ctx.fillText(`PRN No: ${userData.prn_no}`, 10, 90);
      ctx.fillText(`Roll No: ${userData.roll_no}`, 10, 120);
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
      
      <canvas ref={canvasRef} width={400} height={200} />
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;

  h2 {
    margin-bottom: 20px;
    font-size: 1.5em;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
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

  canvas {
    margin-top: 20px;
    border: 1px solid #ddd;
    background-color: #f8f9fa;
    width: 100%;
    max-width: 400px;
  }

  @media (max-width: 600px) {
    padding: 10px;

    h2 {
      font-size: 1.2em;
    }

    form {
      width: 100%;
    }

    input, button {
      font-size: 0.9em;
    }

    canvas {
      width: 100%;
      height: auto;
    }
  }
`;

export default JoinChallenge;
