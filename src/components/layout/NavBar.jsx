// src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <h3 className="logo">BIT CODE MASTER</h3>
      <ul className={isMobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)}>
        <li>
          <Link to="/" className="home">Home</Link>
        </li>
        <li>
          <Link to="/" className="about">About</Link>
        </li>
        <li>
          <Link to="/Login-Page" className="login">Login</Link>
        </li>
        <li>
          <Link to="/adminLogin" className="login"> Faculty Login</Link>
        </li>
        <li>
          <Link to="/Register" className="signup">Sign Up</Link>
        </li>
      </ul>
      <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
      </button>
    </nav>
  );
}

export default Navbar;
