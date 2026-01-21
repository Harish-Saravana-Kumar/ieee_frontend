import React, { useState } from 'react';
import { Button, Alert, Card, Spinner, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const Step4_Generate = ({ paperData, onPrevious }) => {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate data
      if (!paperData.title || !paperData.abstract) {
        throw new Error('Title and Abstract are required');
      }

      // Send request to backend
      const response = await axios.post(`${API_BASE_URL}/generate`, paperData, {
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ieee_paper.docx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setSuccess(true);
    } catch (err) {
      console.error('Error generating paper:', err);
      setError(err.response?.data?.detail || err.message || 'Failed to generate paper');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div>
      <div className="mb-4 pb-3 border-bottom">
        <h4 className="mb-2" style={{ color: 'var(--ieee-blue)' }}>✨ Review & Generate</h4>
        <p className="text-muted mb-0">Review your paper details and generate the IEEE-formatted document</p>
      </div>

      <Card className="mb-3 summary-section border-0 shadow-sm">
        <Card.Header style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', borderBottom: '2px solid var(--ieee-blue)' }}>
          <strong style={{ color: 'var(--ieee-blue)' }}>📋 Paper Summary</strong>
        </Card.Header>
        <Card.Body style={{ background: '#fafbfc' }}>
          <Row>
            <Col md={6}>
              <div className="mb-3 p-3 bg-white rounded shadow-sm">
                <small className="text-muted text-uppercase">Title</small>
                <div className="fw-bold">{paperData.title || <span className="text-muted">Not set</span>}</div>
              </div>
              <div className="mb-3 p-3 bg-white rounded shadow-sm">
                <small className="text-muted text-uppercase">Authors</small>
                <div>{paperData.authors.filter(a => a.trim()).join(', ') || <span className="text-muted">None</span>}</div>
              </div>
              <div className="mb-3 p-3 bg-white rounded shadow-sm">
                <small className="text-muted text-uppercase">Affiliations</small>
                <div>{paperData.affiliations.filter(a => a.trim()).join(', ') || <span className="text-muted">None</span>}</div>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-3 p-3 bg-white rounded shadow-sm">
                <small className="text-muted text-uppercase">Keywords</small>
                <div>{paperData.keywords.filter(k => k.trim()).join(', ') || <span className="text-muted">None</span>}</div>
              </div>
              <div className="mb-3 p-3 bg-white rounded shadow-sm">
                <small className="text-muted text-uppercase">Sections</small>
                <div className="fw-bold" style={{ color: 'var(--ieee-blue)' }}>{paperData.sections.length} section(s)</div>
                {paperData.sections.length > 0 && (
                  <ul className="mb-0 mt-2" style={{ fontSize: '0.9rem' }}>
                    {paperData.sections.map((section, idx) => (
                      <li key={idx}>
                        {section.heading || `Section ${idx + 1}`}
                        {section.subsections.length > 0 && <small className="text-muted"> ({section.subsections.length} subsections)</small>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="p-3 bg-white rounded shadow-sm">
                <Row>
                  <Col xs={6}>
                    <small className="text-muted text-uppercase">References</small>
                    <div className="fw-bold" style={{ color: 'var(--ieee-accent)' }}>{paperData.references.filter(r => r.trim()).length}</div>
                  </Col>
                  <Col xs={6}>
                    <small className="text-muted text-uppercase">Appendix</small>
                    <div className="fw-bold" style={{ color: 'var(--ieee-accent)' }}>{paperData.appendix.filter(a => a.trim()).length}</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)} className="border-0 shadow-sm">
          <Alert.Heading><i className="bi bi-x-circle me-2"></i>Error</Alert.Heading>
          {error}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="border-0 shadow-sm">
          <Alert.Heading><i className="bi bi-check-circle me-2"></i>Success!</Alert.Heading>
          Your IEEE paper has been generated and downloaded successfully.
        </Alert>
      )}

      <Alert variant="info" className="border-0 shadow-sm">
        <i className="bi bi-info-circle me-2"></i>
        <strong>Note:</strong> Make sure your backend server is running on {API_BASE_URL}
      </Alert>

      <div className="wizard-navigation d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
        <Button 
          variant="secondary" 
          onClick={onPrevious} 
          disabled={generating}
          size="lg"
          style={{
            borderRadius: '8px',
            padding: '12px 40px',
            fontWeight: 'bold'
          }}
        >
          ← Previous
        </Button>
        <Button 
          variant="success" 
          size="lg"
          onClick={handleGenerate}
          disabled={generating}
          style={{
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 50px',
            fontWeight: 'bold',
            boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)'
          }}
        >
          {generating ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Generating Document...
            </>
          ) : (
            <>
              <i className="bi bi-download me-2"></i>
              Generate IEEE Paper (.docx)
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Step4_Generate;
