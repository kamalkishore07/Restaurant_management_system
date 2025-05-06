const BASE_URL = 'http://localhost:5000/api/notifications';

export async function getNotifications() {
  const response = await fetch(BASE_URL);
  return await response.json();
}
