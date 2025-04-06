import React from 'react';
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

const ProductList = ({ products }) => {
  return (
    <div className="product-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product, index) => {
        const price = 20000 + (index * 5000); // Simulasi harga

        return (
          <ProductCard
            key={product.id || index}
            product={{ ...product, price }}
          />
        );
      })}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string,
      ingredients: PropTypes.array,
    })
  ).isRequired
};

export default ProductList;