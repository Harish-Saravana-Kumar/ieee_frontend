import React, { useState } from 'react';
import { Container, Navbar, Nav, Tab, Tabs, Row, Col, Card, Button } from 'react-bootstrap';
import PaperForm from './components/PaperForm';
import PlagiarismChecker from './components/PlagiarismChecker';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showApp, setShowApp] = useState(false);

  const scrollToApp = () => {
    setShowApp(true);
    setTimeout(() => {
      document.getElementById('app-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="App">
      {/* Navbar */}
      <Navbar className="navbar-ieee" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home">
            <strong>📄 IEEE Paper Generator</strong>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#how-it-works">How It Works</Nav.Link>
              <Nav.Link href="#app-section" onClick={scrollToApp}>Get Started</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <Container>
          <div className="hero-content text-center">
            <h1 className="hero-title">IEEE Paper Generator & Quality Checker</h1>
            <p className="hero-subtitle">
              Professional tools for academic excellence - Generate IEEE-formatted papers and ensure document quality with AI-powered analysis
            </p>
            <div className="hero-buttons">
              <Button className="btn-ieee" size="lg" onClick={scrollToApp}>
                Start Creating
              </Button>
              <Button className="btn-ieee-outline" size="lg" href="#features">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <Container>
          <Row>
            <Col md={3} sm={6}>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">IEEE Compliant</span>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-item">
                <span className="stat-number">AI</span>
                <span className="stat-label">Powered Analysis</span>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-item">
                <span className="stat-number">Fast</span>
                <span className="stat-label">Generation</span>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="stat-item">
                <span className="stat-number">Pro</span>
                <span className="stat-label">Quality Output</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <Container>
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            Comprehensive tools designed for researchers, students, and professionals
          </p>
          
          <Row className="mt-5">
            <Col md={6} className="mb-4">
              <Card className="feature-card">
                <Card.Body className="p-4">
                  <div className="text-center">
                    <div className="feature-icon">📝</div>
                    <h3 className="feature-title">IEEE Paper Generator</h3>
                  </div>
                  <p className="feature-description">
                    Create professional IEEE-formatted research papers with our intelligent document generator. 
                    Our system ensures compliance with IEEE standards while making the creation process effortless.
                  </p>
                  
                  <h5 className="mt-4 mb-3 text-center" style={{color: 'var(--ieee-blue)'}}>Key Features:</h5>
                  <ul className="feature-list">
                    <li><strong>Multi-Step Wizard:</strong> Easy-to-follow interface guides you through every section</li>
                    <li><strong>Dynamic Content Management:</strong> Add sections, subsections, formulas, tables, and images</li>
                    <li><strong>LaTeX Formula Support:</strong> Render mathematical equations beautifully</li>
                    <li><strong>Table Builder:</strong> Create custom tables with any dimensions</li>
                    <li><strong>Image Upload:</strong> Add figures with captions seamlessly</li>
                    <li><strong>Automatic Formatting:</strong> IEEE-compliant formatting applied automatically</li>
                    <li><strong>Citation Management:</strong> Proper reference and citation handling</li>
                    <li><strong>.DOCX Export:</strong> Download professional Word documents instantly</li>
                  </ul>
                  
                  <div className="mt-4 text-center">
                    <Button className="btn-ieee" onClick={() => { setActiveTab('generator'); scrollToApp(); }}>
                      Generate Paper Now
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} className="mb-4">
              <Card className="feature-card">
                <Card.Body className="p-4">
                  <div className="text-center">
                    <div className="feature-icon">🔍</div>
                    <h3 className="feature-title">Document Quality Checker</h3>
                  </div>
                  <p className="feature-description">
                    Ensure your document meets academic standards with our AI-powered quality analysis. 
                    Get comprehensive insights on document structure, citations, and overall quality.
                  </p>
                  
                  <h5 className="mt-4 mb-3 text-center" style={{color: 'var(--ieee-blue)'}}>Analysis Includes:</h5>
                  <ul className="feature-list">
                    <li><strong>Citation Validation:</strong> Verify all citations have proper references</li>
                    <li><strong>Readability Analysis:</strong> Check sentence structure and length</li>
                    <li><strong>Vocabulary Assessment:</strong> Measure terminology diversity</li>
                    <li><strong>Structure Completeness:</strong> Ensure introduction and conclusion presence</li>
                    <li><strong>Word Count Statistics:</strong> Comprehensive document metrics</li>
                    <li><strong>Quality Scoring:</strong> Overall document quality assessment</li>
                    <li><strong>Actionable Insights:</strong> Specific recommendations for improvement</li>
                    <li><strong>Professional Report:</strong> Detailed analysis with color-coded feedback</li>
                  </ul>
                  
                  <div className="mt-4 text-center">
                    <Button className="btn-ieee" onClick={() => { setActiveTab('checker'); scrollToApp(); }}>
                      Check Document Quality
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <Container>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Simple, fast, and professional - get started in three easy steps
          </p>
          
          <Row className="mt-5">
            <Col md={4}>
              <div className="step-card">
                <div className="step-number">1</div>
                <h4 className="step-title">Choose Your Tool</h4>
                <p className="step-description">
                  Select between Paper Generator to create new documents or Quality Checker to analyze existing ones
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="step-card">
                <div className="step-number">2</div>
                <h4 className="step-title">Input Your Content</h4>
                <p className="step-description">
                  Follow the intuitive wizard to add your content, or upload a document for quality analysis
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="step-card">
                <div className="step-number">3</div>
                <h4 className="step-title">Get Professional Results</h4>
                <p className="step-description">
                  Download your IEEE-formatted paper or review comprehensive quality insights
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Application Section */}
      {showApp && (
        <section id="app-section" className="app-section">
          <Container>
            <h2 className="section-title">Start Creating</h2>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-4 justify-content-center app-tabs"
            >
              <Tab eventKey="generator" title="📝 Generate IEEE Paper">
                <PaperForm />
              </Tab>
              <Tab eventKey="checker" title="🔍 Check Document Quality">
                <PlagiarismChecker />
              </Tab>
            </Tabs>
          </Container>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <Container>
          <Row>
            <Col md={6} className="text-center text-md-start">
              <p className="mb-2"><strong>IEEE Paper Generator & Quality Checker</strong></p>
              <p className="mb-0">Professional academic writing tools powered by AI</p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <p className="mb-0">© 2025 All Rights Reserved</p>
              <p className="mb-0">Built with ❤️ for researchers and students</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  );
}

export default App;
