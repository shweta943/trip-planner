/* eslint-disable no-unused-vars */
// import { useState } from 'react'
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css'
import CreateTrip from './pages/CreateTrip';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/generate-trip">CreateTrip</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate-trip" element={<CreateTrip />} />
      </Routes>
    </Router>
  )
}
export default App
