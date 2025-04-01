import React, { useState } from 'react';
import './AccountabilityBuddies.css';

function AccountabilityBuddies() {
    const [buddies, setBuddies] = useState([
      { id: 1, name: "Jamie", status: "active", sharedGoals: 2 },
      { id: 2, name: "Taylor", status: "active", sharedGoals: 1 }
    ]);
    
    const [requests, setRequests] = useState([
      { id: 1, name: "Morgan", message: "Would love to be accountability partners for our CS course!" }
    ]);
    
    const acceptRequest = (id) => {
      const requestToAccept = requests.find(req => req.id === id);
      setBuddies([...buddies, {
        id: buddies.length + 1,
        name: requestToAccept.name,
        status: "active",
        sharedGoals: 0
      }]);
      
      setRequests(requests.filter(req => req.id !== id));
    };
    
    return (
      <div className="accountability-buddies">
        <h1>Accountability Buddies</h1>
        
        {requests.length > 0 && (
          <div className="buddy-requests">
            <h3>Buddy Requests</h3>
            {requests.map(request => (
              <div key={request.id} className="request-card">
                <p><strong>{request.name}</strong> wants to connect!</p>
                <p>"{request.message}"</p>
                <div className="request-actions">
                  <button onClick={() => acceptRequest(request.id)} className="primary-btn">Accept</button>
                  <button className="secondary-btn">Decline</button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="buddies-list">
          <h3>Your Accountability Buddies</h3>
          {buddies.map(buddy => (
            <div key={buddy.id} className="buddy-card">
              <div className="buddy-info">
                <h4>{buddy.name}</h4>
                <p>{buddy.sharedGoals} shared goals</p>
              </div>
              <div className="buddy-actions">
                <button className="action-btn">Message</button>
                <button className="action-btn">Check Goals</button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="find-buddies">
          <h3>Find New Buddies</h3>
          <div className="search-container">
            <input type="text" placeholder="Search by name or interest" />
            <button className="primary-btn">Search</button>
          </div>
          <p>Or invite friends via email:</p>
          <div className="invite-container">
            <input type="email" placeholder="friend@example.com" />
            <button className="primary-btn">Send Invite</button>
          </div>
        </div>
      </div>
    );
  }
  

export default AccountabilityBuddies;
