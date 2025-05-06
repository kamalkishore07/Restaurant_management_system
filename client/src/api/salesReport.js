const BASE_URL = 'http://localhost:5000/api/sales-report';

export async function getSalesReport() {
  const response = await fetch(BASE_URL);
  return await response.json();
}