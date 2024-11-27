import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com'
});

export const fetchProducts = async (query = '') => {
  const endpoint = query ? `/products/search?q=${query}` : '/products';
  const { data } = await api.get(endpoint);
  return data.products;
};

export const fetchProduct = async (id) => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};