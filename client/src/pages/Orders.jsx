import React, { useState, useEffect } from 'react';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle size={20} style={{ color: 'green' }} />;
      case 'shipped':
        return <Truck size={20} style={{ color: '#667eea' }} />;
      case 'processing':
        return <Clock size={20} style={{ color: 'orange' }} />;
      default:
        return <Package size={20} style={{ color: '#999' }} />;
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <div className="spinner" />
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container">
        <div className="card" style={{ textAlign: 'center', padding: '4rem' }}>
          <Package size={64} style={{ color: '#ccc', marginBottom: '1rem' }} />
          <h2>No Orders Yet</h2>
          <p style={{ color: '#666', marginTop: '1rem' }}>Your order history will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2 style={{ color: 'white', marginBottom: '2rem' }}>My Orders</h2>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {orders.map((order) => (
          <div key={order._id} className="card">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <div>
                <span style={{ fontWeight: 'bold', color: '#667eea' }}>
                  Order #{order._id?.slice(-6).toUpperCase()}
                </span>
                <span style={{ color: '#999', marginLeft: '1rem' }}>
                  {new Date(order.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {getStatusIcon(order.status)}
                <span style={{ textTransform: 'capitalize' }}>{order.status}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <img
                src={order.design?.imageUrl}
                alt="Order"
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '10px'
                }}
              />
              
              <div style={{ flex: 1 }}>
                <p style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                  {order.product?.type}
                </p>
                {(order.product?.type === 'tshirt' || order.product?.type === 'hoodie') && (
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    Size: {order.product?.size} | Color: {order.product?.color}
                  </p>
                )}
              </div>
              
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#667eea' }}>
                  ${order.total?.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
