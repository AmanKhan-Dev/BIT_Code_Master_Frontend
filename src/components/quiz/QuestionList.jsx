import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [questionSetId, setQuestionSetId] = useState("");
    const [results, setResults] = useState([]);
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

    const fetchQuestions = (setId) => {
        fetch(`http://localhost:8080/codingQuestions/questionCount?questionSetId=${setId}`)
            .then((response) => response.json())
            .then((data) => {
                setQuestions(data);
                fetchResultsForQuestions(setId, data);
            })
            .catch((error) => console.error("Error fetching questions:", error));
    };

    const fetchResultsForQuestions = (setId, questions) => {
        const promises = questions.map((_, index) =>
            fetch(`http://localhost:8080/api/results/resultsByQuestion?questionSetId=${setId}&questionNo=${index + 1}`)
                .then((response) => {
                    if (response.ok) {
                        return response.json(); // Return the result if the status is 200
                    }
                    return null; // Return null for non-200 responses
                })
        );

        Promise.all(promises)
            .then((resultsArray) => {
                setResults(resultsArray);
            })
            .catch((error) => console.error("Error fetching results:", error));
    };

    // Consolidate results for rendering
    const consolidatedResults = results.reduce((acc, result, questionIndex) => {
        if (result) {
            result.forEach(({ studentName, prn, email }) => {
                const existing = acc.find(r => r.prn === prn);
                if (existing) {
                    existing[questionIndex] = 1; // Mark as solved for the specific question
                } else {
                    const newResult = { studentName, prn, email, ...Array(questions.length).fill(0) };
                    newResult[questionIndex] = 1; // Mark as solved for the specific question
                    acc.push(newResult);
                }
            });
        }
        return acc;
    }, []);
    

    return (
        <StyledWrapper>
            <h2>Question Set ID: {questionSetId}</h2>
            {questions.length > 0 ? (
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>PRN</th>
                            <th>Email</th>
                            {questions.map((_, index) => (
                                <th key={index}>Question {index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {consolidatedResults.length > 0 ? (
                            consolidatedResults.map((result, index) => (
                                <tr key={index}>
                                    <td>{result.studentName}</td>
                                    <td>{result.prn}</td>
                                    <td>{result.email}</td>
                                    {questions.map((_, questionIndex) => (
                                        <td key={questionIndex}>
                                            <input
                                                type="checkbox"
                                                checked={!!result[questionIndex]} // Check if the question is solved
                                                readOnly
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={questions.length + 3}>No results available for this set.</td>
                            </tr>
                        )}
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
    h2 {
        text-align: center;
        margin-bottom: 1.5rem;
        color: #2196f3;
        font-size: 2rem;
        font-weight: 600;
    }

    p {
        text-align: center;
        color: rgba(0, 0, 0, 0.7);
        font-size: 1.1rem;
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
        text-transform: uppercase;
    }

    tr:nth-child(even) {
        background-color: #f9f9f9;
    }

    td {
        font-size: 1rem;
    }

    tr:hover {
        background-color: #f1f1f1; /* Highlight row on hover */
    }

    input[type="checkbox"] {
        transform: scale(1.2); /* Larger checkbox */
    }
`;

export default QuestionList;
