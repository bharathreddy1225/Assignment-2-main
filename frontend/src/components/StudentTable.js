import React, { useState } from 'react';
import { Card, Button, Badge, Modal, Row, Col } from 'react-bootstrap';
import EditStudent from './EditStudent';

const StudentTable = ({ students, onUpdate, onDelete }) => {
  const [editModalShow, setEditModalShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);

  const handleEditClick = (student) => {
    setSelectedStudent(student);
    setEditModalShow(true);
  };

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (studentToDelete) {
      onDelete(studentToDelete._id);
      setShowDeleteConfirm(false);
      setStudentToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
    setStudentToDelete(null);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <Row xs={1} md={2} className="g-4">
        {students.map(student => (
          <Col key={student._id}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{student.firstName} {student.lastName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{student.studentId}</Card.Subtitle>
                <Card.Text>
                  <strong>Email:</strong> {student.email}<br />
                  <strong>DOB:</strong> {formatDate(student.dob)}<br />
                  <strong>Department:</strong> {student.department}<br />
                  <strong>Year:</strong> {student.enrollmentYear}<br />
                  <strong>Status:</strong> <Badge bg={student.isActive ? "success" : "secondary"}>
                    {student.isActive ? "Active" : "Inactive"}
                  </Badge>
                </Card.Text>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEditClick(student)}>
                  Edit
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteClick(student)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedStudent && (
        <EditStudent
          show={editModalShow}
          onHide={() => setEditModalShow(false)}
          student={selectedStudent}
          onSave={onUpdate}
        />
      )}

      <Modal show={showDeleteConfirm} onHide={cancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete student "{studentToDelete?.firstName} {studentToDelete?.lastName}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StudentTable;
