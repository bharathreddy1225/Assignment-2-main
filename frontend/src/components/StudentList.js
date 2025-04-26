import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditStudent from './EditStudent';
import AddStudent from './AddStudent';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/students');
      setStudents(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch students');
      setLoading(false);
      toast.error('Error loading students');
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      const response = await axios.post('/api/students', studentData);
      setStudents([...students, response.data]);
      toast.success('Student added successfully');
      setShowAddModal(false);
    } catch (error) {
      toast.error('Error adding student');
    }
  };

  const handleUpdateStudent = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/students/${id}`, updatedData);
      setStudents(students.map(student => 
        student._id === id ? response.data : student
      ));
      toast.success('Student updated successfully');
      setShowEditModal(false);
    } catch (error) {
      toast.error('Error updating student');
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`/api/students/${id}`);
      setStudents(students.filter(student => student._id !== id));
      toast.success('Student deleted successfully');
    } catch (error) {
      toast.error('Error deleting student');
    }
  };

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading students...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    );
  }

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student List</h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add New Student
        </Button>
      </div>

      {students.length === 0 ? (
        <Alert variant="info">
          No students found. Add a new student to get started.
        </Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Department</th>
              <th>Enrollment Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.email}</td>
                <td>{formatDate(student.dob)}</td>
                <td>{student.department}</td>
                <td>{student.enrollmentYear}</td>
                <td>
                  <Badge bg={student.isActive ? "success" : "secondary"}>
                    {student.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={() => handleEditClick(student)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => handleDeleteStudent(student._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Add Student Modal */}
      <AddStudent 
        show={showAddModal} 
        onHide={() => setShowAddModal(false)} 
        onSave={handleAddStudent} 
      />

      {/* Edit Student Modal */}
      {selectedStudent && (
        <EditStudent
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          student={selectedStudent}
          onSave={handleUpdateStudent}
        />
      )}
    </div>
  );
};

export default StudentList;