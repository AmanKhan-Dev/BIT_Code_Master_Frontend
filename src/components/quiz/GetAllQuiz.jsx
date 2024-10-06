import React, { useEffect, useState } from "react";
import { deleteQuestion, getAllQuestions } from "../../../utils/QuizService";
import { Link, useLocation } from "react-router-dom"; 
import { FaPlus } from "react-icons/fa";

const GetAllQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isQuestionDeleted, setIsQuestionDeleted] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState("");

    const location = useLocation(); 
    const queryParams = new URLSearchParams(location.search);
    const questionSetId = queryParams.get("setId"); 

    useEffect(() => {
        fetchQuestions();
    }, [questionSetId]); 

    const fetchQuestions = async () => {
        try {
            const response = await getAllQuestions(questionSetId); 
            console.log("Fetched Questions: ", response); // Log the fetched questions
            setQuestions(response); 
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching questions:", error);
            setIsLoading(false);
        }
    };

    const handleDeleteQuestion = async (id) => {
        try {
            await deleteQuestion(id);
            setQuestions((prevQuestions) => prevQuestions.filter((question) => question.id !== id));
            setIsQuestionDeleted(true);
            setDeleteSuccess("Question deleted successfully.");
        } catch (error) {
            console.error("Error deleting question:", error);
        }
        setTimeout(() => {
            setDeleteSuccess("");
        }, 4000);
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <section className="container">
            <div className="row mt-5">
                <div className="col-md-6 mb-2 md-mb-0" style={{ color: "GrayText" }}>
                    <h4>All Quiz Questions</h4>
                </div>
                <div className="col-md-4 d-flex justify-content-end">
                    <Link to={"/create-quiz"}>
                        <FaPlus /> Add Question
                    </Link>
                </div>
            </div>
            <hr />
            {isQuestionDeleted && <div className="alert alert-success">{deleteSuccess}</div>}
            {questions.length === 0 ? (
                <p>No questions available.</p>
            ) : (
                questions.map((question, index) => (
                    <div key={question.questionNo}>
                        <pre>
                            <h4 style={{ color: "GrayText" }}>{`${index + 1}. ${question.question}`}</h4>
                        </pre>
                        <p className="text-success">Category: {question.questionCategory}</p>
                        <div className="btn-group mb-4">
                            <Link to={`/update-quiz/${question.questionNo}`}>
                                <button className="btn btn-sm btn-outline-warning mr-2">Edit Question</button>
                            </Link>
                            <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleDeleteQuestion(question.questionNo)}
                            >
                                Delete Question
                            </button>
                        </div>
                    </div>
                ))
            )}
        </section>
    );
};

export default GetAllQuiz;
