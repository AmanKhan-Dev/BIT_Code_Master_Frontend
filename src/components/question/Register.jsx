import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { saveStudent } from "../../../utils/StudentService";
import FadeTransition from './FadeTransition'; // Import the FadeTransition component
import './fadetransition.css'; // Import the CSS file
import { useNavigate } from "react-router-dom"; 

function Register() {
  const [student, setStudent] = useState({
    full_name: '',
    email: '',
    prn_no: '',
    roll_no: '',
    password: '',
    subscribe: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate hook here

  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setStudent({
      ...student,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateFields = () => {
    const newErrors = {};
    if (!student.full_name) newErrors.full_name = 'Full Name is required';
    if (!student.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(student.email)) newErrors.email = 'Email is not valid';
    if (!student.prn_no) newErrors.prn_no = 'PRN is required';
    else if (student.prn_no <= 0) newErrors.prn_no = 'PRN should be a positive number';
    if (!student.roll_no) newErrors.roll_no = 'Roll Number is required';
    if (!student.password) newErrors.password = 'Password is required';
    else if (student.password.length < 8) newErrors.password = 'Password must contain at least 8 characters';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log('Submitting student data:', student);

    setIsSubmitting(true);
    try {
      const response = await saveStudent(student);
      if (response && response.message === 'Student saved successfully') {
        alert('Registration successful!');
        setStudent({
          full_name: '',
          email: '',
          prn_no: '',
          roll_no: '',
          password: '',
          subscribe: false,
        });
        setErrors({});
        navigate("/Login-Page"); // Use navigate to redirect
      } else {
        alert('Failed to register student. Please try again.');
      }
    } catch (error) {
      console.error('Error during submission:', error);
      alert('Student Exist Already');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MDBContainer fluid>
      <FadeTransition in={showContent}>
        <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
          <MDBCardBody>
            <MDBRow>
              <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Student Sign Up</p>

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="user" size='lg' className="me-3" />
                  <MDBInput
                    label='Your Name'
                    id='form1'
                    type='text'
                    name='full_name'
                    value={student.full_name}
                    onChange={handleChange}
                    className={`w-100 ${errors.full_name ? 'border border-danger' : ''}`}
                  />
                </div>
                {errors.full_name && <p className="text-danger">{errors.full_name}</p>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="envelope" size='lg' className="me-3" />
                  <MDBInput
                    label='Your Email'
                    id='form2'
                    type='email'
                    name='email'
                    value={student.email}
                    onChange={handleChange}
                    className={`${errors.email ? 'border border-danger' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-danger">{errors.email}</p>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="id-card" size='lg' className="me-3" />
                  <MDBInput
                    label='PRN Number'
                    id='form3'
                    type='number'
                    name='prn_no'
                    value={student.prn_no}
                    onChange={handleChange}
                    className={`${errors.prn_no ? 'border border-danger' : ''}`}
                  />
                </div>
                {errors.prn_no && <p className="text-danger">{errors.prn_no}</p>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="address-card" size='lg' className="me-3" />
                  <MDBInput
                    label='Roll Number'
                    id='form4'
                    type='text'
                    name='roll_no'
                    value={student.roll_no}
                    onChange={handleChange}
                    className={`${errors.roll_no ? 'border border-danger' : ''}`}
                  />
                </div>
                {errors.roll_no && <p className="text-danger">{errors.roll_no}</p>}

                <div className="d-flex flex-row align-items-center mb-4">
                  <MDBIcon fas icon="lock" size='lg' className="me-3" />
                  <MDBInput
                    label='Password'
                    id='form5'
                    type='password'
                    name='password'
                    value={student.password}
                    onChange={handleChange}
                    className={`${errors.password ? 'border border-danger' : ''}`}
                  />
                </div>
                {errors.password && <p className="text-danger">{errors.password}</p>}
                <div className='mb-4'>
                  <MDBCheckbox
                    name='subscribe'
                    value={student.subscribe}
                    checked={student.subscribe}
                    onChange={handleChange}
                    id='flexCheckDefault'
                    label='Accept All Terms And Conditions'
                  />
                </div>

                <MDBBtn className='mb-4' size='lg' onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Register'}
                </MDBBtn>
              </MDBCol>

              <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
                <MDBCardImage src='assets\Exam-PNG-Pic.png' fluid />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </FadeTransition>
    </MDBContainer>
  );
}

export default Register;
