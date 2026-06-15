import React, { useEffect, useState } from 'react';

function Results() {
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('analysis');
    if (data) setAnalysis(data);
  }, []);

  // Remove ** markdown and return clean text
  const clean = (text) => text.replace(/\*\*/g, '').trim();

  // Split analysis into sections based on numbered headings like "1. ATS Score" or "**1. ATS Score**"
  const parseSections = (text) => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    const sections = [];
    let current = null;

    lines.forEach(line => {
      const headingMatch = line.match(/^\*{0,2}(\d+)\.\s*\*{0,2}(.+?)\*{0,2}:?\*{0,2}$/);
      if (headingMatch && headingMatch[2].length < 60) {
        current = { title: clean(headingMatch[2]), items: [] };
        sections.push(current);
      } else if (current) {
        current.items.push(clean(line.replace(/^[-•]\s*/, '')));
      } else {
        // text before first heading
        if (!sections.length) sections.push({ title: '', items: [] });
        sections[0].items.push(clean(line.replace(/^[-•]\s*/, '')));
      }
    });

    return sections;
  };

  const sections = analysis ? parseSections(analysis) : [];

  // Try to extract ATS score number from text
  let score = null;
  const patterns = [
  /out of 100\)?:?\s*(\d{1,3})/i,             // "out of 100): 72"
  /(\d{1,3})\s*(?:\/|out of)\s*100/i,         // "72 out of 100" or "72/100"
  /score[^\d]{0,20}(\d{1,3})/i                // fallback
];
for (const p of patterns) {
  const m = analysis.match(p);
  if (m) { score = parseInt(m[1]); break; }
}

  const sectionStyles = (title) => {
    const t = title.toLowerCase();
    if (t.includes('ats') || t.includes('score')) return { color: 'text-purple-700', bg: 'bg-purple-50', border: 'border-purple-200', icon: '🎯' };
    if (t.includes('skills found') || t.includes('strengths')) return { color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200', icon: '✅' };
    if (t.includes('missing')) return { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: '⚠️' };
    if (t.includes('job') || t.includes('recommend')) return { color: 'text-blue-700', bg: 'bg-blue-50', border: 'border-blue-200', icon: '💼' };
    if (t.includes('improve') || t.includes('suggestion')) return { color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', icon: '🚀' };
    return { color: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-200', icon: '📌' };
  };

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
        ) : (
          <>
            {/* ATS Score Card */}
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
                <p className="mt-4 text-gray-500">
                  {score >= 70 ? 'Great! Your resume is ATS-friendly.' : score >= 40 ? 'Decent, but there is room for improvement.' : 'Needs work to pass ATS filters.'}
                </p>
              </div>
            )}

            {/* Other Sections */}
            {sections.map((section, idx) => {
              if (!section.title && !section.items.length) return null;
              if (section.title.toLowerCase().includes('ats') || section.title.toLowerCase().includes('score')) {
                // skip duplicating ATS score section text, already shown above
              }
              const style = sectionStyles(section.title);
              return (
                <div key={idx} className={`rounded-2xl shadow-md p-6 mb-5 border ${style.border} ${style.bg}`}>
                  {section.title && (
                    <h3 className={`text-lg font-bold mb-3 ${style.color}`}>
                      {style.icon} {section.title}
                    </h3>
                  )}
                  <ul className="space-y-2">
                    {section.items.map((item, i) => (
                      <li key={i} className="text-gray-700 leading-relaxed pl-1">
                        <span className={`font-semibold ${style.color}`}>• </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
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