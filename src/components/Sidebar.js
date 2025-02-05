import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/Sidebar.css'; // Import the new CSS

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/customer">Customer</Link></li>
        <li><Link to="/orderManagement">Order Management</Link></li>
        <li><Link to="/payment">Payment</Link></li>
      </ul>
    </nav>
  );
};

export default Sidebar;
