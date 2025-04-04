import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import './Navbar.css';
// Optional: Use your own icon file or react-icons


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
      <div className="nav-wrapper">
        {/* Left: Logo */}
        <div className="nav-left">
          <img src="/friends.png" alt="BuddyUp Logo" className="logo-icon" />

          <Link to="/" className="brand">BuddyUp</Link>
        </div>

        {/* Center: Nav links */}
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
        </div>

        {/* Right: Auth actions */}
        <div className="nav-right">
          <Link to="/signup" className="nav-link">Sign Up</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <span className="divider">|</span>
          <button onClick={() => setDarkMode(!darkMode)} className="nav-link toggle-btn">
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
