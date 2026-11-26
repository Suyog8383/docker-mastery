
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
   fetch('/api/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Unable to load products');
        setLoading(false);
      });
  }, []);

  return (
    <main className="container">
      <h1>Product Dashboard</h1>
      <p>Docker Production Application</p>

      {loading && <p>Loading products...</p>}
      {error && <p>{error}</p>}

      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <h2>{product.name}</h2>
            <p>₹{product.price.toLocaleString('en-IN')}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
