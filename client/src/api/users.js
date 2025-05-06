const BASE_URL = 'http://localhost:5000/api/users';

export async function getUsers() {
  const response = await fetch(BASE_URL);
  return await response.json();
}