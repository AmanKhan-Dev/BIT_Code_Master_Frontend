import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://35.226.248.183:8080/student/logins", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Login Successful");
        sessionStorage.setItem("email", email); // Store email in sessionStorage
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">Sign In</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="E-mail"
            id="email"
            name="email"
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Password"
            id="password"
            name="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Forgot Password Link */}
          <span className="forgot-password">
            <a href="/forgot" className="forgot-link">Forgot Password?</a>
          </span>
          <input value="Sign In" type="submit" className="login-button" />
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <span className="agreement">
          <a href="#">Learn user licence agreement</a>
        </span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #e2e8f0 25%, #f8fafc 100%);

  .container {
    max-width: 500px; 
    width: 100%; 
    background: #f8f9fd;
    background: linear-gradient(
      0deg,
      rgb(255, 255, 255) 0%,
      rgb(244, 247, 251) 100%
    );
    border-radius: 40px;
    padding: 50px 60px; 
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 40px 40px -20px; 
    margin: 20px;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 36px; 
    color: rgb(16, 137, 211);
  }

  .form {
    margin-top: 30px;
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 18px 25px;
    border-radius: 25px;
    margin-top: 20px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .forgot-password {
    display: block;
    margin-top: 15px;
    margin-left: 10px;
  }

  .form .forgot-password a {
    font-size: 12px; 
    color: #0099ff;
    text-decoration: none;
  }

  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(
      45deg,
      rgb(16, 137, 211) 0%,
      rgb(18, 177, 209) 100%
    );
    color: white;
    padding-block: 18px;
    margin: 30px auto;
    border-radius: 25px; 
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 15px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .agreement {
    margin-top: 30px;
    text-align: center;
  }

  .agreement a {
    color: rgb(16, 137, 211);
    font-size: 12px;
    text-decoration: none;
  }
`;

export default Login;
