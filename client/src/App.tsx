import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { CreateFarmerProfile } from './pages/CreateFarmerProfile';
import { CreateTransaction } from './pages/features/CreateTransaction';
import { WhatsappView } from './pages/features/WhatsappView';
import { UssdView } from './pages/features/UssdView';
import { ReportsView } from './pages/features/ReportsView';
import { ProfileSettings } from './pages/features/ProfileSettings';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { useAuth } from './hooks/useAuth';
import { useAuthStore } from './store/authStore';
import { Loader2 } from 'lucide-react';
import './App.css';

function AppShell() {
  const { verifySession, isInitializing } = useAuth();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    verifySession();
  }, [verifySession]);

  if (isInitializing) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-white/90 z-50">
        <Loader2 className="w-12 h-12 text-forest-mid animate-spin" />
        <p className="text-forest-deep font-medium">Initializing...</p>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Signup />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/create-profile" element={
          <ProtectedRoute>
            <CreateFarmerProfile />
          </ProtectedRoute>
        } />
        <Route path="/log-transaction" element={
          <ProtectedRoute>
            <CreateTransaction />
          </ProtectedRoute>
        } />
        <Route path="/whatsapp" element={
          <ProtectedRoute>
            <WhatsappView />
          </ProtectedRoute>
        } />
        <Route path="/ussd" element={
          <ProtectedRoute>
            <UssdView />
          </ProtectedRoute>
        } />
        <Route path="/reports" element={
          <ProtectedRoute>
            <ReportsView />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <ProfileSettings />
          </ProtectedRoute>
        } />
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
        <Route path="*" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppShell />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
