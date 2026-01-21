import React, { useState } from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import Step1_MetaData from './Step1_MetaData.jsx';
import Step2_Sections from './Step2_Sections.jsx';
import Step3_References from './Step3_References.jsx';
import Step4_Generate from './Step4_Generate.jsx';

const PaperForm = () => {
  const [step, setStep] = useState(1);
  const [paperData, setPaperData] = useState({
    title: '',
    authors: [''],
    affiliations: [''],
    emails: [''],
    abstract: '',
    keywords: [''],
    sections: [],
    references: [''],
    appendix: ['']
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updatePaperData = (field, value) => {
    setPaperData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1_MetaData
            paperData={paperData}
            updatePaperData={updatePaperData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <Step2_Sections
            paperData={paperData}
            updatePaperData={updatePaperData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <Step3_References
            paperData={paperData}
            updatePaperData={updatePaperData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <Step4_Generate
            paperData={paperData}
            onPrevious={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-lg border-0">
      <Card.Header style={{ background: 'linear-gradient(135deg, var(--ieee-blue), var(--ieee-accent))', color: 'white', padding: '20px' }}>
        <h3 className="mb-2">📝 Create IEEE Paper</h3>
        <p className="mb-0" style={{ opacity: 0.9 }}>Step {step} of {totalSteps}</p>
      </Card.Header>
      <Card.Body style={{ padding: '30px' }}>
        <div className="mb-4">
          <ProgressBar 
            now={progress} 
            style={{ height: '8px', borderRadius: '10px' }}
            variant="primary"
          />
          <div className="d-flex justify-content-between mt-2">
            <small className={step === 1 ? 'fw-bold' : 'text-muted'}>Metadata</small>
            <small className={step === 2 ? 'fw-bold' : 'text-muted'}>Sections</small>
            <small className={step === 3 ? 'fw-bold' : 'text-muted'}>References</small>
            <small className={step === 4 ? 'fw-bold' : 'text-muted'}>Generate</small>
          </div>
        </div>
        {renderStep()}
      </Card.Body>
    </Card>
  );
};

export default PaperForm;
