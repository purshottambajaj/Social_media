import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post('http://localhost:4000/register', {
        email,
        password,
        username,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }

    setIsSubmitting(false);
  };

  return (
    <form className="form" onSubmit={handleRegistration}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
      {message && <p className={message.includes('success') ? 'success-message' : 'error-message'}>{message}</p>}
    </form>
  );
};

export default RegistrationForm;
