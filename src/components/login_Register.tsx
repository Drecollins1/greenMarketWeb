import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AuthPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('login');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState('');
  const [loginData, setLoginData] = useState({ email: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    phone: '',
    acceptTerms: true
  });

  // Set active tab based on current route
  useEffect(() => {
    if (router.pathname === '/register') {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
  }, [router.pathname]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ email: e.target.value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterData({
      ...registerData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Login with:', loginData);
    setShowOtpModal(true);
  };

  const handleOtpSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('OTP submitted:', otp);
    setShowOtpModal(false);
  };

  const handleResendOtp = () => {
    console.log('Resending OTP...');
  };

  const handleRegister = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('Register with:', registerData);
    // Handle registration logic here
  };

  const switchToLogin = () => {
    router.push('/login');
  };

  const switchToRegister = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Tabs */}
        <div className="flex justify-center mb-8 border-b border-gray-200">
          <button
            onClick={switchToLogin}
            className={`px-8 py-3 text-lg font-semibold transition-colors ${
              activeTab === 'login'
                ? 'text-gray-900 border-b-2 border-green-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Login
          </button>
          <button
            onClick={switchToRegister}
            className={`px-8 py-3 text-lg font-semibold transition-colors ${
              activeTab === 'register'
                ? 'text-gray-900 border-b-2 border-green-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Register
          </button>
        </div>

        {/* Login Form */}
        {activeTab === 'login' && (
          <div className="space-y-6 animate-fadeIn">
            <p className="text-center text-gray-600 mb-6">
              Enter your email to login to your account
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
            >
              Login
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  onClick={switchToRegister}
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  Register here
                </button>
              </p>
            </div>
          </div>
        )}

        {/* Register Form */}
        {activeTab === 'register' && (
          <div className="space-y-6 animate-fadeIn">
            <p className="text-center text-gray-600 mb-6">
              There are many advantages to creating an account: the payment process is faster, Use of Escrow and much more.
            </p>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={registerData.phone}
                onChange={handleRegisterChange}
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={registerData.acceptTerms}
                  onChange={handleRegisterChange}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                />
              </div>
              <label className="ml-3 text-sm text-gray-600">
                By tapping "Sign Up" you accept our{' '}
                <Link href="/terms" className="text-green-600 font-semibold hover:text-green-700">
                  terms
                </Link>{' '}
                and{' '}
                <Link href="/conditions" className="text-green-600 font-semibold hover:text-green-700">
                  condition
                </Link>
              </label>
            </div>

            <button
              onClick={handleRegister}
              disabled={!registerData.acceptTerms}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Register
            </button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <button
                  onClick={switchToLogin}
                  className="text-green-600 font-semibold hover:text-green-700"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center px-4 z-50 bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Log In Your Account
            </h2>

            <div className="space-y-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                  maxLength={6}
                />
              </div>

              <div className="flex justify-between items-center text-sm">
                <button
                  onClick={() => setShowOtpModal(false)}
                  className="text-gray-700 cursor-pointer hover:text-gray-900 font-medium"
                >
                  Go back to login
                </button>
                <button
                  onClick={handleResendOtp}
                  className="text-green-600 cursor-pointer hover:text-green-700 font-semibold"
                >
                  Resend Otp
                </button>
              </div>

              <button
                onClick={handleOtpSubmit}
                className="w-full cursor-pointer bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
              >
                Log In
              </button>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm cursor-pointer text-gray-600">
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setShowOtpModal(false);
                      switchToRegister();
                    }}
                    className="text-green-600 cursor-pointer font-semibold hover:text-green-700"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}