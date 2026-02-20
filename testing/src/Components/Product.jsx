import { useState, useEffect } from "react";
import * as api from "../api/ProductApi";

const Product = ({ products: propProducts = null }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (propProducts) {
      setProducts(propProducts);
    } else {
      const fetchProducts = async () => {
        try {
          const data = await api.getProducts();
          setProducts(data);
        } catch (err) {
          console.error(err);
          setProducts([]);
        }
      };
      fetchProducts();
    }
  }, [propProducts]);

  return (
    <div data-testid="product-container">
      <h1>Products</h1>
      <ul data-testid="product-list">
        {products.map((product) => (
          <li key={product.id} data-testid={`product-item-${product.id}`}>
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
