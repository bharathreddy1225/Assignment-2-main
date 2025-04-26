import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Alert, Spinner } from 'react-bootstrap';

const EditStudent = ({ show, onHide, student, onSave }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: 'Computer Science',
    enrollmentYear: new Date().getFullYear(),
    isActive: true
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (student) {
      setFormData({
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        dob: student.dob.split('T')[0],
        department: student.department,
        enrollmentYear: student.enrollmentYear,
        isActive: student.isActive
      });
      setErrors({});
      setSubmitError('');
      setSubmitting(false);
    }
  }, [student]);

  const validate = () => {
    const newErrors = {};
    if (!formData.studentId) newErrors.studentId = 'Student ID is required';
    if (!formData.firstName || formData.firstName.length < 2) newErrors.firstName = 'First name must be at least 2 characters';
    if (!formData.lastName || formData.lastName.length < 2) newErrors.lastName = 'Last name must be at least 2 characters';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.enrollmentYear || formData.enrollmentYear < 2000 || formData.enrollmentYear > new Date().getFullYear()) {
      newErrors.enrollmentYear = 'Enrollment year must be between 2000 and current year';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
    setSubmitError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError('');
    try {
      await onSave(student._id, formData);
      onHide();
    } catch (error) {
      setSubmitError('Failed to update student. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {submitError && <Alert variant="danger">{submitError}</Alert>}
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Student ID</Form.Label>
            <Form.Control
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              isInvalid={!!errors.studentId}
              placeholder="Student ID"
              readOnly
              disabled={submitting}
            />
            <Form.Control.Feedback type="invalid">{errors.studentId}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
              placeholder="Enter first name"
              disabled={submitting}
            />
            <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              isInvalid={!!errors.lastName}
              placeholder="Enter last name"
              disabled={submitting}
            />
            <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              placeholder="Enter email"
              disabled={submitting}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              isInvalid={!!errors.dob}
              disabled={submitting}
            />
            <Form.Control.Feedback type="invalid">{errors.dob}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              isInvalid={!!errors.department}
              disabled={submitting}
            >
              <option value="Computer Science">Computer Science</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Electronics and Communication">Electronics and Communication</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.department}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enrollment Year</Form.Label>
            <Form.Control
              type="number"
              name="enrollmentYear"
              value={formData.enrollmentYear}
              onChange={handleChange}
              isInvalid={!!errors.enrollmentYear}
              disabled={submitting}
              min={2000}
              max={new Date().getFullYear()}
            />
            <Form.Control.Feedback type="invalid">{errors.enrollmentYear}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="isActive"
              label="Active Student"
              checked={formData.isActive}
              onChange={handleChange}
              disabled={submitting}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2" disabled={submitting}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" /> Updating...
                </>
              ) : (
                'Update Student'
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStudent;