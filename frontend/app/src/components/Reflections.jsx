import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Reflections() {
  const [reflections, setReflections] = useState([]);
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

  // Fetch all reflections when the component mounts
  useEffect(() => {
    const fetchReflections = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/reflections/');
        setReflections(response.data);  // Update the state with the list of reflections
      } catch (error) {
        console.error('Error fetching reflections:', error);
      }
    };
    
    fetchReflections(); // Fetch reflections on load
  }, []);

  const handleAddReflection = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split('T')[0];
    const newReflectionData = {
      ...newReflection,
      date: today,
    };

    // Post the new reflection to the backend
    try {
      const response = await axios.post('http://127.0.0.1:8000/reflections/', newReflectionData);
      
      // Immediately update the reflections state with the new reflection
      const updatedReflections = [response.data.reflection, ...reflections];
      setReflections(updatedReflections);

      // Reset the new reflection state
      setNewReflection({
        topic: "Values",
        content: ""
      });

      // Change the prompt after saving the reflection
      const randomIndex = Math.floor(Math.random() * purposePrompts.length);
      setCurrentPrompt(purposePrompts[randomIndex]);
    } catch (error) {
      console.error('Error adding reflection:', error);
    }
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
              <span className="date">{reflection.date || "No date provided"}</span>
              <span className="topic-badge">{reflection.topic || "Untitled"}</span>
            </div>
            <p>{reflection.content || "No content"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reflections;
