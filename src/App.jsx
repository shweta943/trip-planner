/* eslint-disable no-unused-vars */
// import { useState } from 'react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import GenerateTrip from './pages/GenerateTrip';
import Home from './pages/Home';
import LoaderAnimation from './components/UI/LoaderAnimation';
import SnackBar from './components/UI/SnackBar';
import Navbar from './components/Navbar/Navbar';
import useAuth from './hooks/useAuth';
import PrivateRoute from './components/Routes/PrivateRoute';

const App = () => {

  const auth = useAuth();
  const { user } = auth;
  console.log('globalUserDetails: ', user);

  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error'
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
        <>
          <Navbar showSnackbar={showSnackbar} />
          <Router >
            <Routes>
              <Route path="/" element={<Home showSnackbar={showSnackbar} />} />
              <Route path="/generate-trip" element={
                <GenerateTrip />
              }>
              </Route>
            </Routes>

            <SnackBar open={snackbar.open} handleClose={handleClose} messageToShow={snackbar.message} severity={snackbar.severity} />
          </Router >
        </>
      )}
    </>
  )
}
export default App
