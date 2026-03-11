import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Loader2, CheckCircle } from 'lucide-react';

const productPrices = {
  tshirt: 24.99,
  hoodie: 44.99,
  mug: 14.99,
  tote: 19.99,
  sticker: 9.99,
  poster: 29.99,
};

function Checkout({ design, product }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'US',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Save order to backend
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          design,
          product,
          customer: formData,
          total: productPrices[product.type] + 5
        })
      });

      if (response.ok) {
        setOrderComplete(true);
      }
    } catch (error) {
      console.error('Order error:', error);
    }

    setLoading(false);
  };

  if (orderComplete) {
    return (
      <div className="container" style={{ maxWidth: '600px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <CheckCircle size={80} style={{ color: 'green', marginBottom: '1rem' }} />
          <h1>Order Confirmed! 🎉</h1>
          <p style={{ marginTop: '1rem', color: '#666' }}>
            Thank you for your order. You'll receive a confirmation email shortly.
          </p>
          
          <div style={{ 
            background: '#f8f9fa', 
            padding: '1.5rem', 
            borderRadius: '10px',
            marginTop: '2rem'
          }}>
            <h3>Order Details</h3>
            <p>Product: {product.type}</p>
            <p>Total: ${(productPrices[product.type] + 5).toFixed(2)}</p>
          </div>

          <button
            className="btn btn-primary"
            style={{ marginTop: '2rem' }}
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '800px' }}>
      <h2 style={{ color: 'white', marginBottom: '2rem', textAlign: 'center' }}>
        Checkout
      </h2>

      <div className="card">
        {/* Progress */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: '2rem',
          padding: '0 2rem'
        }}>
          {['Shipping', 'Payment', 'Review'].map((s, idx) => (
            <div key={s} style={{ 
              textAlign: 'center',
              opacity: step >= idx + 1 ? 1 : 0.5
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: step >= idx + 1 ? '#667eea' : '#e0e0e0',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 0.5rem'
              }}>
                {idx + 1}
              </div>
              <span style={{ fontSize: '0.9rem' }}>{s}</span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <h3><Truck size={20} /> Shipping Information</h3>
              
              <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1rem'
                  }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0',
                      fontSize: '1rem'
                    }}
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0',
                      fontSize: '1rem'
                    }}
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1rem'
                  }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0',
                      fontSize: '1rem'
                    }}
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0',
                      fontSize: '1rem'
                    }}
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0',
                      fontSize: '1rem'
                    }}
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: '2rem' }}
                onClick={() => setStep(2)}
              >
                Continue to Payment →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <h3><CreditCard size={20} /> Payment Information</h3>
              
              <div style={{ marginTop: '1rem' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '15px',
                  padding: '2rem',
                  color: 'white',
                  marginBottom: '2rem'
                }}
                >
                  <div style={{ fontSize: '1.5rem', letterSpacing: '2px', marginBottom: '2rem' }}>
                    {formData.cardNumber || '•••• •••• •••• ••••'}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{formData.firstName} {formData.lastName}</span>
                    <span>{formData.cardExpiry || 'MM/YY'}</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={19}
                    required
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0',
                      fontSize: '1rem'
                    }}
                  />

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      maxLength={5}
                      required
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '2px solid #e0e0e0',
                        fontSize: '1rem'
                      }}
                    />
                    <input
                      type="text"
                      name="cardCvc"
                      placeholder="CVC"
                      value={formData.cardCvc}
                      onChange={handleInputChange}
                      maxLength={4}
                      required
                      style={{
                        padding: '12px',
                        borderRadius: '8px',
                        border: '2px solid #e0e0e0',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setStep(1)}
                >
                  ← Back
                </button>
                
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  onClick={() => setStep(3)}
                >
                  Review Order →
                </button>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h3>Review Order</h3>
              
              <div style={{ 
                background: '#f8f9fa', 
                padding: '1.5rem', 
                borderRadius: '10px',
                marginTop: '1rem'
              }}>
                <h4>Product</h4>
                <p style={{ textTransform: 'capitalize' }}>{product.type} - ${productPrices[product.type].toFixed(2)}</p>
                {(product.type === 'tshirt' || product.type === 'hoodie') && (
                  <p>Size: {product.size} | Color: {product.color}</p>
                )}

                <hr style={{ margin: '1rem 0' }} />

                <h4>Shipping To</h4>
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.zipCode}</p>

                <hr style={{ margin: '1rem 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold' }}>
                  <span>Total:</span>
                  <span style={{ color: '#667eea' }}>${(productPrices[product.type] + 5).toFixed(2)}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setStep(2)}
                >
                  ← Back
                </button>
                
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="spin" size={20} />
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Checkout;
