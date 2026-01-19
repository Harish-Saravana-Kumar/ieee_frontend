import React, { useState } from 'react';
import { Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const PlagiarismChecker = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const getScoreColor = (score) => {
    if (score >= 85) return '#28a745';
    if (score >= 70) return '#17a2b8';
    if (score >= 50) return '#ffc107';
    return '#dc3545';
  };

  const getStatusColor = (variant) => {
    switch(variant) {
      case 'success': return '#28a745, #20c997';
      case 'info': return '#17a2b8, #00bcd4';
      case 'warning': return '#ffc107, #ffb81c';
      case 'danger': return '#dc3545, #c82333';
      default: return '#6c757d, #5a6268';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.name.endsWith('.docx')) {
        setSelectedFile(file);
        setError(null);
        setResult(null);
      } else {
        setSelectedFile(null);
        setError('Please select a .docx file');
      }
    }
  };

  const handleCheckPlagiarism = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    setChecking(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post(`${API_BASE_URL}/check-plagiarism/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setResult(response.data);
    } catch (err) {
      console.error('Error checking plagiarism:', err);
      setError(err.response?.data?.detail || err.message || 'Failed to check plagiarism');
    } finally {
      setChecking(false);
    }
  };

  const renderResult = () => {
    if (!result) return null;

    // Handle different response formats
    if (typeof result === 'string') {
      return (
        <Alert variant="info">
          <div className="plagiarism-result">{result}</div>
        </Alert>
      );
    }

    if (result.message) {
      return (
        <Alert variant="info">
          <Alert.Heading>Plagiarism Check Result</Alert.Heading>
          <div className="plagiarism-result">{result.message}</div>
        </Alert>
      );
    }

    // Handle structured result from backend
    const overallStatus = result.overall_status || 'UNKNOWN';
    
    // Determine variant based on status
    const getStatusVariant = (status) => {
      switch(status) {
        case 'EXCELLENT': return 'success';
        case 'GOOD': return 'info';
        case 'NEEDS_IMPROVEMENT': return 'warning';
        case 'POOR': return 'danger';
        default: return 'secondary';
      }
    };
    
    const statusVariant = getStatusVariant(overallStatus);

    return (
      <Card className="mt-4 border-0 shadow-lg">
        <Card.Header style={{ background: `linear-gradient(135deg, ${getStatusColor(statusVariant)})`, color: 'white', padding: '20px' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h4 className="mb-1">📊 Document Quality Analysis Report</h4>
              <small style={{ opacity: 0.9 }}>Comprehensive quality assessment</small>
            </div>
            {result.quality_score !== undefined && (
              <div className="text-center bg-white text-dark rounded p-3" style={{ minWidth: '120px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getScoreColor(result.quality_score) }}>
                  {result.quality_score}
                </div>
                <small style={{ color: '#666' }}>Quality Score</small>
              </div>
            )}
          </div>
        </Card.Header>
        <Card.Body style={{ padding: '30px', background: '#fafbfc' }}>
          {/* Overall Assessment */}
          <Alert variant={statusVariant} className="mb-4 border-0 shadow-sm">
            <Alert.Heading>
              {overallStatus === 'EXCELLENT' && '✓ '}
              {overallStatus === 'GOOD' && '✓ '}
              {overallStatus === 'NEEDS_IMPROVEMENT' && '⚠ '}
              {overallStatus === 'POOR' && '✗ '}
              Quality Assessment: {overallStatus.replace('_', ' ')}
            </Alert.Heading>
            <p className="mb-0 fs-5">{result.status_message}</p>
          </Alert>

          {/* Key Statistics */}
          <Card className="mb-3 border-0 shadow-sm">
            <Card.Header style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', borderBottom: '2px solid var(--ieee-blue)' }}>
              <strong style={{ color: 'var(--ieee-blue)' }}>📈 Document Statistics</strong>
            </Card.Header>
            <Card.Body style={{ background: 'white' }}>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted text-uppercase d-block">Word Count</small>
                    <div className="fs-4 fw-bold" style={{ color: 'var(--ieee-blue)' }}>
                      {result.word_count?.toLocaleString() || 0}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted text-uppercase d-block">Sentences</small>
                    <div className="fs-4 fw-bold" style={{ color: 'var(--ieee-blue)' }}>
                      {result.total_sentences || 0}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted text-uppercase d-block">Avg Words/Sentence</small>
                    <div className="fs-4 fw-bold" style={{ color: 'var(--ieee-blue)' }}>
                      {result.total_sentences > 0 ? Math.round(result.word_count / result.total_sentences) : 0}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted text-uppercase d-block">Citations Found</small>
                    <div className="fs-4 fw-bold" style={{ color: 'var(--ieee-accent)' }}>
                      {result.statistics?.unique_citations || 0}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted text-uppercase d-block">Valid Citations</small>
                    <div className="fs-4 fw-bold" style={{ color: result.statistics?.citation_issues > 0 ? '#dc3545' : '#28a745' }}>
                      {result.statistics?.valid_citations || 0}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="p-3 bg-light rounded">
                    <small className="text-muted text-uppercase d-block">Citation Issues</small>
                    <div className="fs-4 fw-bold" style={{ color: result.statistics?.citation_issues > 0 ? '#ffc107' : '#28a745' }}>
                      {result.statistics?.citation_issues || 0}
                    </div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Insights Section */}
          {result.insights && result.insights.length > 0 && (
            <Card className="mb-3 border-0 shadow-sm">
              <Card.Header style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', borderBottom: '2px solid var(--ieee-blue)' }}>
                <strong style={{ color: 'var(--ieee-blue)' }}>💡 Insights & Recommendations</strong>
              </Card.Header>
              <Card.Body style={{ background: 'white' }}>
                <ul className="mb-0" style={{ lineHeight: '2' }}>
                  {result.insights.map((insight, idx) => {
                    const isPositive = insight.startsWith('✓');
                    const isWarning = insight.startsWith('⚠');
                    const isNegative = insight.startsWith('✗');
                    
                    return (
                      <li 
                        key={idx} 
                        className={
                          isPositive ? 'text-success' : 
                          isWarning ? 'text-warning' : 
                          isNegative ? 'text-danger' : ''
                        }
                        style={{ marginBottom: '12px', fontSize: '1.05rem' }}
                      >
                        <strong>{insight}</strong>
                      </li>
                    );
                  })}
                </ul>
              </Card.Body>
            </Card>
          )}

          {/* Citation Validation */}
          {result.citation_validation && Object.keys(result.citation_validation).length > 0 && (
            <Card className="mb-3 border-0 shadow-sm">
              <Card.Header style={{ background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)', borderBottom: '2px solid var(--ieee-blue)' }}>
                <strong style={{ color: 'var(--ieee-blue)' }}>📎 Citation Validation Details</strong>
              </Card.Header>
              <Card.Body style={{ background: 'white' }}>
                <div className="row g-2">
                  {Object.entries(result.citation_validation).map(([citation, isValid], idx) => (
                    <div key={idx} className="col-md-6">
                      <div className={`p-3 rounded ${isValid ? 'bg-success bg-opacity-10 border border-success' : 'bg-danger bg-opacity-10 border border-danger'}`}>
                        <span className={isValid ? 'text-success' : 'text-danger'}>
                          <strong style={{ fontSize: '1.1rem' }}>{citation}</strong>
                          <div style={{ fontSize: '0.9rem', marginTop: '4px' }}>
                            {isValid ? '✓ Valid - Reference found' : '✗ Invalid - Missing reference'}
                          </div>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>
          )}

          {/* Success Message */}
          {result.quality_score >= 85 && (
            <Alert variant="success" className="text-center border-0 shadow-sm">
              <h5 className="mb-0">🎉 Outstanding! Your document meets excellent quality standards.</h5>
            </Alert>
          )}
        </Card.Body>
      </Card>
    );
  };

  return (
    <div>
      <Card className="shadow-lg border-0">
        <Card.Header style={{ background: 'linear-gradient(135deg, var(--ieee-blue), var(--ieee-accent))', color: 'white', padding: '20px' }}>
          <h3 className="mb-2">� Document Quality Checker</h3>
          <p className="mb-0" style={{ opacity: 0.9 }}>Analyze academic document quality and compliance</p>
        </Card.Header>
        <Card.Body style={{ padding: '30px' }}>
          <Alert variant="info" className="border-0 shadow-sm">
            <div className="d-flex align-items-start">
              <i className="bi bi-info-circle me-3" style={{ fontSize: '24px' }}></i>
              <div>
                <strong>Comprehensive Document Analysis</strong>
                <p className="mb-0 mt-2">
                  Upload a .docx file to receive detailed analysis including citation validation, 
                  readability metrics, vocabulary assessment, and structural completeness.
                </p>
              </div>
            </div>
          </Alert>

          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Select Document (.docx)</Form.Label>
            <Form.Control
              type="file"
              accept=".docx"
              onChange={handleFileChange}
              style={{ 
                padding: '12px',
                borderRadius: '8px',
                border: '2px dashed var(--ieee-blue)',
                background: '#f8f9fa'
              }}
            />
            {selectedFile && (
              <Form.Text className="text-success d-flex align-items-center mt-2">
                <i className="bi bi-check-circle me-2"></i>
                <strong>Selected: {selectedFile.name}</strong>
              </Form.Text>
            )}
          </Form.Group>

          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)} className="border-0 shadow-sm">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </Alert>
          )}

          <Button
            variant="primary"
            onClick={handleCheckPlagiarism}
            disabled={!selectedFile || checking}
            size="lg"
            style={{
              background: 'linear-gradient(135deg, var(--ieee-blue), var(--ieee-accent))',
              border: 'none',
              padding: '12px 40px',
              borderRadius: '8px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(0, 51, 102, 0.3)'
            }}
          >
            {checking ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Analyzing Document...
              </>
            ) : (
              <>
                <i className="bi bi-search me-2"></i>
                Analyze Quality
              </>
            )}
          </Button>

          {renderResult()}
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlagiarismChecker;
