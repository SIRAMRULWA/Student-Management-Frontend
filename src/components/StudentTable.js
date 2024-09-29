import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { Modal, Button } from 'react-bootstrap'; // Import React Bootstrap components
import { toast, ToastContainer } from 'react-toastify'; // Import React Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import React Toastify CSS

const StudentTable = ({ students, onView, onEdit, onDelete, onAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleDelete = (id) => {
    setStudentToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    onDelete(studentToDelete);
    toast.success('Student deleted successfully!');
    setShowModal(false);
  };

  const handleAdd = () => {
    onAdd();
    toast.success('Add Student button clicked!');
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-12">
          <Button variant="primary" onClick={handleAdd}>
            Add Student
          </Button>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.marks}</td>
                  <td>
                    <Button
                      variant="info"
                      className="me-2"
                      onClick={() => onView(student)}
                    >
                      View
                    </Button>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => onEdit(student)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default StudentTable;
