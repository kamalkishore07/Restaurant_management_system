import React, { useEffect, useState } from 'react';
import { getMenuItems } from '../api/menuItems';

function MenuItems() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getMenuItems().then(data => setItems(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Menu Items</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MenuItems;
