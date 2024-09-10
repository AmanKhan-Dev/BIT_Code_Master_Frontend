import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const UserDashboard = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/student/findByEmail`, {
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
`;

export default UserDashboard;
