import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.PNG';
import { useAuth } from '../contexts/AuthContext';

const Navbar = ({ onSearch, onLogout }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={navStyle}>
      <div style={leftStyle}>
        <Link to="/home">
          <img src={logo} alt="Smart Cart Logo" style={{ height: 40, marginRight: 16 }} />
        </Link>
      </div>
      <div style={centerStyle}>
        <input
          type="text"
          placeholder="Search hardware..."
          onChange={e => onSearch && onSearch(e.target.value)}
          style={searchStyle}
        />
      </div>
      <div style={rightStyle}>
        <Link to="/home" style={linkStyle}>Home</Link>
        <Link to="/products" style={linkStyle}>Products</Link>
        <Link to="/cart" style={linkStyle}>Cart</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
        <Link to="/about" style={linkStyle}>About</Link>
        <Link to="/faqs" style={linkStyle}>FAQs</Link>
        {isAuthenticated ? (
          <button onClick={onLogout} style={logoutBtnStyle}>Logout</button>
        ) : (
          <button onClick={() => navigate('/login')} style={loginBtnStyle}>Login</button>
        )}
      </div>
    </nav>
  );
};

const navStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: '#181A1B',
  padding: '0 32px',
  height: 70,
  boxShadow: '0 2px 12px #0006',
  position: 'sticky',
  top: 0,
  zIndex: 100,
};
const leftStyle = { display: 'flex', alignItems: 'center' };
const centerStyle = { flex: 1, display: 'flex', justifyContent: 'center' };
const searchStyle = {
  width: 320,
  padding: '8px 16px',
  borderRadius: 20,
  border: '1px solid #333',
  background: '#232526',
  color: '#fff',
  fontSize: 16,
  outline: 'none',
};
const rightStyle = { display: 'flex', alignItems: 'center', gap: 24 };
const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: 17,
  transition: 'color 0.2s',
  padding: '6px 12px',
  borderRadius: 6,
};
const logoutBtnStyle = {
  background: 'linear-gradient(90deg, #ff5252 0%, #ff9800 100%)',
  color: '#fff',
  fontWeight: 700,
  border: 'none',
  borderRadius: 8,
  padding: '8px 18px',
  fontSize: 16,
  cursor: 'pointer',
  marginLeft: 8,
  boxShadow: '0 2px 8px #0004',
  transition: 'filter 0.2s',
};
const loginBtnStyle = {
  background: 'linear-gradient(90deg, #ff9800 0%, #ffb347 100%)',
  color: '#222',
  fontWeight: 700,
  border: 'none',
  borderRadius: 8,
  padding: '8px 18px',
  fontSize: 16,
  cursor: 'pointer',
  marginLeft: 8,
  boxShadow: '0 2px 8px #0004',
  transition: 'filter 0.2s',
};

export default Navbar; 