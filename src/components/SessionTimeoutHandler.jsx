import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { getTokenExpirationTime, logoutUser } from '../utils/authUtils';

/**
 * Session Timeout Handler - Shows warning and logs out user
 */
function SessionTimeoutHandler() {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const checkSessionTimeout = () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const timeLeft = getTokenExpirationTime(token);
      const warningTime = 5 * 60 * 1000; // 5 minutes warning

      if (timeLeft <= warningTime && timeLeft > 0) {
        setShowWarning(true);
        setTimeRemaining(Math.ceil(timeLeft / 1000));
      } else if (timeLeft <= 0) {
        logoutUser();
      }
    };

    const interval = setInterval(() => {
      checkSessionTimeout();
      
      // Update countdown timer
      setTimeRemaining((prev) => {
        if (prev && prev > 0) {
          return prev - 1;
        }
        return prev;
      });
    }, 1000);

    // Initial check
    checkSessionTimeout();

    return () => clearInterval(interval);
  }, []);

  if (!showWarning) return null;

  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  return (
    <Alert
      variant="warning"
      className="session-timeout-alert"
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        maxWidth: 400,
        zIndex: 9999,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        animation: 'slideInUp 0.3s ease-out',
      }}
    >
      <Alert.Heading>Session Timeout Warning</Alert.Heading>
      <p className="mb-3">
        Your session will expire in <strong>{minutes}:{seconds.toString().padStart(2, '0')}</strong> minutes.
      </p>
      <div className="d-flex gap-2">
        <Button
          variant="warning"
          size="sm"
          onClick={() => {
            // Refresh token by making a verify request
            const token = localStorage.getItem('token');
            if (token) {
              fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/auth/verify`, {
                headers: { Authorization: `Bearer ${token}` },
              })
                .then((res) => {
                  if (res.ok) {
                    setShowWarning(false);
                  }
                })
                .catch(() => logoutUser());
            }
          }}
        >
          Keep Session Active
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={logoutUser}
        >
          Logout Now
        </Button>
      </div>
    </Alert>
  );
}

export default SessionTimeoutHandler;
