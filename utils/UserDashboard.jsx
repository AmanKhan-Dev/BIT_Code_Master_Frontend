import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom"; 
import styled from "styled-components";

const UserDashboard = () => {
  const storedUserData = JSON.parse(localStorage.getItem("UserData"));
  const location = useLocation();
  const navigate = useNavigate(); 
  const [userData, setUserData] = useState(storedUserData || null);
  const [error, setError] = useState("");

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/student/findByEmail`, {
        params: { email }
      });
      setUserData(response.data);
      localStorage.setItem("UserData", JSON.stringify(response.data));
    } catch (err) {
      setError("Error fetching user data");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!userData) {
      const email = location.state?.email;
      if (email) {
        fetchUserData(email);
      } else {
        setError("Email not provided.");
      }
    }
  }, [location.state, userData]);

  const handleJoinTestClick = () => {
    navigate("/join", { state: { userData } });
  };

  const handleLogout = () => {
    setUserData(null);
    setError("");
    localStorage.removeItem("UserData"); 
    navigate("/Login-Page");
  };

  // Redirect to login if the user is not logged in
  useEffect(() => {
    if (!userData) {
      navigate("/Login-Page");
    }
  }, [userData, navigate]);

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
        {userData && (
          <>
            <p>Full Name: {userData.full_name}</p>
            <p>Email: {userData.email}</p>
            <p>PRN No: {userData.prn_no}</p>
            <p>Roll No: {userData.roll_no}</p>
          </>
        )}
        <button className="join-test-button" onClick={handleJoinTestClick}>
          Join Test
        </button>
        <button className="logout-button" onClick={handleLogout}>
          Logout
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

  .join-test-button,
  .logout-button {
    margin-top: 20px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
  }

  .join-test-button {
    background-color: #007bff;
    color: white;

    &:hover {
      background-color: #0056b3;
    }
  }

  .logout-button {
    background-color: #dc3545;
    color: white;
    margin-left: 10px;

    &:hover {
      background-color: #c82333;
    }
  }
`;

export default UserDashboard;
