import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [questionSetId, setQuestionSetId] = useState("");
    const location = useLocation();

    // Extract the setId from the URL parameters
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const setId = params.get("setId");
        if (setId) {
            setQuestionSetId(setId);
            fetchQuestions(setId);
        }
    }, [location]);

    // Fetch questions based on question set ID
    const fetchQuestions = (setId) => {
        fetch(`http://localhost:8080/codingQuestions/questionCount?questionSetId=${setId}`)
            .then((response) => response.json())
            .then((data) => setQuestions(data))
            .catch((error) =>
                console.error("Error fetching questions:", error)
            );
    };

    return (
        <StyledWrapper>
            <h2>Question Set ID: {questionSetId}</h2>
            {questions.length > 0 ? (
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Question Number</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((question, index) => (
                            <tr key={index}>
                                <td>{question.questionNumber}</td>
                                <td>{question.questionDetail}</td>
                            </tr>
                        ))}
                    </tbody>
                </StyledTable>
            ) : (
                <p>No questions available for this set.</p>
            )}
        </StyledWrapper>
    );
};

// Styling for the table and container
const StyledWrapper = styled.div`
    max-width: 900px;
    margin: 2rem auto;
    padding: 1.5rem;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    h2 {
        text-align: center;
        margin-bottom: 1.5rem;
        color: #2196f3;
        font-size: 1.8rem;
    }

    p {
        text-align: center;
        color: rgba(0, 0, 0, 0.7);
    }
`;

const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 1rem;
        border: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #2196f3;
        color: white;
        font-weight: bold;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    td {
        font-size: 1rem;
    }
`;

export default QuestionList;
