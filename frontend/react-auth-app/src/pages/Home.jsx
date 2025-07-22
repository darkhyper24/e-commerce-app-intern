import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const mockProducts = [
  { id: 1, name: 'Gaming Laptop', price: 1299, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Mechanical Keyboard', price: 99, image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Wireless Mouse', price: 49, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: '4K Monitor', price: 399, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80' },
  { id: 5, name: 'Graphics Card', price: 699, image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80' },
  { id: 6, name: 'SSD 1TB', price: 129, image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
];

const Home = () => {
  const [search, setSearch] = useState('');
  const [logoutError, setLogoutError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleLogout = async () => {
    setLogoutError('');
    try {
      await axios.post('/api/auth/logout', {}, { withCredentials: true });
      setUser(null); // Immediately update auth state
      navigate('/login');
    } catch (err) {
      setLogoutError('Logout failed. Please try again.');
    }
  };

  // New function to handle viewing a product's details
  const handleViewProduct = (productId) => {
    // Navigate to products page with a query parameter
    // This will allow the Products page to focus on the selected product
    navigate(`/products?id=${productId}`);
  };

  const filteredProducts = mockProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#181A1B', minHeight: '100vh' }}>
      <Navbar onSearch={setSearch} onLogout={handleLogout} />
      {logoutError && (
        <div style={{ color: '#ff5252', textAlign: 'center', marginTop: 16 }}>{logoutError}</div>
      )}
      <section style={heroStyle}>
        <div>
          <h1 style={{ color: '#fff', fontSize: 44, margin: 0 }}>Welcome to <span style={{ color: '#ff9800' }}>Smart.cart</span></h1>
          <p style={{ color: '#ccc', fontSize: 20, marginTop: 16 }}>Your one-stop shop for the latest hardware tech products.</p>
        </div>
      </section>
      <section style={gridSectionStyle}>
        <h2 style={{ color: '#fff', marginBottom: 24 }}>Featured Products</h2>
        <div style={gridStyle}>
          {filteredProducts.length === 0 ? (
            <div style={{ color: '#aaa', fontSize: 20 }}>No products found.</div>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} style={cardStyle}>
                <img src={product.image} alt={product.name} style={imgStyle} />
                <div style={{ color: '#fff', fontWeight: 600, fontSize: 20, marginTop: 12 }}>{product.name}</div>
                <div style={{ color: '#ff9800', fontWeight: 700, fontSize: 18, marginTop: 6 }}>${product.price}</div>
                <button 
                  style={viewBtnStyle} 
                  onClick={() => handleViewProduct(product.id)}
                >
                  View Details
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const heroStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 220,
  background: 'linear-gradient(90deg, #232526 0%, #181A1B 100%)',
  boxShadow: '0 2px 24px #0008',
  marginBottom: 32,
};
const gridSectionStyle = { maxWidth: 1200, margin: '0 auto', padding: '0 32px' };
const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
  gap: 32,
};
const cardStyle = {
  background: '#232526',
  borderRadius: 16,
  boxShadow: '0 2px 16px #0006',
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.2s',
};
const imgStyle = {
  width: 180,
  height: 120,
  objectFit: 'cover',
  borderRadius: 12,
  boxShadow: '0 2px 8px #0004',
};
const viewBtnStyle = {
  marginTop: 18,
  background: 'linear-gradient(90deg, #ff9800 0%, #ffb347 100%)',
  color: '#222',
  fontWeight: 700,
  border: 'none',
  borderRadius: 8,
  padding: '10px 0',
  width: '100%',
  fontSize: 17,
  cursor: 'pointer',
  boxShadow: '0 2px 8px #0004',
  transition: 'filter 0.2s',
};

export default Home;
