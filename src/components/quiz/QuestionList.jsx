import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [questionSetId, setQuestionSetId] = useState("");
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const location = useLocation();

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

    const consolidatedResults = results.reduce((acc, result, questionIndex) => {
        if (result) {
            result.forEach(({ studentName, prn, email }) => {
                const existing = acc.find(r => r.prn === prn);
                if (existing) {
                    existing[questionIndex] = 1; // Mark as solved for the specific question
                    existing.responseCount += 1; // Increment response count for 200 responses
                } else {
                    const newResult = { studentName, prn, email, responseCount: 1, ...Array(questions.length).fill(0) };
                    newResult[questionIndex] = 1; // Mark as solved for the specific question
                    acc.push(newResult);
                }
            });
        }
        return acc;
    }, []);

    // Function to filter results based on search query
    const filteredResults = consolidatedResults.filter(result =>
        result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.prn.toLowerCase().includes(searchQuery.toLowerCase()) ||
        result.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort filtered results by PRN in ascending order (converted to number)
    const sortedFilteredResults = filteredResults.sort((a, b) => {
        return Number(a.prn) - Number(b.prn);
    });

    return (
        <StyledWrapper>
            <h2>Question Set ID: {questionSetId}</h2>
            <StyledSearchBar>
                <input
                    type="text"
                    placeholder="Search by name, PRN, or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </StyledSearchBar>
            {questions.length > 0 ? (
                <StyledTable>
                    <thead>
                        <tr>
                            <th>Solved</th>
                            <th>Student Name</th>
                            <th>PRN</th>
                            <th>Email</th>
                            {questions.map((_, index) => (
                                <th key={index}>Question {index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedFilteredResults.length > 0 ? (
                            sortedFilteredResults.map((result, index) => (
                                <StyledRowWrapper 
                                    key={index} 
                                    isHighlighted={searchQuery && 
                                        (result.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                        result.prn.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                        result.email.toLowerCase().includes(searchQuery.toLowerCase()))}
                                >
                                    <td>{result.responseCount}</td>
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
                                </StyledRowWrapper>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={questions.length + 4}>No results available for this set.</td>
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

const StyledSearchBar = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;

    input {
        width: 80%;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

        &:focus {
            outline: none;
            border-color: #2196f3;
            box-shadow: 0 0 5px rgba(33, 150, 243, 0.5);
        }
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

const StyledRow = styled.tr`
    background-color: ${(props) => props.isHighlighted ? '#e1f5fe' : 'white'};
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #f1f1f1; /* Highlight row on hover */
    }
`;

// Wrapper for StyledRow to avoid passing unrecognized props
const StyledRowWrapper = ({ isHighlighted, ...props }) => {
    return <StyledRow {...props} />;
};

export default QuestionList;
