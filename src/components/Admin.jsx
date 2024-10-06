import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();

    // Retrieve admin details from localStorage
    const adminDetails = JSON.parse(localStorage.getItem("adminDetails"));

    const handleLogout = () => {
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminDetails");
        navigate("/adminLogin"); // Redirect to login page
    };

    return (
        <section className="container">
            <h2 className="mt-5">Welcome to the Admin Home Page</h2>
            <hr />
            {adminDetails ? (
                <div>
                    <p>ID: {adminDetails.admin_id}</p>
                    <p>Name: {adminDetails.admin_full_name}</p>
                    <p>Email: {adminDetails.email}</p>
                </div>
            ) : (
                <p>Loading admin details...</p>
            )}
            <nav className="nav flex-column">
                <Link to={"/adminLogin"} className="nav-link">
                    Admin Login
                </Link>
                <Link to={"/create-quiz"} className="nav-link">
                    Create a New Quiz
                </Link>
                <Link to={"/all-quizzes"} className="nav-link">
                    Manage Existing Quizzes
                </Link>
                <Link to={"/cc"} className="nav-link">
                    Code Compiler
                </Link>
                <Link to={"/join"} className="nav-link">
                    Join Challenge
                </Link>
            </nav>
            {/* Logout Button */}
            <button onClick={handleLogout} className="btn btn-danger mt-3">
                Logout
            </button>
        </section>
    );
};

export default Admin;
