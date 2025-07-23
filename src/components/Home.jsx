import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [counters, setCounters] = useState({
    users: 0,
    problems: 0,
    submissions: 0,
    contests: 0,
  });

  useEffect(() => {
    // Tailwind CSS CDN configuration
    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);

    // Configure Tailwind with Inter font
    const configScript = document.createElement("script");
    configScript.innerHTML = `
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
            },
          },
        },
      };
    `;
    document.head.appendChild(configScript);

    // Font Awesome CDN
    const fontAwesomeScript = document.createElement("script");
    fontAwesomeScript.src = "https://kit.fontawesome.com/a076d05399.js";
    fontAwesomeScript.crossOrigin = "anonymous";
    document.head.appendChild(fontAwesomeScript);

    // Google Fonts for Inter
    const googleFontsLink = document.createElement("link");
    googleFontsLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap";
    googleFontsLink.rel = "stylesheet";
    document.head.appendChild(googleFontsLink);

    // Scroll handler
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // Animate counters
    const animateCounters = () => {
      const targets = {
        users: 150,
        problems: 100,
        submissions: 200,
        contests: 10,
      };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        setCounters({
          users: Math.floor(targets.users * progress),
          problems: Math.floor(targets.problems * progress),
          submissions: Math.floor(targets.submissions * progress),
          contests: Math.floor(targets.contests * progress),
        });
        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === "stats") {
          animateCounters();
        }
      });
    });

    const statsElement = document.getElementById("stats");
    if (statsElement) observer.observe(statsElement);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      document.head.removeChild(tailwindScript);
      document.head.removeChild(configScript);
      document.head.removeChild(fontAwesomeScript);
      document.head.removeChild(googleFontsLink);
    };
  }, []);

  const languages = [
    { name: "C", icon: "fab fa-cuttlefish", color: "text-blue-600" },
    { name: "C++", icon: "fas fa-code", color: "text-blue-700" },
    { name: "Java", icon: "fab fa-java", color: "text-red-500" },
    { name: "Python", icon: "fab fa-python", color: "text-yellow-500" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        * {
          font-family: 'Inter', sans-serif;
          scroll-behavior: smooth;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 2s;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
          opacity: 0;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-left {
          animation: slideLeft 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-slide-right {
          animation: slideRight 0.8s ease-out forwards;
          opacity: 0;
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
        .animate-rotate {
          animation: rotate 20s linear infinite;
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideRight {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-scale-hover:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }
        .parallax-bg {
          transform: translateY(${scrollY * 0.5}px);
        }
        .gradient-overlay {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(37, 99, 235, 0.8) 100%);
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
          transition: all 0.3s ease;
        }
        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          transition: all 0.3s ease;
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(59, 130, 246, 0.3);
        }
        .!rounded-button {
          border-radius: 8px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .language-card:hover {
          transform: scale(1.1) rotate(5deg);
          transition: all 0.3s ease;
        }
      `}</style>
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <i className="fas fa-code text-2xl text-blue-600 mr-2"></i>
                <span className="text-xl font-bold text-gray-900">
                  BIT Code Master
                </span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
              >
                Problems
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
              >
                Contests
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
              >
                Leaderboard
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors cursor-pointer"
              >
                Profile
              </a>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              <Link to={"Login-Page"}>
              <button className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium transition-colors !rounded-button whitespace-nowrap cursor-pointer">
                Sign In
              </button>
              </Link>
              <Link to={"/Register"}>
              <button className="btn-primary text-white px-6 py-2 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer">
                Sign Up
              </button>
              </Link>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                <i
                  className={`fas ${isMenuOpen ? "fa-times" : "fa-bars"} text-xl`}
                ></i>
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                Home
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                Problems
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                Contests
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                Leaderboard
              </a>
              <a
                href="#"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 cursor-pointer"
              >
                Profile
              </a>
              <div className="flex space-x-2 px-3 py-2">
                <button onClick className="text-gray-700 hover:text-blue-600 px-4 py-2 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer">
                  Sign In
                </button>
                <button className="btn-primary text-white px-6 py-2 text-sm font-medium !rounded-button whitespace-nowrap cursor-pointer">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 parallax-bg"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=diverse%20group%20of%20computer%20science%20students%20actively%20coding%20and%20solving%20programming%20problems%20on%20laptops%20in%20a%20modern%20bright%20classroom%20environment%20with%20clean%20white%20walls%20and%20natural%20lighting&width=1440&height=1024&seq=hero-bg-001&orientation=landscape')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div className="absolute inset-0 gradient-overlay"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            Master Your Coding Skills
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in opacity-90">
            Practice, Learn, and Excel in C/C++, Java, and Python
          </p>
          <Link to={"/adminLogin"}>
          <button className="btn-primary text-white px-8 py-4 text-lg font-semibold !rounded-button whitespace-nowrap animate-float cursor-pointer">
            Faculty Sign In
          </button>
          </Link>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <i className="fas fa-chevron-down text-2xl"></i>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 overflow-hidden">
            <h2
              className="text-4xl font-bold text-gray-900 mb-4 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              Why Choose BIT Code Master?
            </h2>
            <p
              className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              Experience the most comprehensive coding platform designed for
              students and professionals
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div
              className="bg-white p-8 rounded-xl shadow-lg card-hover cursor-pointer animate-scale-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
                  <i className="fas fa-code text-2xl text-blue-600 animate-rotate"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Multiple Programming Languages
                </h3>
                <p className="text-gray-600">
                  Support for C, C++, Java, and Python with real-time syntax
                  highlighting and error detection
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg card-hover cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-hover">
                  <i className="fas fa-bolt text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Real-time Code Compilation
                </h3>
                <p className="text-gray-600">
                  Instant feedback with fast compilation and execution of your
                  code solutions
                </p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg card-hover cursor-pointer">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-hover">
                  <i className="fas fa-puzzle-piece text-2xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Interactive Problem Solving
                </h3>
                <p className="text-gray-600">
                  Engaging problems with step-by-step hints and detailed
                  explanations for better learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* Statistics Section */}
<section id="stats" className="py-20 bg-blue-600 w-full">
  <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-4 gap-8 text-center text-white overflow-hidden">
      <div style={{ animationDelay: "0.2s" }}>
        <div className="text-4xl font-bold mb-2">
          {counters.users.toLocaleString()}+
        </div>
        <div className="text-lg opacity-90">Active Users</div>
      </div>
      <div>
        <div className="text-4xl font-bold mb-2">
          {counters.problems.toLocaleString()}+
        </div>
        <div className="text-lg opacity-90">Problems Available</div>
      </div>
      <div>
        <div className="text-4xl font-bold mb-2">
          {counters.submissions.toLocaleString()}+
        </div>
        <div className="text-lg opacity-90">Successful Submissions</div>
      </div>
      <div>
        <div className="text-4xl font-bold mb-2">
          {counters.contests.toLocaleString()}+
        </div>
        <div className="text-lg opacity-90">Active Question Sets</div>
      </div>
    </div>
  </div>
</section>
      {/* Languages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Supported Programming Languages
            </h2>
            <p className="text-xl text-gray-600">
              Master the most popular programming languages used in the industry
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {languages.map((lang, index) => (
              <div
                key={index}
                className="text-center language-card cursor-pointer animate-scale-in"
                style={{ animationDelay: `${0.2 * (index + 1)}s` }}
              >
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${lang.icon} text-4xl ${lang.color}`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {lang.name}
                </h3>
                <p className="text-gray-600">
                 
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://readdy.ai/api/search-image?query=abstract%20modern%20tech%20pattern%20with%20flowing%20lines%20and%20dots%20on%20dark%20background%20perfect%20for%20technology%20website%20background&width=1440&height=400&seq=cta-bg-001&orientation=landscape')] opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-scale-in" style={{ animationDelay: "0.3s" }}>
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Begin Your Coding Journey?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join numerous BIT students who are already
              mastering their coding skills
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 text-lg font-semibold !rounded-button hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
              Get Started Free
            </button>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div
              className="animate-slide-left"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center mb-4 hover:transform hover:translate-x-2 transition-transform duration-300">
                <i className="fas fa-code text-2xl text-blue-400 mr-2"></i>
                <span className="text-xl font-bold">BIT Code Master</span>
              </div>
              <p className="text-gray-400">
                Empowering students and professionals to master programming
                skills through interactive learning.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Problems
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Contests
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-facebook text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-twitter text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-linkedin text-xl"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <i className="fab fa-github text-xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 BIT Code Master. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;