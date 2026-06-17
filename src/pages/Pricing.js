import React from 'react';

function Pricing() {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-indigo-600">ResumeAI</h1>
          <p className="text-gray-500 mt-2">Choose the plan that's right for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-700">Free</h2>
              <div className="mt-4">
                <span className="text-5xl font-bold text-gray-800">₹0</span>
                <span className="text-gray-500">/month</span>
              </div>
              <p className="text-gray-500 mt-2">Perfect for getting started</p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                '3 resume analyses per month',
                'ATS Score check',
                'Basic skill recommendations',
                'Job role suggestions',
                'Email support',
              ].map((feature, i) => (
                <li key={i} className="flex items-center text-gray-600">
                  <span className="text-green-500 mr-3">✓</span>
                  {feature}
                </li>
              ))}
              {[
                'Unlimited analyses',
                'Priority support',
                'Detailed improvement report',
              ].map((feature, i) => (
                <li key={i} className="flex items-center text-gray-400">
                  <span className="text-gray-300 mr-3">✗</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 rounded-lg font-semibold border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition duration-200"
              onClick={() => window.location.href = '/upload'}
            >
              {user.plan === 'free' ? 'Current Plan' : 'Get Started'}
            </button>
          </div>

          {/* Premium Plan */}
          <div className="bg-indigo-600 rounded-2xl shadow-xl p-8 border-2 border-indigo-600 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-yellow-400 text-yellow-900 text-sm font-bold px-4 py-1 rounded-full">
                ⭐ MOST POPULAR
              </span>
            </div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white">Premium</h2>
              <div className="mt-4">
                <span className="text-5xl font-bold text-white">₹99</span>
                <span className="text-indigo-200">/month</span>
              </div>
              <p className="text-indigo-200 mt-2">For serious job seekers</p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                'Unlimited resume analyses',
                'ATS Score check',
                'Advanced skill recommendations',
                'Job role suggestions',
                'Detailed improvement report',
                'Priority support',
                'Career path guidance',
              ].map((feature, i) => (
                <li key={i} className="flex items-center text-white">
                  <span className="text-yellow-400 mr-3">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className="w-full py-3 rounded-lg font-semibold bg-white text-indigo-600 hover:bg-indigo-50 transition duration-200"
              onClick={() => alert('Payment integration coming soon! Contact us to upgrade.')}
            >
              Upgrade to Premium
            </button>
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => window.location.href = '/upload'}
            className="text-indigo-600 hover:underline font-medium"
          >
            ← Back to Resume Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pricing;