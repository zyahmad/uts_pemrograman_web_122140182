import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../context/useFetch';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import Error from '../components/Error';
import AboutKopireem from '../components/AboutKopireem';

const Home = () => {
  // Ambil data kopi dari API hot
  const { data: coffeeData, loading, error } = useFetch('https://api.sampleapis.com/coffee/iced');
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    if (coffeeData && coffeeData.length > 0) {
      // Ambil 4 produk pertama sebagai featured
      const simulatedProducts = coffeeData.slice(0, 4).map((item, index) => ({
        ...item,
        price: 25000 + index * 5000, // Simulasi harga
      }));
      setFeaturedProducts(simulatedProducts);
    }
  }, [coffeeData]);

  return (
    <div className="home-page">
      <AboutKopireem />
      <section className="hero-section bg-yellow-100 py-16 text-center">
        <div className="hero-content max-w-xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Kopireem</h1>
          <p className="text-lg mb-6">Butuh kopi? Beli di Kopireem</p>
          <Link to="/products" className="cta-button bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="featured-section py-12 px-4">
        <h2 className="text-2xl font-semibold mb-6 text-center">Featured Products</h2>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message={error} />
        ) : (
          <>
            <ProductList products={featuredProducts} />
            <div className="view-more text-center mt-8">
              <Link to="/products" className="view-more-link text-blue-600 hover:underline">
                View All Products
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;