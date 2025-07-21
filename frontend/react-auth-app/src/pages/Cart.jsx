import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyCart from '../components/cart/EmptyCart';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This would be replaced with your actual API call
    const fetchCart = async () => {
      try {
        setLoading(true);
        // Mock data for initial development
        const mockCartItems = [
          { id: 1, name: "Gaming Laptop", price: 1299, quantity: 1, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80" },
          { id: 2, name: "Mechanical Keyboard", price: 99, quantity: 2, image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" }
        ];
        
        // Simulate API delay
        setTimeout(() => {
          setCartItems(mockCartItems);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError("Failed to load cart items");
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Main render
  return (
    <div style={{ background: '#181A1B', minHeight: '100vh' }}>
      <Navbar onSearch={() => {}} onLogout={() => {}} />
      
      <div style={containerStyle}>
        <h1 style={{ color: '#ff9800', fontSize: 36, marginBottom: 24 }}>Your Shopping Cart</h1>
        
        {loading && (
          <div style={{ color: '#ccc', textAlign: 'center', padding: '32px' }}>Loading your cart...</div>
        )}
        
        {error && (
          <div style={{ color: '#ff5252', textAlign: 'center', padding: '32px' }}>{error}</div>
        )}
        
        {!loading && !error && cartItems.length === 0 && (
          <EmptyCart />
        )}
        
        {!loading && !error && cartItems.length > 0 && (
          <div style={cartContainerStyle}>
            {/* Cart items */}
            <div>
              {cartItems.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  onUpdateQuantity={updateQuantity} 
                  onRemoveItem={removeItem} 
                />
              ))}
            </div>
            
            {/* Cart summary */}
            <CartSummary totalAmount={calculateTotal()} />
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '48px 24px',
  maxWidth: 1200,
  margin: '0 auto',
  textAlign: 'center',
};

const cartContainerStyle = {
  background: '#232526',
  borderRadius: 16,
  boxShadow: '0 2px 24px #0008',
  overflow: 'hidden',
  marginBottom: 32,
};

export default Cart;