// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// API Endpoints
export const API_ENDPOINTS = {
  GENERATE_PAPER: '/generate',
  UPLOAD_IMAGE: '/upload-image',
  CHECK_PLAGIARISM: '/check-plagiarism/'
};

// Export full endpoint URLs
export const getEndpointUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;
