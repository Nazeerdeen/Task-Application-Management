// RegisterPage.jsx
import React, { useState } from 'react';

function RegisterPage({ onRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Employee'); // Default role

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual registration logic (API call)
    onRegister(username, password, role);
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
        <select value={role} onChange={e => setRole(e.target.value)}>
          <option value="Admin">Admin</option>
          <option value="Manager">Manager</option>
          <option value="Employee">Employee</option>
        </select><br />
        <button className="button" type="submit">Register</button>
      </form>
    </div>
  );
}

const handleRegister = async (e) => {
  e.preventDefault();
  try {
      const response = await fetch('/api/register', {  // Your registration API
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ /* user data */ }),
      });
      // ... handle response (e.g., redirect on success, display error messages)
  } catch (error) {
      // ... error handling
  }
};

export default RegisterPage;