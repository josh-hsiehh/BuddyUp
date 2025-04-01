import React, { useState } from 'react';
import './GoalTracker.css';

function GoalTracker() {
    const [goals, setGoals] = useState([
      { id: 1, title: "Complete project research", category: "Academic", deadline: "2025-03-10", progress: 60, buddies: ["Jamie"] },
      { id: 2, title: "Exercise 3x this week", category: "Fitness", deadline: "2025-03-12", progress: 33, buddies: ["Taylor"] },
      { id: 3, title: "Read 20 pages daily", category: "Personal", deadline: "2025-03-15", progress: 45, buddies: [] }
    ]);
    
    const [newGoal, setNewGoal] = useState({
      title: "",
      category: "Academic",
      deadline: "",
      buddies: []
    });
    
    const handleAddGoal = (e) => {
      e.preventDefault();
      const goalToAdd = {
        id: goals.length + 1,
        ...newGoal,
        progress: 0
      };
      
      setGoals([...goals, goalToAdd]);
      setNewGoal({
        title: "",
        category: "Academic",
        deadline: "",
        buddies: []
      });
    };
    
    const updateProgress = (id, newProgress) => {
      setGoals(goals.map(goal => 
        goal.id === id ? {...goal, progress: newProgress} : goal
      ));
    };
    
    return (
      <div className="goal-tracker">
        <h1>Goal Tracker</h1>
        
        <div className="add-goal-form">
          <h3>Add New Goal</h3>
          <form onSubmit={handleAddGoal}>
            <input 
              type="text" 
              placeholder="Goal title" 
              value={newGoal.title}
              onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              required
            />
            
            <select 
              value={newGoal.category}
              onChange={(e) => setNewGoal({...newGoal, category: e.target.value})}
            >
              <option value="Academic">Academic</option>
              <option value="Fitness">Fitness</option>
              <option value="Career">Career</option>
              <option value="Personal">Personal</option>
              <option value="Purpose">Purpose & Meaning</option>
            </select>
            
            <input 
              type="date" 
              value={newGoal.deadline}
              onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
              required
            />
            
            <button type="submit" className="primary-btn">Add Goal</button>
          </form>
        </div>
        
        <div className="goals-list">
          <h3>Your Goals</h3>
          {goals.map(goal => (
            <div key={goal.id} className="goal-card">
              <div className="goal-info">
                <h4>{goal.title}</h4>
                <span className="category-badge">{goal.category}</span>
                <p>Deadline: {goal.deadline}</p>
                <div className="progress-container">
                  <div className="progress-bar" style={{width: `${goal.progress}%`}}></div>
                </div>
                <p>{goal.progress}% Complete</p>
              </div>
              
              <div className="goal-actions">
                <button onClick={() => updateProgress(goal.id, Math.min(goal.progress + 10, 100))} className="action-btn">
                  Update Progress
                </button>
                {goal.buddies.length > 0 ? (
                  <div className="buddies-section">
                    <p>Accountability Buddies:</p>
                    <ul>
                      {goal.buddies.map(buddy => <li key={buddy}>{buddy}</li>)}
                    </ul>
                  </div>
                ) : (
                  <button className="action-btn">Add Buddy</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default GoalTracker;
