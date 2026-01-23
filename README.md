# IEEE Paper Generator - Frontend

A modern web application for generating IEEE formatted academic papers with authentication, plagiarism checking, and multi-step form processing.

## 📋 Project Description

This is a **Paper Generator Application** built to help researchers and students create IEEE-formatted academic papers easily. The application includes user authentication, a multi-step paper metadata form, reference management, and plagiarism detection features.

### Tech Stack
- **Frontend Framework:** React 18
- **Build Tool:** Vite (Lightning-fast build tool)
- **Styling:** CSS3
- **State Management:** React Hooks
- **HTTP Client:** Axios (for API calls)
- **Routing:** React Router
- **Build/Dev Server:** Node.js with npm/yarn

## 📁 Project File Structure

```
ieee_frontend_new/
├── public/
│   └── index.html                 # Public HTML entry point
├── src/
│   ├── components/                # Reusable React components
│   │   ├── Auth.css              # Authentication styling
│   │   ├── Login.jsx             # Login page component
│   │   ├── SignUp.jsx            # Sign-up page component
│   │   ├── PaperForm.jsx         # Main paper form wrapper
│   │   ├── ProtectedRoute.jsx    # Route protection component
│   │   ├── SessionTimeoutHandler.jsx  # Session timeout handler
│   │   ├── PlagiarismChecker.jsx # Plagiarism checker component
│   │   ├── Step1_MetaData.jsx    # Step 1: Paper metadata form
│   │   ├── Step2_Sections.jsx    # Step 2: Paper sections
│   │   ├── Step3_References.jsx  # Step 3: Reference management
│   │   └── Step4_Generate.jsx    # Step 4: Paper generation
│   ├── utils/
│   │   └── authUtils.jsx         # Authentication utilities
│   ├── api.jsx                   # API endpoint configurations
│   ├── config.jsx                # Application configuration
│   ├── App.jsx                   # Root App component
│   ├── App.css                   # Main application styles
│   ├── index.css                 # Global styles
│   ├── main.jsx                  # React entry point
│   └── config.js                 # Config file (legacy)
├── index.html                     # HTML template
├── package.json                   # Project dependencies & scripts
├── vite.config.js                # Vite configuration
├── eslint.config.js              # ESLint rules
└── README.md                      # This file
```

## 🚀 How to Run Frontend

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
   or if using yarn:
   ```bash
   yarn install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```
   or with yarn:
   ```bash
   yarn dev
   ```

3. **Access the application:**
   - Open your browser and navigate to `http://localhost:5173`
   - The application will automatically reload on code changes (HMR enabled)

### Other Available Commands

**Build for production:**
```bash
npm run build
```

**Preview the production build locally:**
```bash
npm run preview
```

**Run ESLint for code quality check:**
```bash
npm run lint
```

## 🌟 Features

- ✅ User Authentication (Login/Sign-up)
- ✅ Multi-step Paper Generation Form
- ✅ Session Management & Timeout
- ✅ Plagiarism Detection
- ✅ Protected Routes
- ✅ Responsive UI
- ✅ Real-time API Integration

## 📝 Notes

- The frontend communicates with the backend API (Flask/Python)
- Make sure the backend server is running before using the application
- Session timeout is handled automatically
- All API calls are configured in [api.jsx](src/api.jsx) and [config.jsx](src/config.jsx)

---

**Thank you for exploring this project! We hope it helps you streamline IEEE paper generation and accelerates your academic writing process. Happy researching! 🎓**
