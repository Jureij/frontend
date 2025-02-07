import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/PaymentForm.css';

const PaymentForm = () => {
    const [orders, setOrders] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([
        { value: 'mobile_money', label: 'Mobile Money' },
        { value: 'bank', label: 'Bank' },
    ]);
    const [amountPaid, setAmountPaid] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [referenceNumber, setReferenceNumber] = useState('');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 16));
    const [selectedOrder, setSelectedOrder] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://backend-1-kb5u.onrender.com/api/order/');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setMessage('Error fetching orders');
            }
        };

        fetchOrders();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const paymentData = {
            order: selectedOrder,
            amount_paid: amountPaid,
            payment_method: paymentMethod,
            payment_date: paymentDate,
            reference_number: referenceNumber,
        };

        try {
            const response = await axios.post('https://backend-1-kb5u.onrender.com/api/payment/', paymentData);
            if (response.status === 201) {
                setMessage('Payment successfully recorded');
            } else {
                setMessage('Payment failed');
            }
        } catch (error) {
            console.error('Error submitting payment:', error);
            setMessage('An error occurred while submitting the payment');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6 col-md-10 mx-auto">
                    <div className="card shadow-lg p-4 bg-white rounded">
                        <h2 className="text-center mb-4">Payment Form</h2>
                        {message && <div className="alert alert-info text-center">{message}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Order</label>
                                <select
                                    className="form-select"
                                    id="order"
                                    value={selectedOrder}
                                    onChange={(e) => setSelectedOrder(e.target.value)}
                                    required
                                >
                                    <option value="">Select Order</option>
                                    {orders.map((order) => (
                                        <option key={order.id} value={order.id}>
                                            Order {order.id} - Customer: {order.customer}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Amount Paid</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="amountPaid"
                                    value={amountPaid}
                                    onChange={(e) => setAmountPaid(e.target.value)}
                                    required
                                    placeholder="Enter amount"
                                />
                            </div>

                            <div className="form-group">
                                <label>Payment Method</label>
                                <select
                                    className="form-select"
                                    id="paymentMethod"
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    required
                                >
                                    {paymentMethods.map((method) => (
                                        <option key={method.value} value={method.value}>
                                            {method.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Payment Date</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="paymentDate"
                                    value={paymentDate}
                                    onChange={(e) => setPaymentDate(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Reference Number (Optional)</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="referenceNumber"
                                    value={referenceNumber}
                                    onChange={(e) => setReferenceNumber(e.target.value)}
                                    placeholder="Enter reference number"
                                />
                            </div>

                            <button type="submit" className="btn btn-primary w-100 mt-3">
                                Submit Payment
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentForm;
