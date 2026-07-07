import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";


const SEARCH_PRODUCTS = gql`
  query SearchProducts($query: String!) {
    searchProducts(query: $query) {
      id
      name
      price
      category
    }
  }
`;

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerQuery, setTriggerQuery] = useState("");

  const { loading, error, data } = useQuery(SEARCH_PRODUCTS, {
    variables: { query: triggerQuery },
    skip: triggerQuery === "", 
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setTriggerQuery(searchQuery);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto" }}>
      <h2 style={{ color: "#333" }}>Пошук товарів (Elasticsearch + GraphQL)</h2>
      
      <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Введіть назву товару або категорію..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Знайти
        </button>
      </form>

      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: "red" }}>Помилка: {error.message}</p>}

      <div>
        {data && data.searchProducts && data.searchProducts.length > 0 ? (
          data.searchProducts.map((product) => (
            <div key={product.id} style={{ padding: "15px", border: "1px solid #eee", borderRadius: "4px", marginBottom: "10px", backgroundColor: "#f9f9f9" }}>
              <h3 style={{ margin: "0 0 5px 0" }}>{product.name}</h3>
              <p style={{ margin: "0 0 5px 0", color: "#666" }}>Категорія: {product.category}</p>
              <strong style={{ color: "#28a745" }}>{product.price} грн</strong>
            </div>
          ))
        ) : (
          triggerQuery && !loading && <p style={{ color: "#999" }}>Товарів не знайдено</p>
        )}
      </div>
    </div>
  );
}

export default App;