import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Inventory from './pages/Inventory';
import MenuItems from './pages/MenuItems';
import Orders from './pages/Orders';
import Notifications from './pages/Notifications';
import Sales from './pages/Sales';
import Users from './pages/Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inventory />} />
        <Route path="/menu-items" element={<MenuItems />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
