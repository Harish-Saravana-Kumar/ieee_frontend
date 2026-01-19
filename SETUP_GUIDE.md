# IEEE Paper Generator - Complete Setup Guide

## 📋 Overview

This is a complete React frontend application for generating IEEE-formatted academic papers. It works with a FastAPI backend to create professional documents in .docx format.

## 🏗️ Project Structure

```
ieee-frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/
│   │   ├── PaperForm.js        # Main multi-step form container
│   │   ├── Step1_MetaData.js   # Step 1: Title, authors, abstract, etc.
│   │   ├── Step2_Sections.js   # Step 2: Sections, subsections, content
│   │   ├── Step3_References.js # Step 3: References and appendix
│   │   ├── Step4_Generate.js   # Step 4: Review and generate document
│   │   └── PlagiarismChecker.js # Plagiarism checking tool
│   ├── App.js                  # Main application component
│   ├── index.js                # Application entry point
│   ├── index.css               # Global styles
│   └── config.js               # API configuration
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies and scripts
├── start.bat                   # Windows batch startup script
├── start.ps1                   # PowerShell startup script
└── README.md                   # Documentation
```

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **Backend Server** running on `http://localhost:8000`

### Installation Steps

1. **Navigate to the project directory:**
   ```bash
   cd H:\IEEE_Paper_generator\ieee-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   
   **Option 1 - Using npm:**
   ```bash
   npm start
   ```
   
   **Option 2 - Using batch script (Windows):**
   ```bash
   start.bat
   ```
   
   **Option 3 - Using PowerShell script:**
   ```powershell
   .\start.ps1
   ```

4. **Open your browser:**
   ```
   http://localhost:3000
   ```

## 📖 How to Use

### Generating an IEEE Paper

#### Step 1: Metadata
1. Enter the **paper title** (required)
2. Add **authors** - click "+ Add Author" for multiple authors
3. Add **affiliations** for each author's institution
4. Add **email addresses**
5. Write the **abstract** (required)
6. Add **keywords** for the paper
7. Click "Next: Add Sections"

#### Step 2: Sections
This is the most feature-rich section where you build your paper content.

**Adding a Section:**
1. Click "+ Add Section"
2. Enter a **section heading** (e.g., "Introduction", "Methodology")
3. Write the **section content**

**Adding Content to Sections:**
- **Formulas**: Click "+ Add Formula" to add LaTeX or plain text formulas
- **Tables**: Click "+ Add Table", specify rows and columns
- **Images**: Click "+ Upload Image" to upload image files
  - Images are uploaded to the backend immediately
  - You'll be prompted to add a caption
  - The backend returns a path that's stored with the image

**Adding Subsections:**
1. Click "+ Add Subsection" within any section
2. Subsections can also have:
   - Heading and content
   - Formulas
   - Tables
   - Images

**Managing Content:**
- Each item (section, subsection, formula, table, image) has a "Remove" or "Delete" button
- Sections are numbered automatically
- Subsections are indented for clarity

#### Step 3: References
1. Add **references** in IEEE format
   - Example: `[1] J. Smith, "Article Title," Journal Name, vol. 1, no. 2, pp. 100-110, 2023.`
2. Add **appendix** items (optional)
3. Click "Next: Generate Document"

#### Step 4: Generate
1. **Review** the summary of your paper
2. Check all the sections, references, and metadata
3. Click "**Generate IEEE Paper (.docx)**"
4. The document will be generated and automatically downloaded

### Checking for Plagiarism

1. Click the "**Plagiarism Checker**" tab at the top
2. Click "**Choose File**" and select a .docx file
3. Click "**Check for Plagiarism**"
4. Review the results showing:
   - Similarity score
   - Matched sources
   - Detailed analysis

## 🔧 Configuration

### API Endpoint Configuration

The application expects the backend at `http://localhost:8000` by default.

**To change the backend URL:**

1. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

2. Edit `.env`:
   ```
   REACT_APP_API_URL=http://your-backend-url:port
   ```

3. Restart the development server

### Backend API Requirements

The frontend expects these endpoints from the backend:

1. **POST /upload-image**
   - Accepts: `multipart/form-data` with image file
   - Returns: `{ "path": "uploads/filename.png", "filename": "filename.png" }`

2. **POST /generate**
   - Accepts: JSON with paper data (see data model below)
   - Returns: Binary .docx file stream
   - Content-Type: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

3. **POST /check-plagiarism/**
   - Accepts: `multipart/form-data` with .docx file
   - Returns: JSON with plagiarism analysis results

### Data Model

The complete paper data structure sent to `/generate`:

```json
{
  "title": "String",
  "authors": ["String"],
  "affiliations": ["String"],
  "emails": ["String"],
  "abstract": "String",
  "keywords": ["String"],
  "sections": [
    {
      "heading": "String",
      "content": "String",
      "images": [{"caption": "String", "path": "String"}],
      "formulas": ["String"],
      "tables": [[["String"]]],
      "subsections": [
        {
          "heading": "String",
          "content": "String",
          "images": [{"caption": "String", "path": "String"}],
          "formulas": ["String"],
          "tables": [[["String"]]]
        }
      ]
    }
  ],
  "references": ["String"],
  "appendix": ["String"]
}
```

## 🎨 Features

### ✅ Implemented Features

- **Multi-step wizard interface** with progress indicator
- **Dynamic form fields** - add/remove authors, keywords, etc.
- **Section management** - create, edit, delete sections and subsections
- **Formula support** - LaTeX and plain text formulas
- **Table builder** - dynamic table creation with custom dimensions
- **Image upload** - with immediate backend upload and caption support
- **Form validation** - ensures required fields are filled
- **Document generation** - downloads .docx file directly
- **Plagiarism checking** - upload and analyze documents
- **Responsive design** - works on desktop and tablet
- **Error handling** - clear error messages
- **Loading states** - visual feedback during operations

### 🎯 Key UI Components

- **Bootstrap styling** - professional, clean interface
- **Progress bar** - shows completion status
- **Card layouts** - organized sections and subsections
- **Color coding** - sections (blue border), subsections (gray border)
- **Icons and buttons** - clear actions for users
- **Alerts and notifications** - success/error messages

## 🛠️ Development

### Available Scripts

- `npm start` - Start development server (http://localhost:3000)
- `npm run build` - Create production build
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App (irreversible)

### Building for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder ready for deployment.

### Deployment

The build folder can be deployed to:
- **Vercel** - `vercel --prod`
- **Netlify** - Drag and drop build folder
- **GitHub Pages** - Configure in package.json
- **Any static hosting** - Upload build folder contents

## 🐛 Troubleshooting

### Issue: CORS Errors

**Solution:** Ensure your backend has CORS enabled:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue: Image Upload Fails

**Possible causes:**
1. Backend `/upload-image` endpoint not running
2. File size too large
3. Incorrect file format

**Solution:** Check backend logs and ensure the endpoint returns `{ "path": "..." }`

### Issue: Document Won't Download

**Possible causes:**
1. Backend not returning correct content-type
2. Missing required fields in paper data
3. Backend validation errors

**Solution:**
1. Check browser console for errors
2. Ensure all required fields are filled (title, abstract, authors)
3. Check backend logs for validation errors

### Issue: Port 3000 Already in Use

**Solution:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
set PORT=3001 && npm start
```

## 📦 Dependencies

### Production Dependencies
- **react** (^18.2.0) - UI framework
- **react-dom** (^18.2.0) - React DOM rendering
- **axios** (^1.6.0) - HTTP client
- **bootstrap** (^5.3.0) - CSS framework
- **react-bootstrap** (^2.9.0) - Bootstrap React components
- **react-router-dom** (^6.20.0) - Routing (if needed)

### Development Dependencies
- **react-scripts** (5.0.1) - Build tooling

## 🔐 Security Notes

1. **Never commit `.env` files** - they contain sensitive configuration
2. **Validate all user inputs** - the backend should validate data
3. **Use HTTPS in production** - encrypt data in transit
4. **Limit file upload sizes** - prevent abuse
5. **Sanitize user content** - prevent XSS attacks

## 📝 License

MIT License - Feel free to use this project for your needs.

## 🤝 Contributing

To contribute:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review the backend API documentation
3. Check browser console for errors
4. Review backend logs
5. Create an issue in the repository

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Axios Documentation](https://axios-http.com/)
- [IEEE Paper Format Guide](https://www.ieee.org/conferences/publishing/templates.html)

---

**Happy Paper Writing! 📄✨**
