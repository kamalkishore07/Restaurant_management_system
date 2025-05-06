import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/auth/signup', formData);
      alert(response.data.message);
      setIsOtpSent(true); // Show OTP input after signup
    } catch (error) {
      alert(error.response?.data?.message || 'Signup failed');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    console.log('Sending OTP verification request:', {
        email: formData.email,
        otp,
    }); // Debug log to confirm the request data
    try {
        const response = await axios.post('http://localhost:8080/auth/verify-otp', {
            email: formData.email,
            otp,
        });
        console.log('Response from backend:', response.data); // Debug log to confirm the response
        alert(response.data.message);
        setIsOtpSent(false); // Reset OTP form after successful verification
    } catch (error) {
        console.error('Error verifying OTP:', error.response?.data || error.message);
        alert(error.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {!isOtpSent ? (
        <form onSubmit={handleSignup}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div>
            <label>Phone:</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <button type="submit">Signup</button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div>
            <label>Enter OTP:</label>
            <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default Signup;