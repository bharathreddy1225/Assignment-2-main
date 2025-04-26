import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Student Management System</h1>
      <p className="subtitle">Manage your students efficiently with our MERN stack application.</p>
      <Button as={Link} to="/students" variant="primary" size="lg">
        View Students
      </Button>
    </div>
  );
};

export default Home;
