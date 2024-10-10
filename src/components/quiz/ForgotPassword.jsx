import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const ForgotPassword = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [error, setError] = useState(""); // State for error messages

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setOtpSent(true);
        setError(""); // Clear any previous error
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Error sending OTP. Please try again.");
    }
  };

  const handleOtpInput = (e, nextInputId) => {
    if (e.target.value.length === 1) {
      setOtp((prev) => prev + e.target.value); // Update OTP state
      document.getElementById(nextInputId)?.focus(); // Focus on the next input
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        setOtpSent(false); // Reset OTP sent status
        setPasswordUpdated(true); // Trigger password update form
        setError(""); // Clear any previous error
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
    // Check if the new password and confirmation password match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!"); // Alert user if passwords don't match
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/student/updatePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }), // Send email, OTP, and new password to update
      });

      if (response.ok) {
        alert("Password updated successfully!");
        // Redirect to the login page after successful password update
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
      {!passwordUpdated ? ( // Only show OTP/email form if password has not been updated
        <form className="form" onSubmit={otpSent ? handleOtpSubmit : handleEmailSubmit}>
          <div className="title">Forgot Password</div>
          {error && <div className="error">{error}</div>} {/* Display error messages */}
          
          {!otpSent ? ( // Show email input only if OTP hasn't been sent
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

          {otpSent ? ( // Show OTP input if OTP has been sent
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
      ) : ( // Show password update form when passwordUpdated is true
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
  }

  .error {
    color: red;
    margin-bottom: 10px; // Margin for spacing
  }
`;

export default ForgotPassword;
