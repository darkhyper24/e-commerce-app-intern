import React, { useState } from 'react';
import { loginUser, getProfile } from '../api/authApi';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await loginUser({ email: form.email, password: form.password });
      // Immediately update user in context
      const user = await getProfile();
      setUser(user);
      setSuccess('Login successful! Redirecting...');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={outerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ color: '#ff9800', marginBottom: 28, textAlign: 'center', fontWeight: 700 }}>Sign In to Smart.cart</h2>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
            autoComplete="username"
            required
          />
        </div>
        <div style={{ marginBottom: 18 }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
            autoComplete="current-password"
            required
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
            style={{ marginRight: 8 }}
          />
          <label style={{ color: '#ccc', fontSize: 15 }}>Remember Me</label>
        </div>
        {error && <div style={{ color: '#ff5252', marginBottom: 12 }}>{error}</div>}
        {success && <div style={{ color: '#ff9800', marginBottom: 12 }}>{success}</div>}
        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div style={{ textAlign: 'center', marginTop: 18, fontSize: 14, color: '#ccc' }}>
          Do not have an account?{' '}
          <Link to="/register" style={{ color: '#ff9800', textDecoration: 'underline' }}>Sign Up</Link>
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

export default LoginForm;
