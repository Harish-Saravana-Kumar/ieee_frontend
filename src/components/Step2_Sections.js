import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const Step2_Sections = ({ paperData, updatePaperData, onNext, onPrevious }) => {
  const [uploadingImage, setUploadingImage] = useState(false);

  // Add a new section
  const addSection = () => {
    const newSection = {
      heading: '',
      content: '',
      images: [],
      formulas: [],
      tables: [],
      subsections: []
    };
    updatePaperData('sections', [...paperData.sections, newSection]);
  };

  // Remove a section
  const removeSection = (sectionIndex) => {
    const newSections = paperData.sections.filter((_, i) => i !== sectionIndex);
    updatePaperData('sections', newSections);
  };

  // Update section field
  const updateSection = (sectionIndex, field, value) => {
    const newSections = [...paperData.sections];
    newSections[sectionIndex][field] = value;
    updatePaperData('sections', newSections);
  };

  // Add subsection
  const addSubsection = (sectionIndex) => {
    const newSubsection = {
      heading: '',
      content: '',
      images: [],
      formulas: [],
      tables: []
    };
    const newSections = [...paperData.sections];
    newSections[sectionIndex].subsections.push(newSubsection);
    updatePaperData('sections', newSections);
  };

  // Remove subsection
  const removeSubsection = (sectionIndex, subsectionIndex) => {
    const newSections = [...paperData.sections];
    newSections[sectionIndex].subsections = newSections[sectionIndex].subsections.filter(
      (_, i) => i !== subsectionIndex
    );
    updatePaperData('sections', newSections);
  };

  // Update subsection
  const updateSubsection = (sectionIndex, subsectionIndex, field, value) => {
    const newSections = [...paperData.sections];
    newSections[sectionIndex].subsections[subsectionIndex][field] = value;
    updatePaperData('sections', newSections);
  };

  // Add formula to section
  const addFormula = (sectionIndex, subsectionIndex = null) => {
    const newSections = [...paperData.sections];
    if (subsectionIndex !== null) {
      newSections[sectionIndex].subsections[subsectionIndex].formulas.push('');
    } else {
      newSections[sectionIndex].formulas.push('');
    }
    updatePaperData('sections', newSections);
  };

  // Update formula
  const updateFormula = (sectionIndex, formulaIndex, value, subsectionIndex = null) => {
    const newSections = [...paperData.sections];
    if (subsectionIndex !== null) {
      newSections[sectionIndex].subsections[subsectionIndex].formulas[formulaIndex] = value;
    } else {
      newSections[sectionIndex].formulas[formulaIndex] = value;
    }
    updatePaperData('sections', newSections);
  };

  // Remove formula
  const removeFormula = (sectionIndex, formulaIndex, subsectionIndex = null) => {
    const newSections = [...paperData.sections];
    if (subsectionIndex !== null) {
      newSections[sectionIndex].subsections[subsectionIndex].formulas = 
        newSections[sectionIndex].subsections[subsectionIndex].formulas.filter((_, i) => i !== formulaIndex);
    } else {
      newSections[sectionIndex].formulas = 
        newSections[sectionIndex].formulas.filter((_, i) => i !== formulaIndex);
    }
    updatePaperData('sections', newSections);
  };

  // Add table
  const addTable = (sectionIndex, subsectionIndex = null) => {
    const rows = prompt('Number of rows:', '3');
    const cols = prompt('Number of columns:', '3');
    if (rows && cols) {
      const table = Array(parseInt(rows)).fill(null).map(() => 
        Array(parseInt(cols)).fill('')
      );
      const newSections = [...paperData.sections];
      if (subsectionIndex !== null) {
        newSections[sectionIndex].subsections[subsectionIndex].tables.push(table);
      } else {
        newSections[sectionIndex].tables.push(table);
      }
      updatePaperData('sections', newSections);
    }
  };

  // Update table cell
  const updateTableCell = (sectionIndex, tableIndex, rowIndex, colIndex, value, subsectionIndex = null) => {
    const newSections = [...paperData.sections];
    if (subsectionIndex !== null) {
      newSections[sectionIndex].subsections[subsectionIndex].tables[tableIndex][rowIndex][colIndex] = value;
    } else {
      newSections[sectionIndex].tables[tableIndex][rowIndex][colIndex] = value;
    }
    updatePaperData('sections', newSections);
  };

  // Remove table
  const removeTable = (sectionIndex, tableIndex, subsectionIndex = null) => {
    const newSections = [...paperData.sections];
    if (subsectionIndex !== null) {
      newSections[sectionIndex].subsections[subsectionIndex].tables = 
        newSections[sectionIndex].subsections[subsectionIndex].tables.filter((_, i) => i !== tableIndex);
    } else {
      newSections[sectionIndex].tables = 
        newSections[sectionIndex].tables.filter((_, i) => i !== tableIndex);
    }
    updatePaperData('sections', newSections);
  };

  // Upload image
  const handleImageUpload = async (e, sectionIndex, subsectionIndex = null) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const caption = prompt('Enter image caption:', '');
      const imageData = {
        path: response.data.path,
        caption: caption || ''
      };

      const newSections = [...paperData.sections];
      if (subsectionIndex !== null) {
        newSections[sectionIndex].subsections[subsectionIndex].images.push(imageData);
      } else {
        newSections[sectionIndex].images.push(imageData);
      }
      updatePaperData('sections', newSections);
    } catch (error) {
      alert('Error uploading image: ' + (error.response?.data?.detail || error.message));
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove image
  const removeImage = (sectionIndex, imageIndex, subsectionIndex = null) => {
    const newSections = [...paperData.sections];
    if (subsectionIndex !== null) {
      newSections[sectionIndex].subsections[subsectionIndex].images = 
        newSections[sectionIndex].subsections[subsectionIndex].images.filter((_, i) => i !== imageIndex);
    } else {
      newSections[sectionIndex].images = 
        newSections[sectionIndex].images.filter((_, i) => i !== imageIndex);
    }
    updatePaperData('sections', newSections);
  };

  // Render subsection
  const renderSubsection = (sectionIndex, subsection, subsectionIndex) => (
    <Card key={subsectionIndex} className="subsection-card">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h6>Subsection {subsectionIndex + 1}</h6>
          <Button
            variant="danger"
            size="sm"
            onClick={() => removeSubsection(sectionIndex, subsectionIndex)}
          >
            Delete Subsection
          </Button>
        </div>

        <Form.Group className="mb-2">
          <Form.Label>Subsection Heading</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subsection heading"
            value={subsection.heading}
            onChange={(e) => updateSubsection(sectionIndex, subsectionIndex, 'heading', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter subsection content"
            value={subsection.content}
            onChange={(e) => updateSubsection(sectionIndex, subsectionIndex, 'content', e.target.value)}
          />
        </Form.Group>

        {/* Formulas */}
        {subsection.formulas.length > 0 && (
          <div className="mb-2">
            <strong>Formulas:</strong>
            {subsection.formulas.map((formula, fIdx) => (
              <div key={fIdx} className="form-array-item mt-1">
                <Form.Control
                  type="text"
                  placeholder="LaTeX formula or plain text"
                  value={formula}
                  onChange={(e) => updateFormula(sectionIndex, fIdx, e.target.value, subsectionIndex)}
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="remove-button"
                  onClick={() => removeFormula(sectionIndex, fIdx, subsectionIndex)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Tables */}
        {subsection.tables.map((table, tIdx) => (
          <div key={tIdx} className="mb-2">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Table {tIdx + 1}</strong>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeTable(sectionIndex, tIdx, subsectionIndex)}
              >
                Remove Table
              </Button>
            </div>
            <div className="table-input-grid">
              <table className="table table-bordered table-sm">
                <tbody>
                  {table.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx}>
                          <input
                            type="text"
                            className="table-cell-input form-control form-control-sm"
                            value={cell}
                            onChange={(e) => updateTableCell(sectionIndex, tIdx, rIdx, cIdx, e.target.value, subsectionIndex)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Images */}
        {subsection.images.map((image, iIdx) => (
          <div key={iIdx} className="mb-2">
            <Alert variant="info" className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Image:</strong> {image.caption || 'No caption'}
                <br />
                <small className="text-muted">{image.path}</small>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeImage(sectionIndex, iIdx, subsectionIndex)}
              >
                Remove
              </Button>
            </Alert>
          </div>
        ))}

        <div className="d-flex gap-2 flex-wrap">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => addFormula(sectionIndex, subsectionIndex)}
          >
            + Add Formula
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => addTable(sectionIndex, subsectionIndex)}
          >
            + Add Table
          </Button>
          <label className="btn btn-outline-secondary btn-sm">
            + Upload Image
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageUpload(e, sectionIndex, subsectionIndex)}
              disabled={uploadingImage}
            />
          </label>
        </div>
      </Card.Body>
    </Card>
  );

  // Render section
  const renderSection = (section, sectionIndex) => (
    <Card key={sectionIndex} className="section-card mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>Section {sectionIndex + 1}</h5>
          <Button
            variant="danger"
            onClick={() => removeSection(sectionIndex)}
          >
            Delete Section
          </Button>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Section Heading *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter section heading"
            value={section.heading}
            onChange={(e) => updateSection(sectionIndex, 'heading', e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter section content"
            value={section.content}
            onChange={(e) => updateSection(sectionIndex, 'content', e.target.value)}
          />
        </Form.Group>

        {/* Formulas */}
        {section.formulas.length > 0 && (
          <div className="mb-3">
            <strong>Formulas:</strong>
            {section.formulas.map((formula, fIdx) => (
              <div key={fIdx} className="form-array-item mt-1">
                <Form.Control
                  type="text"
                  placeholder="LaTeX formula or plain text"
                  value={formula}
                  onChange={(e) => updateFormula(sectionIndex, fIdx, e.target.value)}
                />
                <Button
                  variant="danger"
                  size="sm"
                  className="remove-button"
                  onClick={() => removeFormula(sectionIndex, fIdx)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Tables */}
        {section.tables.map((table, tIdx) => (
          <div key={tIdx} className="mb-3">
            <div className="d-flex justify-content-between align-items-center">
              <strong>Table {tIdx + 1}</strong>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeTable(sectionIndex, tIdx)}
              >
                Remove Table
              </Button>
            </div>
            <div className="table-input-grid">
              <table className="table table-bordered table-sm">
                <tbody>
                  {table.map((row, rIdx) => (
                    <tr key={rIdx}>
                      {row.map((cell, cIdx) => (
                        <td key={cIdx}>
                          <input
                            type="text"
                            className="table-cell-input form-control form-control-sm"
                            value={cell}
                            onChange={(e) => updateTableCell(sectionIndex, tIdx, rIdx, cIdx, e.target.value)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* Images */}
        {section.images.map((image, iIdx) => (
          <div key={iIdx} className="mb-3">
            <Alert variant="info" className="d-flex justify-content-between align-items-center">
              <div>
                <strong>Image:</strong> {image.caption || 'No caption'}
                <br />
                <small className="text-muted">{image.path}</small>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeImage(sectionIndex, iIdx)}
              >
                Remove
              </Button>
            </Alert>
          </div>
        ))}

        <div className="d-flex gap-2 flex-wrap mb-3">
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => addFormula(sectionIndex)}
          >
            + Add Formula
          </Button>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => addTable(sectionIndex)}
          >
            + Add Table
          </Button>
          <label className="btn btn-outline-primary btn-sm">
            + Upload Image
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(e) => handleImageUpload(e, sectionIndex)}
              disabled={uploadingImage}
            />
          </label>
        </div>

        {/* Subsections */}
        {section.subsections.length > 0 && (
          <div className="mb-3">
            <h6>Subsections:</h6>
            {section.subsections.map((subsection, subIdx) => 
              renderSubsection(sectionIndex, subsection, subIdx)
            )}
          </div>
        )}

        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => addSubsection(sectionIndex)}
        >
          + Add Subsection
        </Button>
      </Card.Body>
    </Card>
  );

  return (
    <div>
      <div className="mb-4 pb-3 border-bottom">
        <h4 className="mb-2" style={{ color: 'var(--ieee-blue)' }}>📑 Paper Sections</h4>
        <p className="text-muted mb-0">Add sections, subsections, images, formulas, and tables to your paper</p>
      </div>
      
      {paperData.sections.length === 0 && (
        <Alert variant="info" className="border-0 shadow-sm">
          <i className="bi bi-info-circle me-2"></i>
          No sections added yet. Click "Add Section" to get started.
        </Alert>
      )}

      {paperData.sections.map((section, index) => renderSection(section, index))}

      <Button
        variant="success"
        className="mb-3"
        onClick={addSection}
        size="lg"
        style={{
          borderRadius: '8px',
          padding: '12px 30px',
          fontWeight: 'bold'
        }}
      >
        + Add Section
      </Button>

      {uploadingImage && (
        <Alert variant="warning" className="border-0 shadow-sm">
          <i className="bi bi-clock me-2"></i>
          Uploading image, please wait...
        </Alert>
      )}

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

export default Step2_Sections;
