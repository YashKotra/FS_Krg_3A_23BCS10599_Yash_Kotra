export const getProducts = async () => {
  const response = await fetch("https://api.example.com/products");
  const data = await response.json();
  return data;
};

export const getProductById = async (id) => {
  const response = await fetch(`https://api.example.com/products/${id}`);
  const data = await response.json();
  return data;
};

export const createProduct = async (product) => {
  const response = await fetch("https://api.example.com/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  return data;
};
