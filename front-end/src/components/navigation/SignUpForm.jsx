import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://weather-app-ackf.onrender.com/api/signup', formData);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="form-container" aria-live="polite">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            autoComplete="name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            autoComplete="email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            autoComplete="new-password"
          />
        </Form.Group>
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
        <p className="mt-3">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </Form>
    </div>
  );
}

export default SignUpForm;
