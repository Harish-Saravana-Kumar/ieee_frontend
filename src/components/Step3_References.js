import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const Step3_References = ({ paperData, updatePaperData, onNext, onPrevious }) => {
  const handleReferenceChange = (index, value) => {
    const newReferences = [...paperData.references];
    newReferences[index] = value;
    updatePaperData('references', newReferences);
  };

  const addReference = () => {
    updatePaperData('references', [...paperData.references, '']);
  };

  const removeReference = (index) => {
    const newReferences = paperData.references.filter((_, i) => i !== index);
    updatePaperData('references', newReferences);
  };

  const handleAppendixChange = (index, value) => {
    const newAppendix = [...paperData.appendix];
    newAppendix[index] = value;
    updatePaperData('appendix', newAppendix);
  };

  const addAppendix = () => {
    updatePaperData('appendix', [...paperData.appendix, '']);
  };

  const removeAppendix = (index) => {
    const newAppendix = paperData.appendix.filter((_, i) => i !== index);
    updatePaperData('appendix', newAppendix);
  };

  return (
    <div>
      <div className="mb-4 pb-3 border-bottom">
        <h4 className="mb-2" style={{ color: 'var(--ieee-blue)' }}>📚 References & Appendix</h4>
        <p className="text-muted mb-0">Add citations and supplementary materials</p>
      </div>

      <Form.Group className="mb-4">
        <Form.Label>
          <h5 style={{ color: 'var(--ieee-blue)' }}>References</h5>
        </Form.Label>
        <Alert variant="info" className="border-0 shadow-sm">
          <i className="bi bi-info-circle me-2"></i>
          Enter references in IEEE format. Example:<br />
          <code>[1] J. Smith, "Article Title," Journal Name, vol. 1, no. 2, pp. 100-110, 2023.</code>
        </Alert>
        
        {paperData.references.map((reference, index) => (
          <div key={index} className="form-array-item mb-2">
            <Form.Control
              as="textarea"
              rows={2}
              placeholder={`[${index + 1}] Author, "Title," Journal, vol., no., pp., year.`}
              value={reference}
              onChange={(e) => handleReferenceChange(index, e.target.value)}
            />
            {paperData.references.length > 1 && (
              <Button
                variant="danger"
                size="sm"
                className="remove-button"
                onClick={() => removeReference(index)}
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
          onClick={addReference}
        >
          + Add Reference
        </Button>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>
          <h5 style={{ color: 'var(--ieee-blue)' }}>Appendix (Optional)</h5>
        </Form.Label>
        
        {paperData.appendix.map((appendixItem, index) => (
          <div key={index} className="form-array-item mb-2">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter appendix content"
              value={appendixItem}
              onChange={(e) => handleAppendixChange(index, e.target.value)}
            />
            {paperData.appendix.length > 1 && (
              <Button
                variant="danger"
                size="sm"
                className="remove-button"
                onClick={() => removeAppendix(index)}
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
          onClick={addAppendix}
        >
          + Add Appendix
        </Button>
      </Form.Group>

      <div className="wizard-navigation d-flex justify-content-between mt-4 pt-3 border-top">
        <Button 
          variant="secondary" 
          onClick={onPrevious}
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
          variant="primary" 
          onClick={onNext}
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

export default Step3_References;
