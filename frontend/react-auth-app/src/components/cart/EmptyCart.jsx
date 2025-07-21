import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div style={emptyCartStyle}>
      <p style={{ color: '#ccc', fontSize: 18, marginBottom: 24 }}>Your cart is empty</p>
      <Link to="/products" style={continueBtnStyle}>
        Continue Shopping
      </Link>
    </div>
  );
};

// Styles
const emptyCartStyle = {
  background: '#232526',
  padding: 40,
  borderRadius: 16,
  boxShadow: '0 2px 16px #0006',
  marginTop: 24,
};

const continueBtnStyle = {
  display: 'inline-block',
  background: 'linear-gradient(90deg, #ff9800 0%, #ffb347 100%)',
  color: '#222',
  fontWeight: 700,
  textDecoration: 'none',
  padding: '12px 24px',
  borderRadius: 8,
  boxShadow: '0 2px 8px #0004',
};

export default EmptyCart;