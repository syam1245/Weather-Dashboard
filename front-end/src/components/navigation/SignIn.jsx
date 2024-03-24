import React, { useState, useEffect } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange: handleChange,
  };
};

const FormInput = ({ label, type, placeholder, ...props }) => (
  <Form.Group className="mb-3">
    <Form.Label>{label}</Form.Label>
    <Form.Control type={type} placeholder={placeholder} {...props} required />
  </Form.Group>
);

function SignIn() {
  const email = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('https://weather-app-ackf.onrender.com/api/login', {
        email: email.value,
        password: password.value,
      });
      if (response.status === 200) {
        navigate('/profile');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="form-container" aria-live="polite">
      <Form onSubmit={handleSubmit}>
        <FormInput controlId="email" label="Email address" type="email" placeholder="Enter your email" {...email} />
        <FormInput controlId="password" label="Password" type="password" placeholder="Enter your password" {...password} />
        {error && <Alert variant="danger">{error}</Alert>}
        <Button variant="primary" type="submit">
          Login
        </Button>
        <div className="mt-3">
          <Link to="/signup">Create an account. Sign Up</Link>
        </div>
        <div className="mt-3">
          <Link to="/forgot-password">Forgot your password? Reset it</Link>
        </div>
      </Form>
    </div>
  );
}

export default SignIn;
