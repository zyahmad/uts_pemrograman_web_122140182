import React, { useEffect, useState } from 'react';

const CombinedCoffee = () => {
  const [coffeeData, setCoffeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoffee = async () => {
      try {
        const [hotRes, icedRes] = await Promise.all([
          fetch('https://api.sampleapis.com/coffee/hot'),
          fetch('https://api.sampleapis.com/coffee/iced'),
        ]);

        if (!hotRes.ok || !icedRes.ok) {
          throw new Error('Gagal mengambil data');
        }

        const [hotData, icedData] = await Promise.all([
          hotRes.json(),
          icedRes.json(),
        ]);

        const combined = [...hotData, ...icedData];
        setCoffeeData(combined);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffee();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      {coffeeData.map((item) => (
        <div key={item.id} className="border rounded p-4">
          <h3 className="text-xl font-bold mb-2">{item.title}</h3>
          <img src={item.image} alt={item.title} className="w-full h-48 object-cover rounded mb-2" />
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CombinedCoffee;