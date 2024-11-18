import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Admin } from './pages/Admin';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { useStore } from './store';

export function App() {
  const currentUser = useStore((state) => state.currentUser);
  const type = localStorage.getItem('type');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin" element={<Admin />} />

          <Route
            path="/worker-dashboard"
            element={<WorkerDashboard />
             
            }
          />

          <Route
            path="/customer-dashboard"
            element={<CustomerDashboard />}
          />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
