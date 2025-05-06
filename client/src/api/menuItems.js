const BASE_URL = 'http://localhost:5000/api/menu-items';

export async function getMenuItems() {
  const response = await fetch(BASE_URL);
  return await response.json();
}
