import React, { useState } from 'react';
import axios from 'axios';

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a PDF file!');
      return;
    }

    setLoading(true);
    setMessage('Analyzing your resume with AI...');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', user.id || 1);

    try {
      const response = await axios.post('http://localhost:8080/api/resume/upload', formData);
      localStorage.setItem('analysis', response.data.analysis);
      window.location.href = '/results';
    } catch (error) {
      setMessage('Error uploading resume. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">ResumeAI</h1>
          <p className="text-gray-500 mt-2">Welcome, {user.name || 'User'}! 👋</p>
        </div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Upload Your Resume</h2>
        <p className="text-gray-500 mb-6">Upload your PDF resume and get instant AI-powered analysis</p>

        <div className="border-2 border-dashed border-indigo-300 rounded-xl p-8 text-center mb-6 hover:border-indigo-500 transition duration-200">
          <div className="text-5xl mb-4">📄</div>
          <input type="file" accept=".pdf"
            onChange={e => setFile(e.target.files[0])}
            className="hidden" id="fileInput" />
          <label htmlFor="fileInput" className="cursor-pointer text-indigo-600 font-semibold hover:underline">
            Click to select PDF file
          </label>
          {file && <p className="text-green-600 mt-2 font-medium">✅ {file.name}</p>}
        </div>

        <button onClick={handleUpload} disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 disabled:opacity-50">
          {loading ? '⏳ Analyzing...' : '🚀 Analyze Resume'}
        </button>

        {message && (
          <p className="text-center mt-4 text-indigo-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}

export default Upload;