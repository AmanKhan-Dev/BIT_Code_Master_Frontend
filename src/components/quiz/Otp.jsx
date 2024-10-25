import React, { useState } from "react";
import styled from "styled-components";

const OTP = () => {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://35.226.248.183:8080/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // Ensure the email is sent as a JSON object
      });
  
      if (response.ok) {
        setOtpSent(true); // Show OTP fields if email was sent successfully
      } else {
        // Handle errors here
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };
  

  const handleOtpInput = (e, nextInputId) => {
    if (e.target.value.length === 1) {
      document.getElementById(nextInputId).focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://35.226.248.183:8080/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp }), // Send the OTP to verify
      });

      if (response.ok) {
        // Redirect to the login page or handle success
        window.location.href = "/Login-Page"; // Adjust the path as necessary
      } else {
        // Handle invalid OTP
        console.error("Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }
  };

  return (
    <StyledWrapper>
      <form className="form" onSubmit={otpSent ? handleOtpSubmit : handleEmailSubmit}>
        <div className="title">OTP</div>
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
        ) : (
          <>
            <div className="title">Enter Verification Code</div>
            <div className="inputs">
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  key={index}
                  id={`input${index + 1}`}
                  type="text"
                  maxLength={1}
                  onInput={(e) => {
                    setOtp((prev) => prev + e.target.value);
                    handleOtpInput(e, `input${index + 2}`);
                  }}
                />
              ))}
            </div>
          </>
        )}
        <button type="submit" className="action">
          {otpSent ? "Verify Me" : "Send OTP"}
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .form {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    width: 300px;
    background-color: white;
    border-radius: 12px;
    padding: 20px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    color: black;
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
    margin: 0 5px; /* Reduced margin for better spacing */
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
`;

export default OTP;
