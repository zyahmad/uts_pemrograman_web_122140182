import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import logo from '../assets/logo.jpg';

const Header = () => {
  const { cartItems } = useContext(ShopContext);
  
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
        <img src={logo} alt="Kopireem Logo" className="kopireem-logo"/>
        </Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li>
            <Link to="/cart" className="cart-link">
              Cart
              {cartItemCount > 0 && <span className="cart-count">{cartItemCount}</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;