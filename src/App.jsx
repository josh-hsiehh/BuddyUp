import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase/firebaseConfig';
import Navbar from './components/navbar';
import Dashboard from './components/Dashboard';
import GoalTracker from './components/GoalTracker';
import Reflections from './components/Reflections';
import AccountabilityBuddies from './components/AccountabilityBuddies';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/goals" element={<GoalTracker />} />
          <Route path="/reflections" element={<Reflections />} />
          <Route path="/buddies" element={<AccountabilityBuddies />} />
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
