import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Cart from './pages/Cart';
import About from './pages/About';
import FAQs from './pages/FAQs';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/about" element={<About />} />
      <Route path="/faqs" element={<FAQs />} />
    </Routes>
  </Router>
);

export default App;
