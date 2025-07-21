import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div style={cartItemStyle}>
      <img src={item.image} alt={item.name} style={productImgStyle} />
      <div style={{ flexGrow: 1 }}>
        <h3 style={{ color: '#fff', fontSize: 20, marginBottom: 6 }}>{item.name}</h3>
        <p style={{ color: '#ff9800', fontWeight: 600 }}>${item.price}</p>
      </div>
      <div style={quantityControlStyle}>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          style={quantityBtnStyle}
        >
          -
        </button>
        <span style={{ color: '#fff', padding: '0 12px' }}>{item.quantity}</span>
        <button 
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          style={quantityBtnStyle}
        >
          +
        </button>
      </div>
      <div style={{ marginLeft: 24, textAlign: 'right', minWidth: 80 }}>
        <p style={{ color: '#fff', fontWeight: 600, fontSize: 18 }}>${(item.price * item.quantity).toFixed(2)}</p>
        <button 
          onClick={() => onRemoveItem(item.id)}
          style={removeBtnStyle}
        >
          Remove item
        </button>
      </div>
    </div>
  );
};

// Styles
const cartItemStyle = {
  padding: 24,
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #333',
};

const productImgStyle = {
  width: 80,
  height: 80,
  objectFit: 'cover',
  borderRadius: 8,
  marginRight: 20,
  boxShadow: '0 2px 8px #0006',
};

const quantityControlStyle = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: 16,
};

const quantityBtnStyle = {
  background: 'linear-gradient(90deg, #ff9800 0%, #ffb347 100%)',
  color: '#333',
  border: 'none',
  borderRadius: 4,
  width: 30,
  height: 30,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  transition: 'background 0.2s',
};

const removeBtnStyle = {
  background: '#222222',
  color: '#ff5252',
  padding: '4px 12px',
  border: 'none',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
  borderRadius: 8,
  marginTop: 8,
  cursor: 'pointer',
  fontSize: 14,
  fontWeight: 600,
};

export default CartItem;