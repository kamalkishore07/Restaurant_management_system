const BASE_URL = 'http://localhost:5000/api/orders';

export async function getOrders() {
  const response = await fetch(BASE_URL);
  return await response.json();
}