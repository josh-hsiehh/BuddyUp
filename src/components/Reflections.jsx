import React, { useState } from 'react';

function Reflections() {
    const [reflections, setReflections] = useState([
      { id: 1, date: "2025-03-04", topic: "Values", content: "I realized today that helping others is one of my core values." },
      { id: 2, date: "2025-03-02", topic: "Purpose", content: "I'm beginning to see that my education connects to my larger goals of environmental conservation." }
    ]);
    
    const [newReflection, setNewReflection] = useState({
      topic: "Values",
      content: ""
    });
    
    const purposePrompts = [
      "What activities make you lose track of time?",
      "What problems in the world are you drawn to solve?",
      "When do you feel most alive or energized?",
      "What are your unique strengths and how might they serve others?",
      "What would you do if you weren't afraid of failure?"
    ];
    
    const [currentPrompt, setCurrentPrompt] = useState(purposePrompts[0]);
    
    const handleAddReflection = (e) => {
      e.preventDefault();
      const today = new Date().toISOString().split('T')[0];
      
      const reflectionToAdd = {
        id: reflections.length + 1,
        date: today,
        ...newReflection
      };
      
      setReflections([reflectionToAdd, ...reflections]);
      setNewReflection({
        topic: "Values",
        content: ""
      });
      
      // Change prompt
      const randomIndex = Math.floor(Math.random() * purposePrompts.length);
      setCurrentPrompt(purposePrompts[randomIndex]);
    };
    
    return (
      <div className="reflections">
        <h1>Self-Reflection & Purpose</h1>
        
        <div className="reflection-form">
          <h3>Today's Reflection</h3>
          <div className="prompt-box">
            <p><strong>Prompt:</strong> {currentPrompt}</p>
          </div>
          
          <form onSubmit={handleAddReflection}>
            <select 
              value={newReflection.topic}
              onChange={(e) => setNewReflection({...newReflection, topic: e.target.value})}
            >
              <option value="Values">Values</option>
              <option value="Purpose">Purpose</option>
              <option value="Strengths">Strengths</option>
              <option value="Goals">Goals</option>
              <option value="Challenges">Challenges</option>
            </select>
            
            <textarea 
              placeholder="Write your reflection here..."
              value={newReflection.content}
              onChange={(e) => setNewReflection({...newReflection, content: e.target.value})}
              required
              rows={4}
            />
            
            <button type="submit" className="primary-btn">Save Reflection</button>
          </form>
        </div>
        
        <div className="reflection-insights">
          <h3>Purpose Insights</h3>
          <p>Based on your reflections, you seem to value connection, learning, and making a difference. 
             Consider exploring careers or projects that combine technology with environmental or social impact.</p>
        </div>
        
        <div className="reflections-list">
          <h3>Past Reflections</h3>
          {reflections.map(reflection => (
            <div key={reflection.id} className="reflection-card">
              <div className="reflection-header">
                <span className="date">{reflection.date}</span>
                <span className="topic-badge">{reflection.topic}</span>
              </div>
              <p>{reflection.content}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

export default Reflections;
