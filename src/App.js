// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './css/Sidebar.css';
import "./css/OrderManagement.css"; 
import OrderManagement from './pages/OrderManagement';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Customer from './pages/Customer';
import Payment from './pages/PaymentForm';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            {/* <Route path="/" element={<h1>Welcome to the App</h1>} /> */}
            <Route path="/orderManagement" element={<OrderManagement />} />
            <Route path="/" element={<SignIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/customer" element={<Customer />}/>
            <Route path="/sidebar" element={<Sidebar />}/>
            <Route path="/payment" element={<Payment />}/>
            
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
