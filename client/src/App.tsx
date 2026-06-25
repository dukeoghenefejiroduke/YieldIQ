import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { useAuth } from './hooks/useAuth';
import { Loader2 } from 'lucide-react';
import './App.css';

function AppShell() {
  const { verifySession, isInitializing } = useAuth();

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
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
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
