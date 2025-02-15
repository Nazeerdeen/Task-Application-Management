// LoginPage.jsx
import React, { useState } from 'react';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual authentication logic (API call)
    if (username === 'testuser' && password === 'password') {
      onLogin(username);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required /><br />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required /><br />
        <button className="button" type="submit">Login</button>
      </form>
    </div>
  );
}

const handleRegistrationIdLogin = async (e) => {
  e.preventDefault();
  try {
      const response = await fetch('/api/login/registration', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ registrationId: registrationId }), // Send registrationId
      });
      const data = await response.json();
      localStorage.setItem('token', data.token); // Store the JWT
      // ... redirect or update state
  } catch (error) {
      // ... error handling
  }
};

export default LoginPage;