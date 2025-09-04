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
    const email = sessionStorage.getItem("email");
    if (!email) {
      navigate("/Login-Page");
    } else {
      fetchUserData(email);
    }
  }, [navigate]);

  const handleJoinTestClick = () => {
    navigate("/join", { state: { userData } });
  };

  const handleLogout = () => {
    sessionStorage.removeItem("email");
    setUserData(null);
    alert("Logout Successful.");
    navigate("/Login-Page");
  };

  if (error) {
    return (
      <StyledWrapper>
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
        </div>
      </StyledWrapper>
    );
  }

  if (!userData) {
    return (
      <StyledWrapper>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </StyledWrapper>
    );
  }

  return (
    <StyledWrapper>
      <div className="dashboard-container">
        {/* Header Section */}
        <div className="header">
          <div className="welcome-section">
            <h1>Welcome back, {userData.full_name?.split(' ')[0] || 'Student'}! 👋</h1>
            <p className="subtitle">Ready to continue your coding journey?</p>
          </div>
          <button className="logout-button" onClick={handleLogout}>
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Profile Card */}
          <div className="card profile-card">
            <div className="card-header">
              <div className="profile-avatar">
                {userData.full_name?.charAt(0) || 'S'}
              </div>
              <div className="profile-info">
                <h3>Student Profile</h3>
                <p className="profile-status">Active Student</p>
              </div>
            </div>
            <div className="profile-details">
              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{userData.full_name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{userData.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">PRN Number</span>
                <span className="detail-value">{userData.prn_no}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Roll Number</span>
                <span className="detail-value">{userData.roll_no}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="card actions-card">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <button className="action-button primary" onClick={handleJoinTestClick}>
                <div className="action-icon">📝</div>
                <div className="action-content">
                  <span className="action-title">Join Test</span>
                  <span className="action-desc">Start your assessment</span>
                </div>
              </button>
              <button className="action-button secondary">
                <div className="action-icon">📊</div>
                <div className="action-content">
                  <span className="action-title">View Results</span>
                  <span className="action-desc">Check your scores</span>
                </div>
              </button>
              <button className="action-button secondary">
                <div className="action-icon">📚</div>
                <div className="action-content">
                  <span className="action-title">Study Materials</span>
                  <span className="action-desc">Access resources</span>
                </div>
              </button>
              <button className="action-button secondary">
                <div className="action-icon">⚙️</div>
                <div className="action-content">
                  <span className="action-title">Settings</span>
                  <span className="action-desc">Manage preferences</span>
                </div>
              </button>
            </div>
          </div>

       
          

          </div>
          </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, white 0%,  #2f80ed 100%);
  padding: 20px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 25px 30px;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .welcome-section h1 {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    color: #2d3748;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    margin: 5px 0 0 0;
    color: #718096;
    font-size: 1.1rem;
  }

  .logout-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #ff6b6b, #ee5a52);
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  }

  .logout-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }

  .content-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 25px;
  }

  .card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 25px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }

  .card h3 {
    margin: 0 0 20px 0;
    font-size: 1.3rem;
    font-weight: 700;
    color: #2d3748;
  }

  .profile-card {
    grid-column: span 2;
  }

  .card-header {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
  }

  .profile-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .profile-info h3 {
    margin: 0;
    color: #2d3748;
  }

  .profile-status {
    margin: 5px 0 0 0;
    color: #48bb78;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .profile-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 15px;
  }

  .detail-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 15px;
    background: rgba(102, 126, 234, 0.05);
    border-radius: 12px;
    border-left: 4px solid #667eea;
  }

  .detail-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #718096;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .detail-value {
    font-size: 1rem;
    font-weight: 600;
    color: #2d3748;
  }

  .actions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
  }

  .action-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
  }

  .action-button.primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  }

  .action-button.primary:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }

  .action-button.secondary {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    border: 2px solid rgba(102, 126, 234, 0.2);
  }

  .action-button.secondary:hover {
    background: rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
  }

  .action-icon {
    font-size: 1.5rem;
  }

  .action-title {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .action-desc {
    font-size: 0.8rem;
    opacity: 0.8;
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .stat-item {
    text-align: center;
    padding: 20px;
    background: rgba(102, 126, 234, 0.05);
    border-radius: 16px;
  }

  .stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: #667eea;
    margin-bottom: 5px;
  }

  .stat-label {
    font-size: 0.9rem;
    color: #718096;
    font-weight: 500;
  }

  .activity-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .activity-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    background: rgba(102, 126, 234, 0.05);
    border-radius: 12px;
    transition: all 0.2s ease;
  }

  .activity-item:hover {
    background: rgba(102, 126, 234, 0.1);
  }

  .activity-icon {
    font-size: 1.2rem;
  }

  .activity-content {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .activity-title {
    font-weight: 600;
    color: #2d3748;
    font-size: 0.9rem;
  }

  .activity-time {
    font-size: 0.8rem;
    color: #718096;
  }

  .loading-container, .error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 50vh;
    text-align: center;
  }

  .loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(102, 126, 234, 0.2);
    border-left: 4px solid #667eea;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .error-container {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .error-icon {
    font-size: 3rem;
    margin-bottom: 15px;
  }

  .error-message {
    color: #e53e3e;
    font-weight: 600;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    .header {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .profile-card {
      grid-column: span 1;
    }

    .content-grid {
      grid-template-columns: 1fr;
    }

    .stats-grid {
      grid-template-columns: 1fr;
    }

    .actions-grid {
      grid-template-columns: 1fr;
    }
  }
`;

export default UserDashboard;
