import axios from "axios";

// Define the base URL for your student-related endpoints
export const studentApi = axios.create({
  baseURL: "http://localhost:8080/student"
});


export const saveStudent = async (studentData) => {
  try {
    const response = await studentApi.post("/saveStudent", studentData);
    return response.data;
  } catch (error) {
    console.error("Error saving student:", error);
    throw error; // Re-throw error to handle it in the UI
  }
};
export const loginpage = async () => {
  try {
    const response = await studentApi.get("/logins");
    return response.data;
  } catch (error) {
    console.error("Error login:", error);
    return [];
  }
};



export const getAllStudents = async () => {
  try {
    const response = await studentApi.get("/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    return [];
  }
};

// Function to check if an email already exists (if you have this route)
export const checkStudentEmailExists = async (email) => {
  try {
    const response = await studentApi.get(`/email-exists?email=${email}`);
    return response.data.exists; // Assuming the API returns a boolean
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
};
