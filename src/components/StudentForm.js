import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    studentNumber: '',
    idNumber: '',
    marks: '',
  });

  useEffect(() => {
    if (id) {
      const fetchStudent = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/students/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Failed to fetch student:', error);
          toast.error('Failed to fetch student data.');
        }
      };
      fetchStudent();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/students/${id}`, formData);
        toast.success('Student updated successfully!');
      } else {
        await axios.post('http://localhost:8080/api/students', formData);
        toast.success('Student added successfully!');
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save student:', error);
      toast.error('Failed to save student.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <Card>
        <Card.Header>
          <Card.Title>{id ? 'Edit Student' : 'Add Student'}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Student Number</Form.Label>
              <Form.Control
                type="text"
                name="studentNumber"
                value={formData.studentNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ID Number</Form.Label>
              <Form.Control
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Marks</Form.Label>
              <Form.Control
                type="text"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Button type="submit" variant="primary">
                {id ? 'Update Student' : 'Add Student'}
              </Button>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default StudentForm;
