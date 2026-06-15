import React, { useEffect, useState } from 'react';

function Results() {
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('analysis');
    if (data) setAnalysis(data);
  }, []);

  // Convert **bold** markdown to <strong> and split into lines
  const formatLine = (line) => {
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="text-indigo-700">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

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
            <div className="space-y-3">
              {sections.map((line, index) => {
                const trimmed = line.trim();
                const isHeading = /^\*\*\d+\.|^\d+\.\s*\*\*/.test(trimmed);
                return (
                  <p
                    key={index}
                    className={
                      isHeading
                        ? 'text-indigo-700 font-bold text-lg mt-5 border-b border-indigo-100 pb-1'
                        : 'text-gray-700 leading-relaxed'
                    }
                  >
                    {formatLine(trimmed.replace(/^-\s*/, '• '))}
                  </p>
                );
              })}
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