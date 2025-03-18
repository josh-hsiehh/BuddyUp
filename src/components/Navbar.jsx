import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const handleLogout = () => signOut(auth);

  return (
    <nav className="navbar">
      <div className="logo">BuddyUp</div>
      <ul className="nav-links">
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/goals">Goals</Link></li>
        <li><Link to="/reflections">Reflections</Link></li>
        <li><Link to="/buddies">Buddies</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
