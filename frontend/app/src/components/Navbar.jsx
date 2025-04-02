import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import './Navbar.css';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

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
      <div className="navbar-left">
        <div className="logo">BuddyUp</div>
      </div>

      <ul className="nav-links">
        <li><Link to="/">About</Link></li>
        <li className="dropdown">
          <span>Resources</span>
          <ul className="dropdown-menu">
            <li><Link to="/goals">Goals</Link></li>
            <li><Link to="/reflections">Reflections</Link></li>
            <li><Link to="/buddies">Buddies</Link></li>
          </ul>
        </li>
      </ul>

      <div className="navbar-right">
        <Link to="/signup" className="auth-btn outline">Sign up</Link>
        <Link to="/profile" className="auth-btn">Login</Link>
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
