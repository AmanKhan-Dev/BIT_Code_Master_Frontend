import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';

const Pallate = () => {
  const { questionSetId } = useParams(); // Retrieve questionSetId from URL
  const [questionsByCategory, setQuestionsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [openCategory, setOpenCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/codingQuestions/allCodingQuestions', {
          params: { questionSetId: questionSetId || 'BTCOCOC505' },
        });
        
        // Group questions by category
        const groupedQuestions = response.data.reduce((acc, question) => {
          const category = question.questionCategory || 'Uncategorized';
          if (!acc[category]) acc[category] = [];
          acc[category].push(question);
          return acc;
        }, {});

        setQuestionsByCategory(groupedQuestions);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [questionSetId]);

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
  };

  const handleSolveClick = () => {
    if (selectedQuestion) {
      // Extract question number from the selected question text
      const questionNo = selectedQuestion.questionNo; // Use questionNo directly
      navigate(`/questions/${questionSetId}/${questionNo}`);
    }
  };

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching questions: {error.message}</p>;

  return (
    <StyledSection>
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
                    className="question-button"
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
