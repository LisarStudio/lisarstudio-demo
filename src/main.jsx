import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Lisar Studio Demo ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '3rem', color: '#ffffff', background: '#09090e', minHeight: '100vh', fontFamily: 'sans-serif' }}>
          <h2>Ocurrió un inconveniente al cargar la Demo</h2>
          <pre style={{ color: '#f43f5e', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', overflowX: 'auto' }}>
            {this.state.error?.toString()}
          </pre>
          <button onClick={() => window.location.reload()} style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            Recargar Aplicación
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
