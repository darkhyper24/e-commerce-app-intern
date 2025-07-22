import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';

// Mock products data with descriptions
const mockProducts = [
  { 
    id: 1, 
    name: 'Gaming Laptop', 
    price: 1299, 
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
    description: 'High-performance gaming laptop featuring an NVIDIA GeForce RTX 3070 GPU, AMD Ryzen 9 processor, 16GB RAM, and 1TB SSD storage. Perfect for gaming on the go with a stunning 144Hz display.',
    specs: ['RTX 3070', 'AMD Ryzen 9', '16GB RAM', '1TB SSD', '144Hz Display']
  },
  { 
    id: 2, 
    name: 'Mechanical Keyboard', 
    price: 99, 
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
    description: 'Premium mechanical keyboard with tactile Cherry MX Blue switches for a satisfying typing experience. Features RGB backlighting with 16.8 million colors and customizable profiles.',
    specs: ['Cherry MX Blue Switches', 'RGB Backlighting', 'Anti-Ghosting', 'Aluminum Frame', 'USB-C Connection']
  },
  { 
    id: 3, 
    name: 'Wireless Mouse', 
    price: 49, 
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    description: 'Ergonomic wireless mouse with high-precision optical sensor. Features 6 programmable buttons and up to 12,000 DPI for smooth tracking on any surface.',
    specs: ['12,000 DPI', '6 Programmable Buttons', 'Ergonomic Design', '2.4GHz Wireless', '400 Hour Battery Life']
  },
  { 
    id: 4, 
    name: '4K Monitor', 
    price: 399, 
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
    description: 'Ultra-sharp 32" 4K monitor with HDR support for stunning visuals. Features a wide color gamut covering 99% of the Adobe RGB spectrum, perfect for professional design work.',
    specs: ['32" 4K UHD', 'HDR Support', '99% Adobe RGB', '5ms Response Time', 'VESA Mount Compatible']
  },
  { 
    id: 5, 
    name: 'Graphics Card', 
    price: 699, 
    image: 'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=400&q=80',
    description: 'Next-generation graphics card with ray-tracing technology for realistic lighting effects. Featuring 12GB GDDR6 memory and advanced cooling system for peak performance.',
    specs: ['12GB GDDR6', 'Ray-Tracing Support', '256-bit Memory Interface', 'Triple Fan Cooling', 'RGB Lighting']
  },
  { 
    id: 6, 
    name: 'SSD 1TB', 
    price: 129, 
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'High-speed 1TB NVMe SSD with read speeds up to 7000MB/s. Perfect for reducing load times and improving system responsiveness for gaming and content creation.',
    specs: ['1TB Capacity', 'NVMe PCIe 4.0', '7000MB/s Read Speed', '5300MB/s Write Speed', '5-year Warranty']
  },
];

const Products = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Create refs for products to scroll to
  const productRefs = useRef({});
  const hasScrolledRef = useRef(false);
  
  // Get the selected product ID from URL
  const params = new URLSearchParams(location.search);
  const selectedProductId = parseInt(params.get('id'));
  
  // Load products only once
  useEffect(() => {
    // Set products immediately to avoid flicker
    setProducts(mockProducts);
    
    // Simulate API loading delay
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);
  
  // Handle scrolling in a separate effect
  useEffect(() => {
    // Only attempt to scroll if:
    // 1. We have a selected product ID
    // 2. Products have loaded
    // 3. We haven't scrolled yet for this product
    if (selectedProductId && !loading && !hasScrolledRef.current) {
      // Small delay to ensure DOM is ready
      const scrollTimer = setTimeout(() => {
        const targetElement = productRefs.current[selectedProductId];
        if (targetElement) {
          targetElement.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
          });
          hasScrolledRef.current = true;
        }
      }, 100);
      
      return () => clearTimeout(scrollTimer);
    }
  }, [selectedProductId, loading]);
  
  // Reset scroll tracking when URL changes
  useEffect(() => {
    hasScrolledRef.current = false;
  }, [location.search]);

  const handleSearch = (searchTerm) => {
    setSearch(searchTerm);
  };

  const handleAddToCart = (product) => {
    console.log(`Adding ${product.name} to cart`);
    navigate('/cart');
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ background: '#181A1B', minHeight: '100vh' }}>
      <Navbar onSearch={handleSearch} onLogout={() => {}} />
      
      <div style={containerStyle}>
        <h1 style={{ color: '#ff9800', fontSize: 36, marginBottom: 24, textAlign: 'center' }}>
          Our Products
        </h1>
        
        {loading ? (
          <div style={{ color: '#ccc', textAlign: 'center', padding: '32px' }}>
            Loading products...
          </div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ color: '#ccc', textAlign: 'center', padding: '32px' }}>
            No products found matching "{search}".
          </div>
        ) : (
          <div style={productsContainerStyle}>
            {filteredProducts.map(product => (
              <div 
                key={product.id} 
                style={{
                  ...productCardStyle,
                  // Add highlight directly in the initial style for selected product
                  boxShadow: product.id === selectedProductId 
                    ? '0 0 0 3px #ff9800, 0 2px 16px rgba(0, 0, 0, 0.4)' 
                    : '0 2px 16px rgba(0, 0, 0, 0.4)'
                }}
                ref={el => productRefs.current[product.id] = el}
              >
                {/* Product image container */}
                <div style={productImageContainerStyle}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={productImageStyle} 
                  />
                </div>
                
                {/* Product info container */}
                <div style={productContentStyle}>
                  <h2 style={productTitleStyle}>{product.name}</h2>
                  <p style={productPriceStyle}>${product.price}</p>
                  
                  <div style={productDescriptionStyle}>
                    <h3 style={sectionTitleStyle}>Description</h3>
                    <p style={descriptionTextStyle}>{product.description}</p>
                  </div>
                  
                  <div style={productSpecsStyle}>
                    <h3 style={sectionTitleStyle}>Specifications</h3>
                    <ul style={specListStyle}>
                      {product.specs.map((spec, index) => (
                        <li key={index} style={specItemStyle}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    style={addToCartBtnStyle}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Styles
const containerStyle = {
  padding: '48px 24px',
  maxWidth: 1100,
  margin: '0 auto',
};

const productsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 40,
};

const productCardStyle = {
  background: '#232526',
  borderRadius: 16,
  overflow: 'hidden',
  boxShadow: '0 2px 16px rgba(0, 0, 0, 0.4)',
  display: 'flex',
  flexDirection: 'row', // Changed from column to row for side-by-side layout
};

const productImageContainerStyle = {
  width: '35%', // Fixed width for image container
  padding: 24,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRight: '1px solid #333',
};

const productImageStyle = {
  width: '100%',
  maxHeight: 320,
  objectFit: 'cover',
  borderRadius: 12,
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.3)',
};

const productContentStyle = {
  flex: 1,
  padding: 24,
  display: 'flex',
  flexDirection: 'column',
};

const productTitleStyle = {
  color: '#fff',
  fontSize: 28,
  marginBottom: 8,
};

const productPriceStyle = {
  color: '#ff9800',
  fontSize: 22,
  fontWeight: 600,
  marginBottom: 20,
};

const productDescriptionStyle = {
  marginBottom: 20,
};

const productSpecsStyle = {
  marginBottom: 32,
};

const sectionTitleStyle = {
  color: '#ff9800',
  fontSize: 18,
  marginBottom: 8,
  fontWeight: 600,
};

const descriptionTextStyle = {
  color: '#ccc',
  lineHeight: 1.6,
};

const specListStyle = {
  color: '#ccc',
  paddingLeft: 20,
  columns: 2,
};

const specItemStyle = {
  marginBottom: 6,
};

const addToCartBtnStyle = {
  alignSelf: 'flex-start',
  background: 'linear-gradient(90deg, #ff9800 0%, #ffb347 100%)',
  color: '#222',
  fontWeight: 700,
  border: 'none',
  borderRadius: 8,
  padding: '12px 24px',
  fontSize: 16,
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
  transition: 'filter 0.2s, transform 0.1s',
};

export default Products;