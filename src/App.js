import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import StudentDetails from './components/StudentDetails';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1 style={{textAlign: 'center', margin: '0 auto'}}>Student Management System</h1>
        </header>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/student/:id" element={<StudentForm />} />
          <Route path="/add-student" element={<StudentForm />} />
          <Route path="/student-details/:id" element={<StudentDetails />} /> {/* New route for viewing details */}
        </Routes>
      </div>
    </Router>
  );
};

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

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
    navigate(`/student/${student.id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleAdd = () => {
    navigate('/add-student');
  };

  const handleView = (student) => {
    navigate(`/student-details/${student.id}`); // Navigate to the student details page
  };

  return (
    <div>
      <StudentTable
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        onView={handleView} // Pass the onView function
      />
    </div>
  );
};

export default App;
