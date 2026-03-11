import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DesignStudio from './pages/DesignStudio';
import ProductPreview from './pages/ProductPreview';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import './App.css';

function App() {
  const [design, setDesign] = useState(null);
  const [product, setProduct] = useState({ type: 'tshirt', color: 'white', size: 'M' });

  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>🎨 AI Merch Designer</h1>
          <nav>
            <a href="/">Home</a>
            <a href="/design">Design Studio</a>
            <a href="/orders">My Orders</a>
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/design" element={
            <DesignStudio design={design} setDesign={setDesign} product={product} setProduct={setProduct} />
          } />
          <Route path="/preview" element={
            <ProductPreview design={design} product={product} />
          } />
          <Route path="/checkout" element={
            <Checkout design={design} product={product} />
          } />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
