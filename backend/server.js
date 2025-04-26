require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const studentRoutes = require('./routes/studentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/students', studentRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Student Management System API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});