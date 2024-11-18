import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Users, ShoppingCart, Settings } from 'lucide-react';

export function AdminDashboard() {
  const { currentUser } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.type !== 'admin') {
      navigate('/admin');
    }
  }, [currentUser, navigate]);

  

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Users</h3>
                <p className="text-gray-600">Manage system users</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <ShoppingCart className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Orders</h3>
                <p className="text-gray-600">View all orders</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Settings className="text-purple-600" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Settings</h3>
                <p className="text-gray-600">System configuration</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}