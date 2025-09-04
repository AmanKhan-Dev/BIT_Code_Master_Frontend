import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:8080/api/quizzes" // Ensure this is the correct base URL for quiz APIs
});

export const api1 = axios.create({
    baseURL: "http://localhost:8080/codingQuestions" // Ensure this is the correct base URL for coding questions
});

export const createQuestion = async (quizQuestion) => {
    try {
        const response = await api.post("/create-new-question", quizQuestion);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Fetch all questions based on questionSetId
export const getAllQuestions = async (questionSetId) => {
    try {
        const response = await api1.get("/questionsBySetId", {
            params: { questionSetId } // Pass the questionSetId as a query parameter
        });
        return response.data; // Return the fetched data
    } catch (error) {
        console.error("Error fetching questions:", error);
        return []; // Return an empty array in case of error
    }
};


// export const getQuestionsBySetId = async (questionSetId) => {
//   try {
//     const response = await api1.get("/allCodingQuestions", {
//       params: { questionSetId }
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching questions:", error);
//     throw error; // Rethrow to handle it in the component
//   }
// };


// Get the coding Questions 
export const Pallate = async() =>{
  try {
    const response = await api.get("/all-questions")
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}











export const fetchQuizForUser = async(number, subject) =>{
  try {
    const response = await api.get(
			`/quiz/fetch-questions-for-user?numOfQuestions=${number}&subject=${subject}`
		)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getSubjects = async() =>{
  try {
    const response = await api.get("/subjects")
    return response.data
  } catch (error) {
    console.error(error)

  }
}
export const loginpage = async() =>{
  try {
    const response = await api.get("/LoginPage")
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const updateQuestion = async(id, question) =>{
  try {
    const response = await api.put(`/question/${id}/update`, question)
    return response.data
  } catch (error) {
    console.error(error)

  }
}

export const getQuestionById = async(id) =>{
  try {
    const response = await api.get(`/question/${id}`)
		return response.data
  } catch (error) {
    console.error(error)
  }
}


export const saveStudent = async (studentData) => {
  try {
    const response = await api.post("/student/saveStudent", studentData);
    return response.data;
  } catch (error) {
    console.error("Error saving student:", error);

  }
};
export const saveAdmin = async (adminData) => {
  try {
    const response = await api.post("/admin/saveAdmin", adminData);
    return response.data;
  } catch (error) {
    console.error("Error saving Admin:", error);

  }
};


export const deleteQuestion = async(id) =>{
  try {
    const response = await api.delete(`/question/${id}/delete`)
		return response.data
  } catch (error) {
    console.error(error)
  }

  
}