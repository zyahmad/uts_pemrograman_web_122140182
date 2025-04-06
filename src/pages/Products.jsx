import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../context/useFetch';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Products = () => {
  const [searchParams] = useSearchParams();
  const keywordParam = searchParams.get('search');

  const { data: allProducts, loading, error } = useFetch('https://api.sampleapis.com/coffee/iced');

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(keywordParam || '');
  const [sortOption, setSortOption] = useState('');

  // Simulasi harga + pencarian + sorting
  useEffect(() => {
    if (allProducts && Array.isArray(allProducts)) {
      let updated = allProducts.map((p, index) => ({
        ...p,
        id: p.id || index,
        price: 45000 + (index % 5) * 5000,
        category: 'Hot Coffee',
        origin: 'Amerika Selatan', // default/fake origin
      }));

      // Filter berdasarkan keyword pencarian (optional)
      if (searchKeyword) {
        updated = updated.filter(p =>
          p.title.toLowerCase().includes(searchKeyword.toLowerCase())
        );
      }

      // Sort
      if (sortOption === 'price-low-high') {
        updated.sort((a, b) => a.price - b.price);
      } else if (sortOption === 'price-high-low') {
        updated.sort((a, b) => b.price - a.price);
      } else if (sortOption === 'name-a-z') {
        updated.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sortOption === 'name-z-a') {
        updated.sort((a, b) => b.title.localeCompare(a.title));
      }

      setFilteredProducts(updated);
    }
  }, [allProducts, searchKeyword, sortOption]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="products-page p-6">
      <h1 className="text-3xl font-bold mb-4">Katalog Kopi</h1>

      <div className="filters-section flex flex-col md:flex-row gap-4 mb-6">
        {/* Search input */}
        <div className="search-filter w-full md:w-1/2">
          <label htmlFor="search" className="block font-medium mb-1">Cari Nama Kopi:</label>
          <input
            type="text"
            id="search"
            value={searchKeyword}
            onChange={handleSearchChange}
            placeholder="Contoh: Espresso"
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        {/* Sort filter */}
        <div className="sort-filter w-full md:w-1/2">
          <label htmlFor="sort" className="block font-medium mb-1">Urutkan:</label>
          <select
            id="sort"
            value={sortOption}
            onChange={handleSortChange}
            className="border px-3 py-2 rounded w-full"
          >
            <option value="">Default</option>
            <option value="price-low-high">Harga: Rendah ke Tinggi</option>
            <option value="price-high-low">Harga: Tinggi ke Rendah</option>
          </select>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Error message={error} />
      ) : (
        <ProductList products={filteredProducts} />
      )}
    </div>
  );
};

export default Products;