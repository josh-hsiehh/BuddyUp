import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState({
    name: "Josh",
    dailyCheckIn: false,
    pendingGoals: 3,
    completedGoals: 2,
    buddyRequests: 1
  });

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>
      <div className="dashboard-summary">
        <div className="card">
          <h3>Daily Check-in</h3>
          {user.dailyCheckIn ? <p>✅ Completed</p> : <button className="primary-btn">Check In Now</button>}
        </div>
        <div className="card">
          <h3>Goal Status</h3>
          <p>{user.pendingGoals} goals in progress</p>
          <p>{user.completedGoals} goals completed</p>
          <Link to="/goals" className="link-btn">View All Goals</Link>
        </div>
        <div className="card">
          <h3>Purpose Reflection</h3>
          <p>Explore your values and purpose</p>
          <Link to="/reflections" className="link-btn">Start Reflection</Link>
        </div>
        <div className="card">
          <h3>Buddy Activity</h3>
          <p>{user.buddyRequests} new buddy request</p>
          <Link to="/buddies" className="link-btn">View Buddies</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
