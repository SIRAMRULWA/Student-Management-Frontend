import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap'; // Import React Bootstrap components

const StudentDetails = () => {
  const { id } = useParams(); // Get the student ID from URL params
  const [student, setStudent] = useState(null);
  const navigate = useNavigate(); // Use navigate to go back

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/students/${id}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) return <Container><p>Loading...</p></Container>;

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Student Details</h2>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title className="mb-0">{student.name}</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text><strong>Email:</strong> {student.email}</Card.Text>
              <Card.Text><strong>Age:</strong> {student.age}</Card.Text>
              <Card.Text><strong>Student Number:</strong> {student.studentNumber}</Card.Text>
              <Card.Text><strong>ID Number:</strong> {student.idNumber}</Card.Text>
              <Card.Text><strong>Marks:</strong> {student.marks}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="secondary" onClick={() => navigate('/')}>
                Back to List
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDetails;
