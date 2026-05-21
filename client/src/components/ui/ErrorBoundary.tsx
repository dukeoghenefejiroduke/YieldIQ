import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-nature-bg">
          <div className="glass-card p-10 max-w-lg w-full text-center flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4">
              <AlertTriangle className="w-12 h-12" />
            </div>
            
            <div>
              <h1 className="text-3xl font-bold mb-3 text-red-600">Something went wrong</h1>
              <p className="text-secondary text-lg">
                The field journal encountered an unexpected error. Don't worry, your observations are safe.
              </p>
            </div>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-forest-mid text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-forest-deep transition-all shadow-lg"
              >
                <RefreshCw className="w-5 h-5" />
                Retry
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 bg-white border border-glass-border text-forest-deep py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
              >
                <Home className="w-5 h-5" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
