import React, { useState } from 'react';
import { registerUser } from '../api/authApi';
import { useNavigate, Link } from 'react-router-dom';

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      await registerUser(form);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={outerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ color: '#ff9800', marginBottom: 28, textAlign: 'center', fontWeight: 700 }}>Create Your Account</h2>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            style={inputStyle}
            autoComplete="username"
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            autoComplete="email"
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Phone</label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            style={inputStyle}
            autoComplete="tel"
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password (min 8 chars)"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
            autoComplete="new-password"
            required
            minLength={8}
          />
        </div>
        <div style={{ fontSize: 12, color: '#aaa', marginBottom: 10 }}>Minimum length is 8 characters.</div>
        {error && <div style={{ color: '#ff5252', marginBottom: 12 }}>{error}</div>}
        {success && <div style={{ color: '#ff9800', marginBottom: 12 }}>{success}</div>}
        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 14, color: '#ccc' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#ff9800', textDecoration: 'underline' }}>Login</Link>
        </div>
      </form>
    </div>
  );
};

const outerStyle = {
  background: '#181A1B',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const formStyle = {
  background: '#232526',
  color: '#fff',
  maxWidth: 400,
  borderRadius: 18,
  padding: '40px 32px',
  boxShadow: '0 2px 24px #0008',
  fontFamily: 'inherit',
  width: '100%',
};
const labelStyle = {
  color: '#ff9800',
  fontWeight: 600,
  fontSize: 16,
  marginBottom: 6,
  display: 'block',
};
const inputStyle = {
  width: '100%',
  padding: '10px 16px',
  borderRadius: 8,
  border: '1px solid #333',
  background: '#181A1B',
  color: '#fff',
  fontSize: 16,
  marginTop: 4,
  outline: 'none',
  boxSizing: 'border-box',
  marginBottom: 2,
};
const buttonStyle = {
  width: '100%',
  marginTop: 18,
  background: 'linear-gradient(90deg, #ff9800 0%, #ffb347 100%)',
  color: '#222',
  fontWeight: 700,
  border: 'none',
  borderRadius: 8,
  padding: '14px 0',
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 2px 8px #0004',
  transition: 'filter 0.2s',
  filter: 'none',
};

export default RegisterForm;
