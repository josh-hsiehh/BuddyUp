import React, { useState, useEffect } from 'react';
import { auth, provider } from '../firebase/firebaseConfig';
import { signInWithPopup, signOut } from 'firebase/auth';

function Profile({ user }) {
    const [profile, setProfile] = useState({
      name: user ? user.displayName || "" : "",
      email: user ? user.email : "",
      bio: "Computer Science student interested in web development and AI. Looking to build better study habits.",
      values: ["Learning", "Connection", "Innovation"],
      purposeStatement: "To use technology to solve meaningful problems that impact people's daily lives."
    });
  
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState({ ...profile });
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
  
    useEffect(() => {
      if (user) {
        setProfile(prev => ({
          ...prev,
          name: user.displayName || prev.name,
          email: user.email || prev.email
        }));
      }
    }, [user]);
  
    const handleSaveProfile = () => {
      setProfile({ ...editedProfile });
      setIsEditing(false);
    };
  
    const handleSignIn = () => {
      signInWithEmailAndPassword(auth, email, password)
        .catch(e => setAuthError(e.message));
    };
  
    const handleSignUp = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .catch(e => setAuthError(e.message));
    };
  
    const handleGoogleSignIn = () => {
      signInWithPopup(auth, provider)
        .catch(e => setAuthError(e.message));
    };
  
    const handleSignOut = () => {
      signOut(auth);
    };
  
    if (!user) {
      return (
        <div className="profile">
          <h1>Please sign in to view your profile.</h1>
          <div className="auth-container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn} className="primary-btn">Sign In</button>
            <button onClick={handleSignUp} className="secondary-btn">Sign Up</button>
            <button onClick = {handleGoogleSignIn} className="google-btn">Sign In with Google</button>
            {authError && <p style={{color: 'red'}}>{authError}</p>}
          </div>
        </div>
      );
    }
    
    return (
      <div className="profile">
        <h1>Your Profile</h1>
       
        
        {isEditing ? (
          <div className="edit-profile">
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                value={editedProfile.name} 
                onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={editedProfile.email} 
                onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label>Bio</label>
              <textarea 
                value={editedProfile.bio} 
                onChange={(e) => setEditedProfile({...editedProfile, bio: e.target.value})}
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <label>Purpose Statement</label>
              <textarea 
                value={editedProfile.purposeStatement} 
                onChange={(e) => setEditedProfile({...editedProfile, purposeStatement: e.target.value})}
                rows={3}
                placeholder="What gives your life meaning and direction?"
              />
            </div>
            
            <div className="profile-actions">
              <button onClick={handleSaveProfile} className="primary-btn">Save Profile</button>
              <button onClick={() => setIsEditing(false)} className="secondary-btn">Cancel</button>
            </div>
          </div>
        ) : (
          <div className="profile-view">
            <div className="profile-card">
              <h3>{profile.name}</h3>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Bio:</strong> {profile.bio}</p>
              
              <div className="values-section">
                <h4>Core Values:</h4>
                <div className="values-list">
                  {profile.values.map((value, index) => (
                    <span key={index} className="value-badge">{value}</span>
                  ))}
                </div>
              </div>
              
              <div className="purpose-section">
                <h4>Purpose Statement:</h4>
                <p>{profile.purposeStatement}</p>
              </div>
              
              <button onClick={() => setIsEditing(true)} className="primary-btn">Edit Profile</button>
              <button onClick={handleSignOut} className="secondary-btn">Sign Out</button>
            </div>
            
            <div className="stats-section">
              <h3>Your Progress</h3>
              <div className="stats-container">
                <div className="stat-card">
                  <h4>5</h4>
                  <p>Goals Created</p>
                </div>
                <div className="stat-card">
                  <h4>2</h4>
                  <p>Goals Completed</p>
                </div>
                <div className="stat-card">
                  <h4>8</h4>
                  <p>Reflections</p>
                </div>
                <div className="stat-card">
                  <h4>2</h4>
                  <p>Accountability Buddies</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

export default Profile;
