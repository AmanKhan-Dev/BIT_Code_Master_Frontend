import React from 'react';
import { Book, Trophy, Lightbulb } from 'lucide-react';

const Button = ({ children, primary = false, ...props }) => (
  <button
    {...props}
    style={{
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: primary ? '#2563eb' : 'white',
      color: primary ? 'white' : '#2563eb',
      transition: 'background-color 0.3s',
    }}
  >
    {children}
  </button>
);

const Card = ({ children, ...props }) => (
  <div
    {...props}
    style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      margin: '10px',
      flex: '1 1 300px',
    }}
  >
    {children}
  </div>
);

const IconWrapper = ({ children }) => (
  <div style={{ 
    backgroundColor: '#eff6ff', 
    borderRadius: '50%', 
    width: '60px', 
    height: '60px', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    marginBottom: '1rem'
  }}>
    {children}
  </div>
);

function Home() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#333', lineHeight: 1.6 }}>
      {/* Hero Section */}
      <header style={{ backgroundColor: '#3b82f6', color: 'white', textAlign: 'center', padding: '4rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to BIT Quiz Master</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>Test your knowledge, challenge your friends, and learn something new every day!</p>
        <Button primary>Start Quizzing Now</Button>
      </header>

      {/* Features Section */}
      <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
        <h2 style={{ textAlign: 'center', color: '#2563eb', marginBottom: '2rem' }}>Why Choose QuizMaster?</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Card>
            <IconWrapper>
              <Book size={32} color="#2563eb" aria-hidden="true" />
            </IconWrapper>
            <h3 style={{ color: '#2563eb' }}>Diverse Topics</h3>
            <p>From history to pop culture, we've got quizzes on every subject imaginable.</p>
          </Card>
          <Card>
            <IconWrapper>
              <Trophy size={32} color="#2563eb" aria-hidden="true" />
            </IconWrapper>
            <h3 style={{ color: '#2563eb' }}>Competitive Leaderboards</h3>
            <p>Compete with friends and quiz enthusiasts from around the world.</p>
          </Card>
          <Card>
            <IconWrapper>
              <Lightbulb size={32} color="#2563eb" aria-hidden="true" />
            </IconWrapper>
            <h3 style={{ color: '#2563eb' }}>Learn as You Play</h3>
            <p>Expand your knowledge while having fun with our educational quizzes.</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ backgroundColor: '#eff6ff', padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#2563eb', marginBottom: '1rem' }}>Ready to Put Your Knowledge to the Test?</h2>
        <p style={{ marginBottom: '2rem' }}>Join thousands of quiz enthusiasts and start your journey today!</p>
		<Button primary onClick={() => window.location.href = '/Register'}>
  Sign Up for Free
</Button>

      </section>

      {/* Testimonial Section */}
      <section style={{ maxWidth: '800px', margin: '4rem auto', padding: '0 2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#2563eb', marginBottom: '2rem' }}>What Our Users Say</h2>
        <blockquote style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '1rem' }}>
          "BIT Quiz Master has become my go-to app for learning new things. The variety of quizzes keeps me engaged, and I love competing with my friends!"
        </blockquote>
        <p style={{ fontWeight: 'bold' }}>- Aman Khan</p>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#2563eb', color: 'white', padding: '2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p>&copy; 2023 QuizMaster. All rights reserved.</p>
          <div style={{ marginTop: '1rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Contact Us'].map((item) => (
              <a key={item} href="#" style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}>{item}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
