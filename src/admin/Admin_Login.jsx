import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://measuring-advanced-yoga-cooking.trycloudflare.com/admin/loginAdmin", {
        email,
        admin_password: password,
      });

      if (response.status === 200) {
        alert("Login Successful");
        
        // Store admin details in localStorage
        localStorage.setItem("adminEmail", email); // Store email to fetch admin details later
        localStorage.setItem("adminDetails", JSON.stringify(response.data.admin)); // Store full admin details

        navigate("/admin");
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
        <div className="heading">Faculty Sign In</div>
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
          <span className="forgot-password">
            <a href="#">Forgot Password ?</a>
          </span>
          <input value="Sign In" type="submit" className="login-button" />
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <span className="agreement">
          <a href="#">Learn user license agreement</a>
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
    max-width: 500px; /* Increase the width */
    width: 100%; /* Ensure it uses the full width within the max-width limit */
    background: #f8f9fd;
    background: linear-gradient(
      0deg,
      rgb(255, 255, 255) 0%,
      rgb(244, 247, 251) 100%
    );
    border-radius: 40px;
    padding: 50px 60px; /* Increase padding */
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 40px 40px -20px; /* Increase shadow */
    margin: 20px;
  }

  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 36px; /* Increase font size */
    color: rgb(16, 137, 211);
  }

  .form {
    margin-top: 30px; /* Add more spacing */
  }

  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 18px 25px; /* Increase padding */
    border-radius: 25px; /* Increase border radius */
    margin-top: 20px; /* Increase margin */
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }

  .form .forgot-password {
    display: block;
    margin-top: 15px;
    margin-left: 10px;
  }

  .form .forgot-password a {
    font-size: 12px; /* Slightly increase font size */
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
    padding-block: 18px; /* Increase padding */
    margin: 30px auto; /* Increase margin */
    border-radius: 25px; /* Increase border radius */
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 15px -15px;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  .social-account-container {
    margin-top: 35px; /* Increase margin */
  }

  .agreement {
    margin-top: 30px; /* Increase margin */
    text-align: center;
  }

  .agreement a {
    color: rgb(16, 137, 211);
    font-size: 12px; /* Slightly increase font size */
    text-decoration: none;
  }
`;


export default AdminLogin;
