import React, { useEffect, useState } from 'react';

function Results() {
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('analysis');
    if (data) setAnalysis(data);
  }, []);

  const sections = analysis.split('\n').filter(line => line.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">ResumeAI</h1>
          <p className="text-gray-500 mt-2">Your AI-Powered Resume Analysis</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">📊 Analysis Results</h2>

          {analysis ? (
            <div className="space-y-2">
              {sections.map((line, index) => (
                <p key={index} className={`
                  ${line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('4.') || line.startsWith('5.') 
                    ? 'text-indigo-600 font-bold text-lg mt-4' 
                    : 'text-gray-600'}
                `}>
                  {line}
                </p>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No analysis found. Please upload your resume first.</p>
          )}
        </div>

        <div className="text-center">
          <button onClick={() => window.location.href = '/upload'}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200">
            📄 Upload Another Resume
          </button>
        </div>
      </div>
    </div>
  );
}

export default Results;