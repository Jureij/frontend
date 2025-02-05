import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const SignIn = () => {
  const [mobile_number, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const validateMobileNumber = (number) => {
    // Adjust this regex according to your country's format
    const regex = /^\d{10}$/; // Example for 10 digit numbers
    return regex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    // Validate the mobile number
    if (!validateMobileNumber(mobile_number)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    // Here, simulate the login by storing data in localStorage
    const userData = {
      mobile_number,
      password,  // You can choose not to store password for security reasons
    };

    // Save user data to localStorage to simulate login
    localStorage.setItem("user_data", JSON.stringify(userData));

    // Display success message
    setSuccessMessage("Login successful.");

    // Redirect to the Dashboard or another page
    setTimeout(() => {
      navigate("/dashboard"); // Redirect to the dashboard or another page
    }, 2000);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Sign In</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="mobile_number" className="form-label">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              id="mobile_number"
              placeholder="Enter your mobile number"
              value={mobile_number}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
        <div className="text-center mt-3">
          Not registered? <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
