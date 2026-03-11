import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shirt, Coffee, ShoppingBag, Sticker, Image, Check, Loader2 } from 'lucide-react';

// Segmind API integration placeholder
const generateMockup = async (designUrl, productType) => {
  // TODO: Replace with actual Segmind API call
  // Example Segmind API usage:
  /*
  const response = await fetch('https://api.segmind.com/v1/product-mockup', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${SEGMIND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      design_url: designUrl,
      product_type: productType,
      color: product.color
    })
  });
  return response.json();
  */
  
  // For now, simulate with a delay and return the design
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { 
    success: true, 
    mockupUrl: designUrl,
    note: 'Using placeholder - add Segmind API for real mockups'
  };
};

const productIcons = {
  tshirt: <Shirt size={48} />,
  hoodie: <Shirt size={48} />,
  mug: <Coffee size={48} />,
  tote: <ShoppingBag size={48} />,
  sticker: <Sticker size={48} />,
  poster: <Image size={48} />,
};

const productPrices = {
  tshirt: 24.99,
  hoodie: 44.99,
  mug: 14.99,
  tote: 19.99,
  sticker: 9.99,
  poster: 29.99,
};

function ProductPreview({ design, product }) {
  const navigate = useNavigate();
  const [mockup, setMockup] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (design?.imageUrl) {
      generateProductMockup();
    }
  }, [design]);

  const generateProductMockup = async () => {
    setLoading(true);
    const result = await generateMockup(design.imageUrl, product.type);
    if (result.success) {
      setMockup(result);
    }
    setLoading(false);
  };

  if (!design) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <h2>No Design Selected</h2>
          <p>Please create a design first.</p>
          <button className="btn btn-primary" onClick={() => navigate('/design')}>
            Go to Design Studio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ color: 'white', marginBottom: '2rem', textAlign: 'center' }}>
        Product Preview
      </h2>

      <div className="grid grid-2">
        <div className="card">
          <h3>Your Design</h3>
          <div style={{ 
            background: '#f8f9fa', 
            borderRadius: '15px', 
            padding: '2rem',
            marginTop: '1rem',
            textAlign: 'center'
          }}>
            {loading ? (
              <div className="loading">
                <Loader2 size={48} className="spin" style={{ color: '#667eea' }} />
                <p>Generating mockup...</p>
              </div>
            ) : (
              <>
                <div className="preview-container">
                  <div style={{ 
                    background: product.color === 'white' ? '#f0f0f0' : product.color,
                    borderRadius: '20px',
                    padding: '3rem',
                    minHeight: '300px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontSize: '8rem',
                      opacity: 0.1,
                      color: product.color === 'white' ? '#333' : '#fff'
                    }}>
                      {productIcons[product.type]}
                    </div>
                    
                    <img
                      src={mockup?.mockupUrl || design.imageUrl}
                      alt="Product Preview"
                      style={{
                        maxWidth: '60%',
                        maxHeight: '250px',
                        objectFit: 'contain',
                        borderRadius: '10px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                      }}
                    />
                  </div>
                </div>

                {mockup?.note && (
                  <p style={{ 
                    marginTop: '1rem', 
                    padding: '10px', 
                    background: '#fff3cd', 
                    borderRadius: '5px',
                    fontSize: '0.9rem'
                  }}>
                    💡 {mockup.note}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        <div className="card">
          <h3>Order Summary</h3>
          
          <div style={{ marginTop: '1rem' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '1rem 0',
              borderBottom: '1px solid #eee'
            }}>
              <span>Product:</span>
              <span style={{ textTransform: 'capitalize' }}>{product.type}</span>
            </div>

            {(product.type === 'tshirt' || product.type === 'hoodie') && (
              <>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '1rem 0',
                  borderBottom: '1px solid #eee'
                }}>
                  <span>Size:</span>
                  <span>{product.size}</span>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '1rem 0',
                  borderBottom: '1px solid #eee'
                }}>
                  <span>Color:</span>
                  <span style={{ textTransform: 'capitalize' }}>{product.color}</span>
                </div>
              </>
            )}

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '1rem 0',
              borderBottom: '1px solid #eee'
            }}>
              <span>Base Price:</span>
              <span>${productPrices[product.type].toFixed(2)}</span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '1rem 0',
              borderBottom: '1px solid #eee'
            }}>
              <span>Design Fee:</span>
              <span>$5.00</span>
            </div>

            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '1.5rem 0',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#667eea'
            }}>
              <span>Total:</span>
              <span>${(productPrices[product.type] + 5).toFixed(2)}</span>
            </div>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Check size={20} style={{ color: 'green' }} />
              <span>High quality printing</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Check size={20} style={{ color: 'green' }} />
              <span>Fast shipping</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Check size={20} style={{ color: 'green' }} />
              <span>30-day returns</span>
            </div>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem' }}
            onClick={() => navigate('/checkout')}
            disabled={loading}
          >
            Proceed to Checkout
          </button>

          <button
            className="btn btn-secondary"
            style={{ width: '100%', marginTop: '0.5rem' }}
            onClick={() => navigate('/design')}
          >
            ← Back to Design
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPreview;
