import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';

const OrderConfirmation = () => {
  const { cartItems } = useContext(ShopContext);
  const navigate = useNavigate();
  
  // Redirect to home if accessed directly without checkout
  useEffect(() => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
  }, [cartItems, navigate]);
  
  const orderNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  
  return (
    <div className="order-confirmation-page">
      <div className="confirmation-container">
        <div className="success-icon">✓</div>
        <h1>Order Confirmed!</h1>
        <p>Thank you for your purchase.</p>
        <p className="order-number">Order Number: #{orderNumber}</p>
        
        <div className="confirmation-details">
          <p>Pesanan anda akan dikirim kurang lebih 5 hari.</p>
        </div>
        
        <div className="confirmation-actions">
          <Link to="/" className="home-btn">Return to Home</Link>
          <Link to="/products" className="shop-more-btn">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;