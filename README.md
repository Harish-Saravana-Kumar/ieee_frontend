# IEEE Paper Generator - Frontend

A React-based frontend application for generating IEEE-formatted papers. This application provides a user-friendly, multi-step wizard interface for creating academic papers in IEEE format.

## Features

- **Multi-Step Wizard**: Easy-to-follow 4-step process for paper creation
- **Dynamic Content Management**: Add/edit/delete sections, subsections, formulas, tables, and images
- **Image Upload**: Upload images with captions directly to the backend
- **Plagiarism Checker**: Check documents for plagiarism
- **Real-time Validation**: Form validation to ensure data quality
- **Document Generation**: Generate and download .docx files in IEEE format

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on `http://localhost:8000`

## Installation

1. Navigate to the project directory:
```bash
cd ieee-frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm start
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

## Usage

### Generating a Paper

1. **Step 1 - Metadata**: Enter paper title, authors, affiliations, emails, abstract, and keywords
2. **Step 2 - Sections**: Add sections and subsections with content, formulas, tables, and images
3. **Step 3 - References**: Add references and appendix items
4. **Step 4 - Generate**: Review your paper and generate the .docx file

### Checking Plagiarism

1. Navigate to the "Plagiarism Checker" tab
2. Upload a .docx file
3. Click "Check for Plagiarism"
4. View the results

## API Configuration

The application expects the backend API to be running on `http://localhost:8000`. You can modify this in the component files if your backend is running on a different URL.

### Backend Endpoints Used

- `POST /upload-image` - Upload images for sections
- `POST /generate` - Generate IEEE paper document
- `POST /check-plagiarism/` - Check document for plagiarism

## Project Structure

```
ieee-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── PaperForm.js          # Main form container
│   │   ├── Step1_MetaData.js     # Metadata input
│   │   ├── Step2_Sections.js     # Sections management
│   │   ├── Step3_References.js   # References input
│   │   ├── Step4_Generate.js     # Document generation
│   │   └── PlagiarismChecker.js  # Plagiarism checking
│   ├── App.js                     # Main app component
│   ├── index.js                   # Entry point
│   └── index.css                  # Styles
├── package.json
└── README.md
```

## Technologies Used

- **React** - UI framework
- **React Bootstrap** - UI components and styling
- **Axios** - HTTP client for API calls
- **Bootstrap** - CSS framework

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure your backend has CORS enabled for `http://localhost:3000`.

### File Upload Issues
Ensure the backend `/upload-image` endpoint accepts multipart/form-data and returns a `path` in the response.

### Document Generation Issues
Make sure the backend `/generate` endpoint returns a file stream with the correct content-type header:
```
application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

## License

MIT
