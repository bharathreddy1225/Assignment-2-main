import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import StudentTable from '../components/StudentTable';
import AddStudent from '../components/AddStudent';
import axios from 'axios';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const API_BASE = process.env.REACT_APP_API_BASE || 'https://assignment-2-rxnb.onrender.com';
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/students`);
      setStudents(response.data);
    } catch (error) {
      toast.error('Error fetching students');
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      const response = await axios.post(`${API_BASE}/api/students`, studentData);
      setStudents([...students, response.data]);
      toast.success('Student added successfully');
      setShowAddModal(false);
    } catch (error) {
      toast.error('Error adding student');
    }
  };

  const handleUpdateStudent = async (id, updatedData) => {
    try {
      const response = await axios.put(`${API_BASE}/api/students/${id}`, updatedData);
      setStudents(students.map(student => 
        student._id === id ? response.data : student
      ));
      toast.success('Student updated successfully');
    } catch (error) {
      toast.error('Error updating student');
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/students/${id}`);
      setStudents(students.filter(student => student._id !== id));
      toast.success('Student deleted successfully');
    } catch (error) {
      toast.error('Error deleting student');
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <h2>Student Management</h2>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add Student
          </Button>
        </Col>
      </Row>
      
      <StudentTable 
        students={students} 
        onUpdate={handleUpdateStudent} 
        onDelete={handleDeleteStudent} 
      />
      
      <AddStudent 
        show={showAddModal} 
        onHide={() => setShowAddModal(false)} 
        onSave={handleAddStudent} 
      />
    </Container>
  );
};

export default Students;
