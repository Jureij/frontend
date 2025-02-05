import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/OrderManagement.css";

const OrderManagement = () => {
  const [formData, setFormData] = useState({
    customer: "",
    order_type: "materials",
    mason: "",
    products: "",
    total_price: 0.0,
    description: ""
  });
  const [customers, setCustomers] = useState([]);
  const [masons, setMasons] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);  // To store filtered orders
  const [message, setMessage] = useState("");

  const API_BASE_URL = "https://backend-mlyr.onrender.com/api/";

  useEffect(() => {
    fetchData("customer", setCustomers);
    fetchData("mason", setMasons);
    fetchData("product", setProducts);
    fetchOrders();
  }, []);

  useEffect(() => {
    if (formData.customer) {
      // Filter orders by selected customer
      const customerOrders = orders.filter(order => order.customer === formData.customer);
      setFilteredOrders(customerOrders);
    } else {
      setFilteredOrders(orders); // Show all orders if no customer is selected
    }
  }, [formData.customer, orders]);

  const fetchData = async (endpoint, setter) => {
    try {
      const response = await axios.get(`${API_BASE_URL}${endpoint}/`);
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error.response?.data || error.message);
      setMessage(`Failed to fetch ${endpoint}.`);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}order/`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
      setMessage("Failed to fetch orders.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}order/`, formData);
      setMessage("Order created successfully!");
      setFormData({
        customer: "",
        order_type: "materials",
        mason: "",
        products: "",
        total_price: 0.0,
        description: ""
      });
      fetchOrders();
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error.message);
      setMessage("Failed to create order. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-6 col-md-10 mx-auto">
          <div className="card shadow-lg p-4 bg-white rounded">
            <h2 className="text-center mb-4">Order Management Form</h2>
            {message && <div className="alert alert-info text-center">{message}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Customer</label>
                <select
                  className="form-select"
                  name="customer"
                  value={formData.customer}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Customer</option>
                  {customers.map(customer => (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Order Type</label>
                <select
                  className="form-select"
                  name="order_type"
                  value={formData.order_type}
                  onChange={handleChange}
                >
                  <option value="materials">Order for Materials</option>
                  <option value="mason">Request for Mason</option>
                </select>
              </div>

              {formData.order_type === "mason" && (
                <div className="form-group">
                  <label>Mason</label>
                  <select
                    className="form-select"
                    name="mason"
                    value={formData.mason}
                    onChange={handleChange}
                  >
                    <option value="">Select Mason</option>
                    {masons.map(mason => (
                      <option key={mason.id} value={mason.id}>{mason.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {formData.order_type === "materials" && (
                <div className="form-group">
                  <label>Product</label>
                  <select
                    className="form-select"
                    name="products"
                    value={formData.products}
                    onChange={handleChange}
                  >
                    <option value="">Select Product</option>
                    {products.map(product => (
                      <option key={product.id} value={product.id}>{product.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group">
                <label>Total Price</label>
                <input
                  type="number"
                  className="form-control"
                  name="total_price"
                  value={formData.total_price}
                  onChange={handleChange}
                  step="0.01"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100 mt-3 text-start">Submit Order</button>
            </form>

            <h4 className="text-center mt-4">Existing Orders</h4>
            <div className="table-responsive">
              <table className="table table-striped table-bordered mt-2 text-end">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Order Type</th>
                    <th>Total Price (TZS)</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.order_type}</td>
                      <td>{order.total_price}</td>
                      <td>{order.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
