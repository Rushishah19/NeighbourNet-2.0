import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store';
import api from '../api/api.js';

export function Login() {
  const [userType, setUserType] = useState<'worker' | 'customer'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser, users } = useStore();



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
   

    try {
      const response = await api.post('/users/login',{
        email: email,
        password:password,
        type: userType
      });

      console.log(response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('type', response.data.type);
    
    } catch (error) {
      setError('Invalid email or user type');
      return;
      
    }
    navigate(`/${userType}-dashboard`);
  };

  useEffect(() => {
    const type = localStorage.getItem('type');
    if (localStorage.getItem('token')) {
      navigate(`/${type}-dashboard`);
      // refresh the page
      
    }
  }
  , []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg ${
              userType === 'customer'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setUserType('customer')}
          >
            Customer
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              userType === 'worker'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700'
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
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-red-500"
            />
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
        </form>
      </div>
    </div>
  );
}