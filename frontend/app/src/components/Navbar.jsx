import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import './Navbar.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => signOut(auth);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <Link to="/">BuddyUp</Link>
      </div>

      {/* Center Navigation */}
      <div className="nav-center">
        <ul className="nav-links">
          <li><Link to="/about">About</Link></li>
          <li className="dropdown">
            <span className="dropdown-toggle">Resources</span>
            <div className="dropdown-menu">
              <Link to="/goals">Goals</Link>
              <Link to="/reflections">Reflections</Link>
              <Link to="/buddies">Buddies</Link>
            </div>
          </li>
        </ul>

        {/* Right Action Buttons */}
        <div className="nav-actions">
          <Link to="/signup" className="auth-btn">Sign Up</Link>
          <Link to="/login" className="auth-btn">Login</Link>
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="theme-toggle"
          >
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
