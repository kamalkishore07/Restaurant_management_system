import React, { useEffect, useState } from 'react';
import { getSalesReport } from '../api/salesReport';

function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    getSalesReport().then(data => setSales(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Sales Report</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(s => (
            <tr key={s.date}>
              <td>{s.date}</td>
              <td>{s.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Sales;