import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Admin } from './pages/Admin';
import { WorkerDashboard } from './pages/WorkerDashboard';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { ContactUs } from './pages/ContactUs';
import { MapPage } from './pages/MapPage'; // Import MapPage component
import { useStore } from './store';

export function App() {
  const currentUser = useStore((state) => state.currentUser);
  const type = localStorage.getItem('type');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<ContactUs />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Worker Routes */}
          <Route
            path="/worker-dashboard"
            element={
              type === 'worker' ? <WorkerDashboard /> : <Navigate to="/login" replace />
            }
          />

          {/* Customer Routes */}
          <Route
            path="/customer-dashboard"
            element={
              type === 'customer' ? <CustomerDashboard /> : <Navigate to="/login" replace />
            }
          />

          {/* Map Route */}
          <Route path="/map" element={<MapPage />} />

          {/* Default Redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
