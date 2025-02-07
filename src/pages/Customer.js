import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/OrderManagement.css";

const Customer = () => {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    mobile_number: "",
    email: "",
    password: "",
    gender: "MALE",
  });

  const [customers, setCustomers] = useState([]);
  const [message, setMessage] = useState("");

  const API_URL = "https://backend-1-kb5u.onrender.com/api/customer/";

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(API_URL);
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error.response?.data || error.message);
      setMessage("Failed to fetch customers.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, customer, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setMessage("Customer added successfully!");
        setCustomer({
          name: "",
          address: "",
          mobile_number: "",
          email: "",
          password: "",
          gender: "MALE",
        });
        fetchCustomers();
      } else {
        setMessage("Failed to add customer. Please try again.");
      }
    } catch (error) {
      console.error("Error adding customer:", error.response?.data || error.message);
      setMessage("Failed to add customer. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6 col-md-10 mx-auto">
          <div className="card shadow-lg p-4 bg-white rounded">
            <h2 className="text-center mb-4">Customer Form</h2>
            {message && <div className="alert alert-info text-center">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={customer.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={customer.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="text"
                  name="mobile_number"
                  className="form-control"
                  value={customer.mobile_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={customer.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={customer.password}
                  onChange={handleChange}
                  required
                  minLength="5"
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  className="form-select"
                  value={customer.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100 mt-3">
                Submit
              </button>
            </form>

            <h4 className="text-center mt-4">Existing Customers</h4>
            <ul className="list-group mt-2">
              {customers.map((c) => (
                <li key={c.id} className="list-group-item">
                  {c.name} - {c.mobile_number} - {c.email}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
