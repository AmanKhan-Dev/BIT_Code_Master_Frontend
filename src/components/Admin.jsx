import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled Components
const Container = styled(motion.section)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a, #3b82f6);
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  color: white;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Divider = styled.hr`
  border: 0;
  height: 2px;
  background: linear-gradient(to right, transparent, #ffffff, transparent);
  margin: 1.5rem 0;
`;

const InfoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const InfoText = styled.p`
  font-size: 1.1rem;
  margin: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Nav = styled(motion.nav)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NavLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  font-weight: 500;
  text-align: center;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateX(5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
`;

const LogoutButton = styled(motion.button)`
  padding: 0.75rem 2rem;
  background: linear-gradient(45deg, #dc2626, #f87171);
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1.5rem;
  width: 100%;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background: linear-gradient(45deg, #b91c1c, #dc2626);
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  }
`;

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const Admin = () => {
  const navigate = useNavigate();
  const adminDetails = JSON.parse(localStorage.getItem("adminDetails"));

  const handleLogout = () => {
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminDetails");
    navigate("/adminLogin");
  };

  return (
    <Container
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="container"
    >
      <Title variants={itemVariants}>Welcome to the Admin Home Page</Title>
      <Divider />
      {adminDetails ? (
        <InfoCard variants={itemVariants}>
          <InfoText>
            <i className="fas fa-id-badge"></i> ID: {adminDetails.admin_id}
          </InfoText>
          <InfoText>
            <i className="fas fa-user"></i> Name: {adminDetails.admin_full_name}
          </InfoText>
          <InfoText>
            <i className="fas fa-envelope"></i> Email: {adminDetails.email}
          </InfoText>
        </InfoCard>
      ) : (
        <InfoText variants={itemVariants}>Loading admin details...</InfoText>
      )}
      <Nav variants={itemVariants}>
        <NavLink to="/adminLogin">Admin Login</NavLink>
        <NavLink to="/card">Manage Existing Sets</NavLink>
        <NavLink to="/addset">Add a new question set</NavLink>
        <NavLink to="/solversPallate">See Solvers History</NavLink>
      </Nav>
      <LogoutButton
        onClick={handleLogout}
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Logout
      </LogoutButton>
    </Container>
  );
};

export default Admin;