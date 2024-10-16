import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; 
import styled from "styled-components";

const UserDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`https://measuring-advanced-yoga-cooking.trycloudflare.com/student/findByEmail`, {
        params: { email }
      });
      setUserData(response.data);
    } catch (err) {
      setError("Error fetching user data");
      console.error(err);
    }
  };

  useEffect(() => {
    const email = location.state?.email;
    if (email) {
      fetchUserData(email);
    } else {
      setError("Email not provided.");
    }
  }, [location.state]);

  const handleJoinTestClick = () => {
    // Pass userData when navigating to the JoinChallenge component
    navigate("/join", { state: { userData } });
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <StyledWrapper>
      <div className="dashboard">
        <h2>User Dashboard</h2>
        <p>Full Name: {userData.full_name}</p>
        <p>Email: {userData.email}</p>
        <p>PRN No: {userData.prn_no}</p>
        <p>Roll No: {userData.roll_no}</p>
        <button className="join-test-button" onClick={handleJoinTestClick}>
          Join Test
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 20px;
  .dashboard {
    background: #ffffff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .join-test-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }

  .join-test-button:hover {
    background-color: #0056b3;
  }
`;

export default UserDashboard;
