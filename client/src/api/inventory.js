const BASE_URL = 'http://localhost:5000/api/inventory';

export async function getInventory() {
  const response = await fetch(BASE_URL);
  return await response.json();
}