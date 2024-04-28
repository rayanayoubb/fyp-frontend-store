import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

const CurrencyConverter: React.FC = () => {
  const [currency, setCurrency] = useState<string>('USD');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products data when component mounts
    fetchProducts();
  }, []);

  const fetchProducts = async (): Promise<void> => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/`);
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const convertCurrency = (price: number): string => {
    if (currency === 'LBP') {
      return (price * 90000).toFixed(2); // Use constant exchange rate
    }
    return price.toFixed(2);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setCurrency(e.target.value);
  };

  return (
    <div>
      <select value={currency} onChange={handleCurrencyChange}>
        <option value="USD">USD</option>
        <option value="LBP">LBP</option>
        {/* Add more currencies as needed */}
      </select>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name}: {currency === 'LBP' ? `$${convertCurrency(product.price)}` : `$${product.price.toFixed(2)}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyConverter;
