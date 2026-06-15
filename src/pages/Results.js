import React, { useEffect, useState } from 'react';

function Results() {
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('analysis');
    if (data) setAnalysis(data);
  }, []);

  // Extract a field like "ATS_SCORE: 85" or multi-line "ATS_REASON: ..."
  const extractField = (text, fieldName, nextFields) => {
    const nextPattern = nextFields.map(f => `${f}:`).join('|');
    const regex = new RegExp(
      `${fieldName}:\\s*([\\s\\S]*?)(?=\\n(?:${nextPattern})|$)`,
      'i'
    );
    const match = text.match(regex);
    return match ? match[1].trim() : '';
  };

  const fields = ['ATS_SCORE', 'ATS_REASON', 'SKILLS_FOUND', 'MISSING_SKILLS', 'JOB_RECOMMENDATIONS', 'IMPROVEMENT_SUGGESTIONS'];

  const getData = () => {
    const result = {};
    fields.forEach((field, i) => {
      const next = fields.slice(i + 1);
      result[field] = extractField(analysis, field, next);
    });
    return result;
  };

  const data = analysis ? getData() : null;
  const score = data && data.ATS_SCORE ? parseInt(data.ATS_SCORE.match(/\d+/)?.[0] || 0) : null;

  // split comma-separated or pipe-separated lists into array
  const splitList = (str, sep) => str ? str.split(sep).map(s => s.trim()).filter(Boolean) : [];

  const skills = data ? splitList(data.SKILLS_FOUND, ',') : [];
  const missing = data ? splitList(data.MISSING_SKILLS, ',') : [];
  const jobs = data ? splitList(data.JOB_RECOMMENDATIONS, '|') : [];
  const improvements = data ? splitList(data.IMPROVEMENT_SUGGESTIONS, '|') : [];

  // fallback: if structured parsing found nothing useful, show raw text
  const isStructured = data && (score !== null || skills.length || missing.length || jobs.length || improvements.length);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-600">ResumeAI</h1>
          <p className="text-gray-500 mt-2">Your AI-Powered Resume Analysis</p>
        </div>

        {!analysis ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <p className="text-gray-500">No analysis found. Please upload your resume first.</p>
          </div>
        ) : !isStructured ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 whitespace-pre-wrap text-gray-700 leading-relaxed">
            {analysis}
          </div>
        ) : (
          <>
            {/* ATS Score Gauge */}
            {score !== null && (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 text-center">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">🎯 ATS Compatibility Score</h2>
                <div className="relative w-40 h-40 mx-auto">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                    <circle
                      cx="50" cy="50" r="42" fill="none"
                      stroke={score >= 70 ? '#22c55e' : score >= 40 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="10"
                      strokeDasharray={`${(score / 100) * 264} 264`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-gray-800">{score}</span>
                    <span className="text-sm text-gray-500">out of 100</span>
                  </div>
                </div>
                {data.ATS_REASON && (
                  <p className="mt-4 text-gray-600 text-left leading-relaxed">{data.ATS_REASON}</p>
                )}
              </div>
            )}

            {/* Skills Found */}
            {skills.length > 0 && (
              <div className="rounded-2xl shadow-md p-6 mb-5 border border-green-200 bg-green-50">
                <h3 className="text-lg font-bold mb-3 text-green-700">✅ Skills Found</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Missing Skills */}
            {missing.length > 0 && (
              <div className="rounded-2xl shadow-md p-6 mb-5 border border-red-200 bg-red-50">
                <h3 className="text-lg font-bold mb-3 text-red-700">⚠️ Missing Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {missing.map((s, i) => (
                    <span key={i} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Job Recommendations */}
            {jobs.length > 0 && (
              <div className="rounded-2xl shadow-md p-6 mb-5 border border-blue-200 bg-blue-50">
                <h3 className="text-lg font-bold mb-3 text-blue-700">💼 Job Recommendations</h3>
                <ul className="space-y-3">
                  {jobs.map((job, i) => {
                    const [title, ...rest] = job.split(':');
                    return (
                      <li key={i} className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-blue-800">{title.trim()}</span>
                        {rest.length > 0 && <>: {rest.join(':').trim()}</>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* Improvement Suggestions */}
            {improvements.length > 0 && (
              <div className="rounded-2xl shadow-md p-6 mb-5 border border-orange-200 bg-orange-50">
                <h3 className="text-lg font-bold mb-3 text-orange-700">🚀 Improvement Suggestions</h3>
                <ul className="space-y-2 list-disc list-inside">
                  {improvements.map((imp, i) => (
                    <li key={i} className="text-gray-700 leading-relaxed">{imp}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div className="text-center mt-6">
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