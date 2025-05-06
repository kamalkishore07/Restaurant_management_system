import React, { useEffect, useState } from 'react';
import { getOrders } from '../api/orders';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders().then(data => setOrders(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Orders</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.customerName}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;