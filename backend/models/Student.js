const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: [true, 'Student ID is required'],
    unique: true,
    trim: true,
    match: [/^[a-zA-Z0-9]+$/, 'Student ID must be alphanumeric']
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least 2 characters long']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2, 'Last name must be at least 2 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  dob: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: {
      values: ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Electronics and Communication'],
      message: 'Department is not valid'
    }
  },
  enrollmentYear: {
    type: Number,
    required: [true, 'Enrollment year is required'],
    min: [2000, 'Enrollment year must be 2000 or later'],
    max: [new Date().getFullYear(), `Enrollment year cannot be in the future`]
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);