import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(ShopContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="product-card border rounded shadow p-4 bg-white hover:shadow-md transition">
      <Link to={`/products/${product.id}`} className="product-link block">
        <div className="product-image mb-4">
          <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
        </div>
        <div className="product-info">
          <h3 className="product-title font-semibold text-lg mb-1">{product.title}</h3>
          <p className="product-price text-green-600 font-bold mb-2">Rp {product.price.toLocaleString()}</p>
        </div>
      </Link>
      <button 
        className="add-to-cart-btn bg-yellow-500 text-white py-1 px-4 rounded hover:bg-yellow-600 mt-2"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired, // ditambahkan manual di ProductList
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    ingredients: PropTypes.array,
  }).isRequired
};

export default ProductCard;