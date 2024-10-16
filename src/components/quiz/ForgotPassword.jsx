import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [error, setError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [passwordError, setPasswordError] = useState(""); // State for password error messages

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    try {
      const response = await fetch("https://measuring-advanced-yoga-cooking.trycloudflare.com:8080/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setOtpSent(true);
        setError("");
        setOtpMessage(`OTP has been sent to ${email}`);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to send OTP");
        setOtpMessage("");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Error sending OTP. Please try again.");
      setOtpMessage("");
    }
  };

  const handleOtpInput = (e, nextInputId) => {
    if (e.target.value.length === 1) {
      setOtp((prev) => prev + e.target.value);
      document.getElementById(nextInputId)?.focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://measuring-advanced-yoga-cooking.trycloudflare.com:8080/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        setOtpSent(false);
        setPasswordUpdated(true);
        setError("");
        setOtpMessage("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("Error verifying OTP. Please try again.");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setPasswordError(""); // Reset password error message

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    
    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long."); // Set password error message
      return;
    }

    try {
      const response = await fetch("https://measuring-advanced-yoga-cooking.trycloudflare.com:8080/student/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      if (response.ok) {
        alert("Password updated successfully!");
        navigate("/Login-Page");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Error updating password. Please try again.");
    }
  };

  return (
    <StyledWrapper>
      {!passwordUpdated ? (
        <form className="form" onSubmit={otpSent ? handleOtpSubmit : handleEmailSubmit}>
          <div className="title">Forgot Password</div>
          {error && <div className="error">{error}</div>}
          {otpMessage && <div className="otp-message">{otpMessage}</div>}
          
          {!otpSent ? (
            <>
              <div className="title">Enter Your Email</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
              />
            </>
          ) : null}

          {otpSent ? (
            <>
              <div className="title">Enter Verification Code</div>
              <div className="inputs">
                {Array.from({ length: 6 }, (_, index) => (
                  <input
                    key={index}
                    id={`input${index + 1}`}
                    type="text"
                    maxLength={1}
                    onInput={(e) => handleOtpInput(e, `input${index + 2}`)}
                  />
                ))}
              </div>
            </>
          ) : null}

          <button type="submit" className="action">
            {otpSent ? "Verify Me" : "Send OTP"}
          </button>
        </form>
      ) : (
        <form className="form" onSubmit={handlePasswordUpdate}>
          <div className="title">Update Your Password</div>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
          />
          {passwordError && <div className="error">{passwordError}</div>} {/* Display password error message */}
          <button type="submit" className="action">
            Update Password
          </button>
        </form>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 300px;
    background-color: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    color: black;
    margin-bottom: 16px;
  }

  .inputs {
    margin-top: 10px;
    display: flex;
  }

  .inputs input {
    width: 32px;
    height: 32px;
    text-align: center;
    border: none;
    border-bottom: 1.5px solid #d2d2d2;
    margin: 0 5px;
    transition: border-color 0.2s;
  }

  .inputs input:focus {
    border-bottom: 1.5px solid royalblue;
    outline: none;
  }

  .action {
    margin-top: 24px;
    padding: 12px 16px;
    border-radius: 8px;
    border: none;
    background-color: royalblue;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .action:hover {
    background-color: darkblue;
  }

  .error {
    color: red;
    margin-bottom: 10px; 
  }

  .otp-message {
    color: green;
    margin-bottom: 10px; 
  }
`;

export default ForgotPassword;
