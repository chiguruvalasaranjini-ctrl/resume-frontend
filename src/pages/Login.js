import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email, password
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      window.location.href = '/upload';
    } catch (error) {
      setMessage('Login failed! Check your credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">ResumeAI</h1>
          <p className="text-gray-500 mt-2">Analyze your resume with AI</p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Welcome Back!</h2>
        <input type="email" placeholder="Email Address" value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <button onClick={handleLogin}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200">
          Login
        </button>
        {message && <p className="text-red-500 text-center mt-4">{message}</p>}
        <p className="text-center text-gray-500 mt-6">Don't have an account? <a href="/register" className="text-indigo-600 font-semibold hover:underline">Register</a></p>
      </div>
    </div>
  );
}

export default Login;