import React, { useEffect, useState } from 'react';
import { getInventory, addInventoryItem } from '../api/inventory';

function Inventory() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: '', unit: '' });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    getInventory().then(data => setItems(data));
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addInventoryItem(form);
    setForm({ name: '', quantity: '', unit: '' });
    fetchItems();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Inventory</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} required />
        <input name="unit" placeholder="Unit" value={form.unit} onChange={handleChange} required />
        <button type="submit">Add Item</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;