/* eslint-disable no-unused-vars */
// import { useState } from 'react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import CreateTrip from './pages/CreateTrip';
import Home from './pages/Home';
import LoaderAnimation from './components/UI/LoaderAnimation';
import SnackBar from './components/UI/SnackBar';

const App = () => {

  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? <LoaderAnimation /> : (
        <Router >
          {/* <nav>
        <Link to="/">Home</Link>
        <Link to="/generate-trip">CreateTrip</Link>
      </nav> */}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generate-trip" element={<CreateTrip />} />
          </Routes>

          <SnackBar open={snackbar.open} handleClose={handleClose} message={snackbar.message} severity={snackbar.severity} />
        </Router >
      )}
    </>
  )
}
export default App
