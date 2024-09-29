import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import StudentTable from './components/StudentTable';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleEdit = (student) => {
    navigate(`/student/${student.id}`); // Use navigate instead of history.push
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/students/${id}`);
        fetchStudents();
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleAdd = () => {
    navigate('/add-student'); // Navigate to the Add Student form
  };

  return (
    <div className="student-list-container">
      <button className="btn btn-primary" onClick={handleAdd}>
        Add Student
      </button>
      <StudentTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default StudentList;
