import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import './Auth.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('sessionExpired') === 'true') {
      setSessionExpired(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="auth-container">
        {/* Left Section - Welcome */}
        <div className="auth-left-section">
          <div className="auth-left-content">
            <h2 className="auth-left-title">Welcome Back</h2>
            <p className="auth-left-subtitle">
              Access your IEEE paper generation and quality checking tools
            </p>
            <div className="auth-features">
              <div className="auth-feature-item">
                <span className="auth-feature-icon">✓</span>
                <span>Professional Paper Generation</span>
              </div>
            </div>
            
            {/* Quotes Section */}
            <div className="auth-quotes">
              <div className="quote-item active">
                <p className="quote-text">"Create professional IEEE papers in minutes, not hours"</p>
                <p className="quote-author">— Trusted by Users</p>
              </div>
              <div className="quote-item">
                <p className="quote-text">"Perfect formatting, every time. Guaranteed."</p>
                <p className="quote-author">— Academic Visitors</p>
              </div>
              <div className="quote-item">
                <p className="quote-text">"Your research deserves professional presentation with less manual formatting"</p>
                <p className="quote-author">— IEEE Standards</p>
              </div>
            </div>
          </div>
          <div className="paper-animation">📄</div>
        </div>

        {/* Right Section - Form */}
        <div className="auth-right-section">
          <div className="auth-card">
            <div className="card-body">
              <div className="auth-header">
                <h2>Login</h2>
                <p>Sign in to your account</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              {sessionExpired && (
                <Alert variant="warning" onClose={() => setSessionExpired(false)} dismissible>
                  <Alert.Heading>Session Expired</Alert.Heading>
                  Your session has timed out. Please log in again.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Form.Group className="form-group">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 btn-auth"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </Form>

              <div className="auth-footer">
                <p>
                  Don't have an account?{' '}
                  <Link to="/signup" className="auth-link">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
