import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const Pallate = () => {
  const { questionSetId } = useParams();
  const [questionsByCategory, setQuestionsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const [solvedQuestions, setSolvedQuestions] = useState({});
  const [showUserData, setShowUserData] = useState(false); // State to handle canvas visibility

  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.email;
  const userData = location.state?.userData;

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://measuring-advanced-yoga-cooking.trycloudflare.com:8080/codingQuestions/questionsBySetId', {
          params: { questionSetId: questionSetId || 'BTCOCOC505' },
        });

        const groupedQuestions = response.data.reduce((acc, question) => {
          const category = question.questionCategory || 'Uncategorized';
          if (!acc[category]) acc[category] = [];
          acc[category].push(question);
          return acc;
        }, {});

        setQuestionsByCategory(groupedQuestions);
        checkSolvedQuestions(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [questionSetId]);

  const checkSolvedQuestions = async (questions) => {
    const solvedStatus = {};
    for (const question of questions) {
      try {
        const response = await axios.get('https://measuring-advanced-yoga-cooking.trycloudflare.com:8080/api/results/exists', {
          params: {
            questionSetId: questionSetId,
            questionNo: question.questionNo,
            email: userEmail,
          }
        });

        if (response.data === "Yes it exists") {
          solvedStatus[question.questionNo] = true;
        }
      } catch (error) {
        console.error("Error checking if question exists:", error);
      }
    }

    setSolvedQuestions(solvedStatus);
  };

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const handleSolveClick = () => {
    if (selectedQuestion) {
      const questionNo = selectedQuestion.questionNo;
      navigate(`/questions/${questionSetId}/${questionNo}`, {
        state: { 
          email: userEmail, 
          userData, 
          questionSetId, 
          questionNo 
        }
      });
    }
  };
  
  
  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  const toggleUserDataCanvas = () => {
    setShowUserData(!showUserData);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching questions: {error.message}</p>;

  return (
    <StyledSection>
      <button onClick={toggleUserDataCanvas}>
        {showUserData ? 'Hide User Data' : 'Show User Data'}
      </button>
      {showUserData && (
        <UserDataCanvas>
          {userData && (
            <>
              <p>Full Name: {userData.full_name}</p>
              <p>Email: {userData.email}</p>
              <p>PRN No: {userData.prn_no}</p>
              <p>Roll No: {userData.roll_no}</p>
            </>
          )}
        </UserDataCanvas>
      )}
      <div className="text-area-container">
        <textarea
          className="question-textarea"
          value={selectedQuestion ? selectedQuestion.question : ''}
          readOnly
        />
        <div className="solve-button-container">
          <button
            className="solve-button"
            onClick={handleSolveClick}
            disabled={!selectedQuestion}
          >
            Solve
          </button>
        </div>
      </div>
      <div className="header">
        <h4>50 QUESTIONS OF C</h4>
      </div>
      <div className="accordion-container">
        {Object.entries(questionsByCategory).map(([category, questions], index) => (
          <Accordion key={index}>
            <AccordionHeader onClick={() => toggleCategory(index)}>
              <h5>{category}</h5>
            </AccordionHeader>
            <AccordionBody isOpen={openCategory === index}>
              <div className="grid-container">
                {questions.map((question, questionIndex) => (
                  <button
                    key={questionIndex}
                    className={`question-button ${solvedQuestions[question.questionNo] ? 'solved' : ''}`}
                    onClick={() => handleQuestionClick(question)}
                  >
                    {question.questionNo}
                  </button>
                ))}
              </div>
            </AccordionBody>
          </Accordion>
        ))}
      </div>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  padding: 20px;

  .text-area-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .question-textarea {
    width: 91%;
    height: 150px;
    padding: 10px;
    font-size: 1.2em;
    border: 2px solid #007bff;
    border-radius: 10px;
    margin-bottom: 10px;
    resize: none;
    background-color: #f8f9fa;
  }

  .solve-button-container {
    display: flex;
    justify-content: flex-start;
    width: 100%;
  }

  .solve-button {
    padding: 10px 30px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1em;
    cursor: pointer;
    margin-top: 5px;
  }

  .solve-button:disabled {
    background-color: #b0c4de;
    cursor: not-allowed;
  }

  .solve-button:hover:not(:disabled) {
    background-color: green;
  }

  .header {
    margin-bottom: 20px;

    h4 {
      color: GrayText;
    }
  }

  .accordion-container {
    margin-bottom: 20px;
  }

  .accordion-header {
    background-color: #007bff;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 5px;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }

  .question-button {
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 1em;
    cursor: pointer;
    text-align: center;
  }

  .question-button:hover {
    background-color: #0056b3;
  }

  .question-button.solved {
    background-color: green;
  }
`;

const UserDataCanvas = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 300px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f8f9fa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  display: flex;
  flex-direction: column;
`;

const Accordion = styled.div`
  margin-bottom: 10px;
`;

const AccordionHeader = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
`;

const AccordionBody = styled.div`
  max-height: ${({ isOpen }) => (isOpen ? '500px' : '0')};
  opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
  overflow: hidden;
  transition: max-height 0.4s ease-out, opacity 0.4s ease-out;
  padding: ${({ isOpen }) => (isOpen ? '10px' : '0 10px')};
`;

export default Pallate;
