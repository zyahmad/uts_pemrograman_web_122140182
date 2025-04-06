import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(ShopContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const res = await fetch('https://api.sampleapis.com/coffee/hot');
        const data = await res.json();
        const found = data.find((item) => item.id.toString() === id);
        if (found) {
          found.price = 45000 + (found.id % 4) * 5000;
          found.category = 'Hot Coffee';
        }
        setProduct(found);
      } catch (err) {
        setError('Gagal mengambil data produk.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoffee();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      navigate('/cart');
    }
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error || !product) return <div className="text-center p-4">{error || 'Produk tidak ditemukan.'}</div>;

  return (
    <div className="product-detail-page p-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Image section */}
        <div className="w-full md:w-1/2">
          <div className="product-image">
            <img
              src={product.image || 'https://via.placeholder.com/300x300?text=No+Image'}
              alt={product.title}
              className="object-contain w-full h-full p-4"
            />
          </div>
        </div>

        {/* Info section */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-4xl font-bold">{product.title}</h1>
          <p className="text-gray-700 text-lg">{product.description || 'Deskripsi tidak tersedia.'}</p>
          <div className="text-2xl font-semibold text-amber-800">
            Rp{Number(product.price).toLocaleString()}
          </div>
          <p className="text-sm text-gray-500"><strong>Kategori:</strong> {product.category}</p>

          <div className="flex gap-4 mt-6">
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button
            className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            onClick={handleAddToCart}
            >
              🛒 Tambah ke Keranjang
              </button>
              <button
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-2xl text-lg font-medium shadow-sm hover:shadow-md transform hover:scale-105 transition-all duration-200"
               onClick={() => navigate(-1)}
            >
              ← Kembali
             </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;