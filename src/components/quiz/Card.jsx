import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styled from "styled-components";

const Card = () => {
    const [questionSets, setQuestionSets] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate
    const adminDetails = JSON.parse(localStorage.getItem("adminDetails")); // Fetch admin details

    // Redirect to admin login if admin details are not present
    useEffect(() => {
        if (!adminDetails) {
            navigate("/adminLogin"); // Redirect to admin login
        }
    }, [adminDetails, navigate]);

    // Fetch all question sets from the backend
    useEffect(() => {
        fetch("http://34.123.112.154:8080/sets/allsets")
            .then((response) => response.json())
            .then((data) => setQuestionSets(data))
            .catch((error) => console.error("Error fetching question sets:", error));
    }, []);

    // Navigate to GetAllQuiz with questionSetId
    const handleEdit = (questionSetId) => {
        navigate(`/all-quizzes?setId=${questionSetId}`); // Navigate to the GetAllQuiz page with the set ID
    };

    return (
        <StyledWrapper>
            {adminDetails && ( // Check if admin details are available
                <AdminInfo>
                    <h3>Admin: {adminDetails.admin_full_name}</h3>
                    <p>Email: {adminDetails.email}</p>
                </AdminInfo>
            )}
            <div className="card-list">
                {questionSets.length > 0 ? (
                    questionSets.map((set) => (
                        <div className="card" key={set.questionSetId}>
                            <div className="header">
                                <p className="header-title">{set.questionSetName}</p>
                            </div>
                            <div className="info">
                                <p>{set.questionSetDescription}</p>
                            </div>
                            <div className="footer">
                                <p className="tag">Question Set ID: {set.questionSetId}</p>
                                <button
                                    type="button"
                                    className="action"
                                    onClick={() => handleEdit(set.questionSetId)} // Call handleEdit on button click
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No question sets available</p>
                )}
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .card-list {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
    }

    .card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-radius: 0.75rem;
        background-color: white;
        width: auto; /* Auto-adjust width based on content */
        min-width: 250px; /* Set a minimum width to maintain consistency */
        max-width: 30%; /* Allow the card to take up to 30% of the container */
        padding: 1rem; /* Add padding for better content spacing */
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -2px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        
        &:hover {
            transform: scale(1.05);
        }

        @media (max-width: 768px) {
            width: 80%; /* Take more space on smaller devices */
            height: auto;
        }

        @media (max-width: 480px) {
            width: 100%; /* Full width on very small devices */
            height: auto;
        }
    }

    .header {
        position: relative;
        background-clip: border-box;
        margin: 0.5rem;
        border-radius: 0.75rem;
        background-color: rgb(33, 150, 243);
        box-shadow: 0 10px 15px -3px rgba(33, 150, 243, 0.4),
            0 4px 6px -4px rgba(33, 150, 243, 0.4);
        height: 6rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header-title {
        color: white;
        font-weight: bold;
        font-size: 1.5rem;
        text-align: center;
        padding: 0.5rem;
    }

    .info {
        border: none;
        padding: 1.5rem;
        text-align: justify;
    }

    .footer {
        padding: 0.75rem;
        border-top: 1px solid rgb(236, 239, 241);
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgba(0, 140, 255, 0.082);
    }

    .tag {
        font-weight: 300;
        font-size: 0.75rem;
    }

    .action {
        user-select: none;
        border: none;
        outline: none;
        box-shadow: 0 4px 6px -1px rgba(33, 150, 243, 0.4),
            0 2px 4px -2px rgba(33, 150, 243, 0.4);
        color: white;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 0.75rem;
        padding: 0.75rem 1.5rem;
        background-color: rgb(33, 150, 243);
        border-radius: 0.5rem;
    }
`;

const AdminInfo = styled.div`
    margin-bottom: 20px;
    padding: 10px;
    background-color: rgba(33, 150, 243, 0.1);
    border-radius: 8px;
    text-align: center;

    h3,
    p {
        margin: 0; /* Remove default margin for consistent spacing */
        font-size: 1rem; /* Set a consistent font size */
    }
    
    h3 {
        font-weight: bold; /* Make admin name bold */
    }

    p {
        color: rgba(0, 0, 0, 0.7); /* Optional: make email a bit lighter */
    }
`;

export default Card;
