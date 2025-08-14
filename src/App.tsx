import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import Home from './components/Home';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isAuthenticated, getSsession } = useAuthStore();

  useEffect(() => {
    getSsession();
  }, []);

  return (
    <Router>
      <div className="font-poppins">
        <Toaster position='bottom-right' />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth"
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />}
          />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;