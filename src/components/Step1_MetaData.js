import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const Step1_MetaData = ({ paperData, updatePaperData, onNext }) => {
  const handleArrayChange = (field, index, value) => {
    const newArray = [...paperData[field]];
    newArray[index] = value;
    updatePaperData(field, newArray);
  };

  const addArrayItem = (field) => {
    updatePaperData(field, [...paperData[field], '']);
  };

  const removeArrayItem = (field, index) => {
    const newArray = paperData[field].filter((_, i) => i !== index);
    updatePaperData(field, newArray);
  };

  const isValid = () => {
    return (
      paperData.title.trim() !== '' &&
      paperData.authors.some(a => a.trim() !== '') &&
      paperData.abstract.trim() !== ''
    );
  };

  return (
    <div>
      <div className="mb-4 pb-3 border-bottom">
        <h4 className="mb-2" style={{ color: 'var(--ieee-blue)' }}>📄 Paper Metadata</h4>
        <p className="text-muted mb-0">Enter the basic information about your research paper</p>
      </div>
      
      <Form.Group className="mb-3">
        <Form.Label>Title *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter paper title"
          value={paperData.title}
          onChange={(e) => updatePaperData('title', e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Authors *</Form.Label>
        {paperData.authors.map((author, index) => (
          <div key={index} className="form-array-item">
            <Form.Control
              type="text"
              placeholder="Author name"
              value={author}
              onChange={(e) => handleArrayChange('authors', index, e.target.value)}
            />
            {paperData.authors.length > 1 && (
              <Button
                variant="danger"
                size="sm"
                className="remove-button"
                onClick={() => removeArrayItem('authors', index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="secondary"
          size="sm"
          className="add-button"
          onClick={() => addArrayItem('authors')}
        >
          + Add Author
        </Button>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Affiliations</Form.Label>
        {paperData.affiliations.map((affiliation, index) => (
          <div key={index} className="form-array-item">
            <Form.Control
              type="text"
              placeholder="Institution/Organization"
              value={affiliation}
              onChange={(e) => handleArrayChange('affiliations', index, e.target.value)}
            />
            {paperData.affiliations.length > 1 && (
              <Button
                variant="danger"
                size="sm"
                className="remove-button"
                onClick={() => removeArrayItem('affiliations', index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="secondary"
          size="sm"
          className="add-button"
          onClick={() => addArrayItem('affiliations')}
        >
          + Add Affiliation
        </Button>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email Addresses</Form.Label>
        {paperData.emails.map((email, index) => (
          <div key={index} className="form-array-item">
            <Form.Control
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => handleArrayChange('emails', index, e.target.value)}
            />
            {paperData.emails.length > 1 && (
              <Button
                variant="danger"
                size="sm"
                className="remove-button"
                onClick={() => removeArrayItem('emails', index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="secondary"
          size="sm"
          className="add-button"
          onClick={() => addArrayItem('emails')}
        >
          + Add Email
        </Button>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Abstract *</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Enter abstract"
          value={paperData.abstract}
          onChange={(e) => updatePaperData('abstract', e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Keywords</Form.Label>
        {paperData.keywords.map((keyword, index) => (
          <div key={index} className="form-array-item">
            <Form.Control
              type="text"
              placeholder="Keyword"
              value={keyword}
              onChange={(e) => handleArrayChange('keywords', index, e.target.value)}
            />
            {paperData.keywords.length > 1 && (
              <Button
                variant="danger"
                size="sm"
                className="remove-button"
                onClick={() => removeArrayItem('keywords', index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}
        <Button
          variant="secondary"
          size="sm"
          className="add-button"
          onClick={() => addArrayItem('keywords')}
        >
          + Add Keyword
        </Button>
      </Form.Group>

      <div className="wizard-navigation d-flex justify-content-end mt-4 pt-3 border-top">
        <Button
          variant="primary"
          onClick={onNext}
          disabled={!isValid()}
          size="lg"
          style={{ 
            background: 'linear-gradient(135deg, var(--ieee-blue), var(--ieee-accent))', 
            border: 'none',
            padding: '12px 40px',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}
        >
          Next Step →
        </Button>
      </div>
    </div>
  );
};

export default Step1_MetaData;
