import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { Book, Trophy, Lightbulb, Users, Code, Star, Bot } from "lucide-react";
import styled from "styled-components";

const CustomButton = ({ children, primary = false, secondary = false, ...props }) => (
  <StyledButton className={`${primary ? 'primary' : ''} ${secondary ? 'secondary' : ''}`} {...props}>
    {children}
  </StyledButton>
);

const Card = ({ children, ...props }) => (
  <StyledCard {...props}>
    {children}
  </StyledCard>
);

const IconWrapper = ({ children }) => (
  <StyledIconWrapper>
    {children}
  </StyledIconWrapper>
);

function Home() {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  return (
    <StyledWrapper>
      {/* Hero Section */}
      <HeroSection>
        <div className="hero-content">
          <div className="hero-badge">
            <Code size={20} />
            <span>New Challenges Added Weekly</span>
          </div>
          <h1>Welcome to BIT Code Master</h1>
          <p className="hero-subtitle">
            Test your knowledge, challenge your friends, and learn something new every day!
          </p>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Challenges</span>
            </div>
            <div className="stat">
              <span className="stat-number">50+</span>
              <span className="stat-label">Topics</span>
            </div>
          </div>
          <CustomButton primary onClick={handleShow}>
            🚀 Start Taking Coding Challenge Now
          </CustomButton>
        </div>
        <div className="hero-decoration">
          <div className="floating-element element-1">💻</div>
          <div className="floating-element element-2">🎯</div>
          <div className="floating-element element-3">⚡</div>
        </div>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <div className="section-header">
          <h2>Why Choose CODE-MASTER?</h2>
          <p>Discover what makes our platform the perfect choice for coding enthusiasts</p>
        </div>
        
        <div className="image-container">
          <img
            src="/bit-code-master2.jpg"
            alt="Bit Code Master"
            className="feature-image"
          />
        </div>

        <div className="features-grid">
          <Card>
            <IconWrapper>
              <Book size={32} color="#667eea" />
            </IconWrapper>
            <h3>Diverse Topics</h3>
            <p>From Basic Operations to Data Structures, we've got questions on every category imaginable.</p>
            <div className="card-footer">
              <span className="feature-count">50+ Topics</span>
            </div>
          </Card>
          
          <Card>
            <IconWrapper>
              <Trophy size={32} color="#667eea" />
            </IconWrapper>
            <h3>Competitive Leaderboards</h3>
            <p>Compete with friends and coding enthusiasts from around the campus.</p>
            <div className="card-footer">
              <span className="feature-count">Live Rankings</span>
            </div>
          </Card>
          
          <Card>
            <IconWrapper>
              <Lightbulb size={32} color="#667eea" />
            </IconWrapper>
            <h3>Learn as You Play</h3>
            <p>Expand your knowledge while having fun with our educational Coding Test.</p>
            <div className="card-footer">
              <span className="feature-count">Interactive Learning</span>
            </div>
          </Card>

          <Card>
            <IconWrapper>
              <Bot size={32} color="#667eea" />
            </IconWrapper>
            <h3>AI Code Evaluator</h3>
            <p>Our advanced AI evaluates your code to ensure it solves the problem as per the statement, providing instant smart feedback.</p>
            <div className="card-footer">
              <span className="feature-count">Intelligent Assessment</span>
            </div>
          </Card>
        </div>
      </FeaturesSection>

      {/* Supported Languages Section */}
      <LanguagesSection>
        <div className="section-header">
          <h2>Supported Programming Languages</h2>
          <p>We support the most popular languages to make coding accessible for everyone</p>
        </div>
        <div className="languages-grid">
          <div className="language-card">
            <Code size={40} color="#667eea" />
            <h3>Java</h3>
          </div>
          <div className="language-card">
            <Code size={40} color="#667eea" />
            <h3>C/C++</h3>
          </div>
          <div className="language-card">
            <Code size={40} color="#667eea" />
            <h3>Python</h3>
          </div>
        </div>
      </LanguagesSection>

      {/* Stats Section */}
      <StatsSection>
        <div className="stats-container">
          <div className="stat-card">
            <Users size={40} color="#667eea" />
            <h3>1000+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-card">
            <Code size={40} color="#667eea" />
            <h3>500+</h3>
            <p>Coding Challenges</p>
          </div>
          <div className="stat-card">
            <Trophy size={40} color="#667eea" />
            <h3>100+</h3>
            <p>Competitions Held</p>
          </div>
          <div className="stat-card">
            <Star size={40} color="#667eea" />
            <h3>4.9/5</h3>
            <p>Student Rating</p>
          </div>
        </div>
      </StatsSection>

      {/* CTA Section */}
      <CTASection>
        <div className="cta-content">
          <h2>Ready to Put Your Knowledge to the Test?</h2>
          <p>Join thousands of coding enthusiasts and start your journey today!</p>
          <div className="cta-buttons">
            <CustomButton primary onClick={() => (window.location.href = "/Register")}>
              🎯 Sign Up for Free
            </CustomButton>
            <CustomButton secondary onClick={handleShow}>
              👥 Sign In
            </CustomButton>
          </div>
        </div>
      </CTASection>

      {/* Testimonial Section */}
      <TestimonialSection>
        <div className="testimonial-header">
          <h2>What Our Users Say</h2>
          <p>Hear from students who've transformed their coding skills</p>
        </div>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <blockquote>
                "BIT Code Master has become my go-to app for learning new things. The variety of Questions and their Category keeps me engaged!"
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div className="author-info">
                  <span className="author-name">Arjun Patel</span>
                  <span className="author-role">III Year CSE</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <blockquote>
                "The competitive aspect really motivates me to keep improving. Love the leaderboards!"
              </blockquote>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div className="author-info">
                  <span className="author-name">Sneha Sharma</span>
                  <span className="author-role">IV Year IT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TestimonialSection>

      {/* Footer */}
      <Footer>
        <div className="footer-content">
          <div className="footer-main">
            <div className="footer-brand">
              <h3>BIT CODE-Master</h3>
              <p>Empowering the next generation of coders</p>
            </div>
            <div className="footer-links">
              <div className="link-group">
                <h4>Platform</h4>
                <a href="#">Challenges</a>
                <a href="#">Leaderboard</a>
                <a href="#">Practice</a>
              </div>
              <div className="link-group">
                <h4>Support</h4>
                <a href="#">Help Center</a>
                <a href="#">Contact Us</a>
                <a href="#">FAQ</a>
              </div>
              <div className="link-group">
                <h4>Legal</h4>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Cookie Policy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 BIT CODE-Master. All rights reserved.</p>
            <div className="social-links">
              <span>Follow us:</span>
              <a href="#">LinkedIn</a>
              <a href="#">Twitter</a>
              <a href="#">GitHub</a>
            </div>
          </div>
        </div>
      </Footer>

      {/* Enhanced Offcanvas */}
      <StyledOffcanvas
        show={showOffcanvas}
        onHide={handleClose}
        placement="center"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="modal-title">
              <Code size={24} color="#667eea" />
              Connect With Us
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="modal-content">
            <p>Please select your role to proceed and sign-in as Student or Admin.</p>
            <div className="role-buttons">
              <div className="role-option" onClick={() => (window.location.href = "/Login-Page")}>
                <div className="role-icon">👨‍🎓</div>
                <div className="role-info">
                  <h4>Student Sign In</h4>
                  <p>Access challenges and track progress</p>
                </div>
              </div>
              <div className="role-option" onClick={() => (window.location.href = "/adminLogin")}>
                <div className="role-icon">👨‍💼</div>
                <div className="role-info">
                  <h4>Admin Sign In</h4>
                  <p>Manage platform and monitor students</p>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </StyledOffcanvas>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: #2d3748;
  line-height: 1.6;
  overflow-x: hidden;
`;

const StyledButton = styled.button`
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &.primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
  }
  
  &.secondary {
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
    border: 2px solid rgba(102, 126, 234, 0.2);
    
    &:hover {
      background: rgba(102, 126, 234, 0.15);
      transform: translateY(-2px);
    }
  }
`;

const StyledCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin: 15px;
  flex: 1 1 300px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
  
  h3 {
    color: #2d3748;
    margin: 15px 0;
    font-size: 1.3rem;
    font-weight: 700;
  }
  
  p {
    color: #718096;
    margin-bottom: 20px;
  }
  
  .card-footer {
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid rgba(102, 126, 234, 0.1);
  }
  
  .feature-count {
    color: #667eea;
    font-weight: 600;
    font-size: 0.9rem;
  }
`;

const StyledIconWrapper = styled.div`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  border: 2px solid rgba(102, 126, 234, 0.2);
`;

const HeroSection = styled.header`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.8)), url('https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2') center/cover no-repeat;
  color: white;
  text-align: center;
  padding: 6rem 2rem;
  position: relative;
  overflow: hidden;
  
  .hero-content {
    max-width: 800px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
  }
  
  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    padding: 8px 16px;
    border-radius: 25px;
    font-size: 0.9rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  
  h1 {
    font-size: 3.5rem;
    margin-bottom: 1.5rem;
    font-weight: 800;
    background: linear-gradient(45deg, #ffffff, #e2e8f0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  .hero-subtitle {
    font-size: 1.3rem;
    margin-bottom: 3rem;
    opacity: 0.9;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .hero-stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
      gap: 1.5rem;
    }
  }
  
  .stat {
    text-align: center;
    
    .stat-number {
      display: block;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }
    
    .stat-label {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
  
  .hero-decoration {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
  }
  
  .floating-element {
    position: absolute;
    font-size: 2rem;
    animation: float 6s ease-in-out infinite;
    opacity: 0.3;
    
    &.element-1 {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }
    
    &.element-2 {
      top: 60%;
      right: 15%;
      animation-delay: 2s;
    }
    
    &.element-3 {
      bottom: 20%;
      left: 20%;
      animation-delay: 4s;
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
`;

const FeaturesSection = styled.section`
  max-width: 1200px;
  margin: 6rem auto;
  padding: 0 2rem;
  
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
    
    h2 {
      color: #2d3748;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    p {
      color: #718096;
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  .image-container {
    text-align: center;
    margin: 4rem 0;
    
    .feature-image {
      max-width: 100%;
      height: auto;
      border-radius: 20px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
    }
  }
  
  .features-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
`;

const LanguagesSection = styled.section`
  max-width: 1200px;
  margin: 6rem auto;
  padding: 0 2rem;
  
  .section-header {
    text-align: center;
    margin-bottom: 4rem;
    
    h2 {
      color: #2d3748;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    p {
      color: #718096;
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto;
    }
  }
  
  .languages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    justify-content: center;
  }
  
  .language-card {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
      margin: 1rem 0 0.5rem 0;
    }
  }
`;

const StatsSection = styled.section`
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
  padding: 6rem 2rem;
  
  .stats-container {
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
  }
  
  .stat-card {
    text-align: center;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    h3 {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2d3748;
      margin: 1rem 0 0.5rem 0;
    }
    
    p {
      color: #718096;
      font-weight: 500;
    }
  }
`;

const CTASection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 6rem 2rem;
  text-align: center;
  color: white;
  
  .cta-content {
    max-width: 800px;
    margin: 0 auto;
    
    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
    }
    
    p {
      font-size: 1.2rem;
      margin-bottom: 3rem;
      opacity: 0.9;
    }
  }
  
  .cta-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const TestimonialSection = styled.section`
  max-width: 1000px;
  margin: 6rem auto;
  padding: 0 2rem;
  
  .testimonial-header {
    text-align: center;
    margin-bottom: 4rem;
    
    h2 {
      color: #2d3748;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    
    p {
      color: #718096;
      font-size: 1.1rem;
    }
  }
  
  .testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 2rem;
  }
  
  .testimonial-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
  }
  
  .stars {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  
  blockquote {
    font-size: 1.1rem;
    font-style: italic;
    margin-bottom: 1.5rem;
    color: #2d3748;
    line-height: 1.6;
  }
  
  .testimonial-author {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  .author-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 1.2rem;
  }
  
  .author-name {
    font-weight: 600;
    color: #2d3748;
    display: block;
  }
  
  .author-role {
    color: #718096;
    font-size: 0.9rem;
  }
`;

const Footer = styled.footer`
  background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
  color: white;
  padding: 4rem 2rem 2rem;
  
  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-main {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
    margin-bottom: 3rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }
  
  .footer-brand h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .footer-brand p {
    color: #a0aec0;
  }
  
  .footer-links {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  
  .link-group h4 {
    font-weight: 600;
    margin-bottom: 1rem;
    color: #e2e8f0;
  }
  
  .link-group a {
    display: block;
    color: #a0aec0;
    text-decoration: none;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: #667eea;
    }
  }
  
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    border-top: 1px solid #4a5568;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
  }
  
  .social-links {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    span {
      color: #a0aec0;
    }
    
    a {
      color: #a0aec0;
      text-decoration: none;
      transition: color 0.3s ease;
      
      &:hover {
        color: #667eea;
      }
    }
  }
`;

const StyledOffcanvas = styled(Offcanvas)`
  .offcanvas {
    position: fixed !important;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 90% !important;
    max-width: 500px !important;
    height: auto !important;
    border-radius: 20px !important;
    border: none !important;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3) !important;
    background: rgba(255, 255, 255, 0.95) !important;
    backdrop-filter: blur(20px) !important;
  }
  
  .offcanvas-header {
    border-bottom: 1px solid rgba(102, 126, 234, 0.1);
    padding: 1.5rem;
    
    .modal-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      color: #2d3748;
    }
  }
  
  .offcanvas-body {
    padding: 2rem;
  }
  
  .modal-content p {
    text-align: center;
    color: #718096;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  
  .role-buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .role-option {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(102, 126, 234, 0.05);
    border: 2px solid rgba(102, 126, 234, 0.1);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      background: rgba(102, 126, 234, 0.1);
      border-color: rgba(102, 126, 234, 0.3);
      transform: translateY(-2px);
    }
  }
  
  .role-icon {
    font-size: 2rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%;
  }
  
  .role-info h4 {
    margin: 0 0 0.5rem 0;
    color: #2d3748;
    font-weight: 600;
  }
  
  .role-info p {
    margin: 0;
    color: #718096;
    font-size: 0.9rem;
  }
`;

export default Home;