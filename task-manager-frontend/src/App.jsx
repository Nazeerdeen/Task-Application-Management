// App.jsx
import React, { useState } from 'react';
import TaskManager from './TaskManager'; // Import the TaskManager component
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import './App.css'; // Import your CSS

function App() {
  const [user, setUser] = useState(localStorage.getItem('user') || null);
  const [showRegisterPage, setShowRegisterPage] = useState(false);

  const handleLogin = (username) => {
    setUser(username);
    localStorage.setItem('user', username);
  };

  const handleRegister = (username, password, role) => { // Add role parameter
    // Replace with your actual registration logic (API call)
    console.log(`Registering user: ${username} with password: ${password} and role: ${role}`);
    handleLogin(username); // Log in after successful registration
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (!user) {
    return (
      <div className="auth-container">
      <div className="form-container"> 
        {!showRegisterPage ? (
          <LoginPage onLogin={handleLogin} />
        ) : (
          <RegisterPage onRegister={handleRegister} />
        )}
        <button className="button" onClick={() => setShowRegisterPage(!showRegisterPage)}>
          {showRegisterPage ? "Go to Login" : "Go to Register"}
        </button>
      </div>
      </div>
    );
  }

  return (
    <div className="container"> {/* Added class for styling */}
      <header>
        <h1>Zidio Task Management</h1>
      </header>
      <div className="description">
        <h2>Description</h2>
        <p>Zidio Task Management showcases our commitment to innovation and efficiency, offering a user-friendly platform for task organization, progress tracking, and team collaboration. With features like Kanban boards, real-time updates, and seamless integrations, it streamlines workflows and enhances productivity. Designed for teams of all sizes, it reflects our expertise in creating solutions that simplify processes and drive success.</p>
      </div>
      <div className="features">
        <div className="feature-box">
          <h3>1. Task Assignment and Prioritization</h3>
          <p>Assign tasks to team members with clear deadlines and priority levels.</p>
          <TaskManager user={user} /> {/* Render the TaskManager component */}
        </div>
      </div>
      
      <button className="button" onClick={handleLogout}>Logout</button>

      <footer>
        <p>Contact us at: support@zidio.in</p>
      </footer>
    </div>
  );
}

export default App;