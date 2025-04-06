import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Kopireem</h3>
          <p>Butuh Kopi? Beli di Kopireem</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>  
          <p>Phone: 0123456789</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Kopireem.</p>
      </div>
    </footer>
  );
};

export default Footer;