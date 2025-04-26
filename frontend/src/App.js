import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Students from './pages/Students';
import CustomNavbar from './components/Navbar';


function App() {
  return (
    <Router>
      <div className="App">
        < CustomNavbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={< Home />} />
            <Route path="/students" element={< Students />} />
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}

export default App;