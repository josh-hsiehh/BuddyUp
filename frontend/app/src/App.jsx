import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase/firebaseConfig';  // Firebase Authentication
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import GoalTracker from './components/GoalTracker';
import Reflections from './components/Reflections';
import AccountabilityBuddies from './components/AccountabilityBuddies';
import Profile from './components/Profile';
import './app.css'

function App() {
  const [user, setUser] = useState(null);

  // Listen to authentication state change (Firebase)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);  // Set the user when authentication changes
    });
    
    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar />  {/* Render the Navbar */}

      <div className="app-container">
        
        
        {/* Setting up routes for different pages */}
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
