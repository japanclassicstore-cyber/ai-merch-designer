import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Shirt, ShoppingBag, Zap } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <section className="hero">
        <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <Sparkles size={64} style={{ color: '#667eea', marginBottom: '1rem' }} />
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#333' }}>
            Design Your Own Merch
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Upload images, use AI to generate unique designs, and create custom t-shirts, 
            mugs, hoodies, and more. Powered by Grok AI.
          </p>
          
          <button 
            className="btn btn-primary" 
            style={{ fontSize: '1.2rem', padding: '16px 32px' }}
            onClick={() => navigate('/design')}
          >
            <Zap size={24} />
            Start Designing
          </button>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>How It Works</h2>
        
        <div className="grid grid-3">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <span style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>1</span>
            </div>
            <h3>Upload or Generate</h3>
            <p style={{ color: '#666' }}>Upload your image or use AI to generate unique designs with prompts</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <span style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>2</span>
            </div>
            <h3>Choose Product</h3>
            <p style={{ color: '#666' }}>Select from t-shirts, mugs, hoodies, stickers, and more</p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem'
            }}>
              <span style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}>3</span>
            </div>
            <h3>Order & Enjoy</h3>
            <p style={{ color: '#666' }}>Preview your design, checkout, and get your custom merch delivered</p>
          </div>
        </div>
      </section>

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'white' }}>Popular Products</h2>
        
        <div className="grid grid-3">
          {[
            { name: 'T-Shirt', price: '$24.99', icon: <Shirt size={48} /> },
            { name: 'Mug', price: '$14.99', icon: <ShoppingBag size={48} /> },
            { name: 'Hoodie', price: '$44.99', icon: <Shirt size={48} /> },
          ].map((product, idx) => (
            <div key={idx} className="card" style={{ textAlign: 'center' }}>
              <div style={{ color: '#667eea', marginBottom: '1rem' }}>{product.icon}</div>
              <h3>{product.name}</h3>
              <p style={{ fontSize: '1.5rem', color: '#667eea', fontWeight: 'bold' }}>{product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
