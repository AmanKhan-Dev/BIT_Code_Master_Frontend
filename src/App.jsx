import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import QuizStepper from "./components/quiz/QuizStepper";
import Quiz from "./components/quiz/Quiz";
import QuizResult from "./components/quiz/QuizResult";
import GetAllQuiz from "./components/quiz/GetAllQuiz";
import AddQuestion from "./components/question/AddQuestion";
import UpdateQuestion from "./components/question/UpdateQuestion";
import Navbar from "./components/layout/NavBar";
import Admin from "./components/Admin";
import Register from "./components/question/Register";
import LoginPage from "../utils/LoginPage";
import Compiler from "./components/Compiler";
import CodeEditor from "./components/question/CodeEditor";
import QuestionSetForm from "./components/question/QuestionSetForm";
import Pallate from "./components/quiz/Question-Pallate";
import AddCodingQuestion from "./components/question/AddCodingQuestion";
import AdminLogin from "./admin/Admin_Login";
import QuestionDetail from "./components/quiz/QuestionDetail";

import CompileTests from "./components/question/CodeCompiler";
import JoinChallenge from "./components/quiz/JoinTest";
import Dashboard from "../utils/UserDashboard";
import JdoodleEmbed from "./components/question/JdoodleEnbad";
import Card from "./components/quiz/Card";
import OTP from "./components/quiz/Otp";


const App = () => {
  const location = useLocation();

  // Show Navbar only on the following paths
  const showNavbar = ["/", "/Login-Page", "/Register"].includes(location.pathname);

  return (
    <main className="container mt-5 mb-5">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Login-Page" element={<LoginPage />} />
        <Route path="/quiz-stepper" element={<QuizStepper />} />
        <Route path="/take-quiz" element={<Quiz />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/compiler" element={<CodeEditor />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/compiler" element={<Compiler />} />
        <Route path="/create-quiz" element={<AddQuestion />} />
        <Route path="/update-quiz/:id" element={<UpdateQuestion />} />
        <Route path="/all-quizzes" element={<GetAllQuiz />} />
        <Route path="/quiz-result" element={<QuizResult />} />
        <Route path="/addset" element={<QuestionSetForm />} />
        <Route path="/addcq" element={<AddCodingQuestion />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/cc" element={<CompileTests />} />
        <Route path="/questions/:questionSetId/:questionNo" element={<QuestionDetail />} />
        <Route path="/join" element={<JoinChallenge />} />
        <Route path="/pallate/:questionSetId" element={<Pallate />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jj" element={<JdoodleEmbed/>} />
        <Route path="/card" element={<Card/>} />
        <Route path="/otp" element={<OTP/>} />

   
      </Routes>
    </main>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
