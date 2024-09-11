// Layout.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaUser } from 'react-icons/fa'; // Import user icon from react-icons

const Layout = ({ userData, onJoinClick, children }) => {
  const [showCanvas, setShowCanvas] = useState(false); // State to toggle canvas visibility

  // Toggle the canvas visibility
  const toggleCanvas = () => {
    setShowCanvas(!showCanvas);
  };

  return (
    <StyledWrapper>
      {/* Navbar with user icon */}
      <nav className="navbar">
        <div className="navbar-content">
          <h2>User Dashboard</h2>
          <FaUser className="user-icon" onClick={toggleCanvas} />
        </div>
      </nav>

      {/* User Details Canvas */}
      {showCanvas && userData && (
        <div className="canvas-wrapper">
          <div className="canvas-content">
            <h3>User Details</h3>
            <p>Full Name: {userData.full_name}</p>
            <p>Email: {userData.email}</p>
            <p>PRN No: {userData.prn_no}</p>
            <p>Roll No: {userData.roll_no}</p>
            <button onClick={onJoinClick} className="join-button">
              Join Challenge
            </button>
          </div>
        </div>
      )}
      {children}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 20px;

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #007bff;
    color: #ffffff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .navbar-content {
    display: flex;
    align-items: center;
  }

  .user-icon {
    margin-left: 10px;
    cursor: pointer;
    font-size: 24px;
    color: #ffffff;
  }

  .canvas-wrapper {
    position: fixed;
    top: 60px;
    right: 20px;
    width: 300px;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  .canvas-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .join-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }

  .join-button:hover {
    background-color: #0056b3;
  }
`;

export default Layout;
