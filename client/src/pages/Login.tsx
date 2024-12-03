import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import api from '../api/api';

export function Login() {
  const [userType, setUserType] = useState<'worker' | 'customer'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate();

  // Handle login submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/users/login', {
        email,
        password,
        type: userType,
      });

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('type', response.data.type);
      navigate(`/${userType}-dashboard`);
      window.location.reload();
    } catch (error) {
      setError('Invalid email, password, or user type.');
    }
  };

  // Handle password reset email submission
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMessage('');

    try {
      const response = await api.post('/users/reset-password', { email: resetEmail });
      setResetMessage(response.data.message || 'Password reset email sent successfully.');
    } catch (error) {
      setResetMessage('Error sending password reset email.');
    }
  };

  // Redirect user if already logged in
  useEffect(() => {
    const type = localStorage.getItem('type');
    if (localStorage.getItem('token')) {
      navigate(`/${type}-dashboard`);
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Left Section (Image Background) */}
      <div
        className="w-8/12 bg-cover bg-center"
        style={{ backgroundImage: "url('https://cdn.pixabay.com/photo/2021/05/15/05/35/park-6254937_1280.jpg')" }}
      ></div>

      {/* Right Section (Form Area) */}
      <div className="w-4/12 flex items-start justify-center bg-gray-200 pt-20">
        <div className="w-full max-w-md bg-gray-200 rounded-xl p-8">
          {/* Login Form */}
          {!resetPassword ? (
            <>
              <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

              <div className="flex justify-center space-x-4 mb-6">
                <button
                  className={`px-4 py-2 rounded-lg ${
                    userType === 'customer' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setUserType('customer')}
                >
                  Customer
                </button>
                <button
                  className={`px-4 py-2 rounded-lg ${
                    userType === 'worker' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setUserType('worker')}
                >
                  Worker
                </button>
              </div>

              {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-gray-500 focus:outline-none"
                    >
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Login
                </button>

                <p className="text-center text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-blue-600 hover:underline">
                    Sign up
                  </Link>
                </p>

                <p className="text-center text-gray-600">
                  Forgot your password?{' '}
                  <button
                    type="button"
                    onClick={() => setResetPassword(true)}
                    className="text-blue-600 hover:underline"
                  >
                    Reset password
                  </button>
                </p>
              </form>
            </>
          ) : (
            // Reset Password Form
            <>
              <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Send Reset Email
                </button>
                {resetMessage && (
                  <p className={`text-center mt-4 ${resetMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
                    {resetMessage}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setResetPassword(false)}
                  className="text-blue-600 hover:underline text-center block w-full mt-4"
                >
                  Back to Login
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}