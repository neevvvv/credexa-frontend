# 🚀 CREDExA — Explainable Resume Analysis System

CREDExA is an **AI-powered, explainable resume analysis platform** that evaluates resumes against job descriptions and provides **transparent scoring, skill matching, and actionable feedback**.

Unlike traditional ATS systems, CREDExA explains **why** a candidate matches (or doesn’t), combining **rule-based logic, ML scoring, semantic similarity, and GenAI-powered narrative reviews**.

---

## ✨ Key Features

- 📄 Resume Upload (PDF)
- 🧠 Role Detection from Job Description
- 🎯 Skill Matching & Missing Skill Detection
- 📊 Explainable Match Score (0–100)
- 🧩 Semantic Similarity Scoring
- 🤖 GenAI Narrative Resume Review
- 🔍 Transparent “Why This Score?” Explanations
- 📈 Actionable Improvement Suggestions
- 🌗 Dark Mode Support
- 📱 Fully Responsive (Desktop & Mobile)

---

## 🧠 How Scoring Works (High Level)

Final score is computed using a weighted blend of:

- **Skill Fit Score**
  - Core + secondary skills
  - Evidence-based weighting
- **Semantic Similarity**
  - Resume ↔ Job Description meaning match
- **Resume Quality Signals**
- **Penalty for Critical Missing Skills**

All scores are normalized and mapped to clear score bands:

- Excellent Match  
- Strong Match  
- Moderate Match  
- Weak Match  

Every score is **explainable**.

---

## 🏗️ Tech Stack

### Frontend
- React
- Custom CSS (Glassmorphism + Gradients)
- Fetch API
- Fully responsive UI
- Deployed on **Vercel**

### Backend
- Node.js + Express
- Multer (file upload)
- Resume PDF parsing
- Modular scoring pipeline
- Deployed on **Render**

### AI / ML
- Semantic similarity scoring
- Skill concept matching
- Evidence-weighted skill scoring
- GenAI (LLM) narrative resume review
- Robust fallback logic (no user-visible failures)

---
🚀 Running Locally
Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm start


Frontend: http://localhost:3000

Backend: http://localhost:5000

🌍 Deployment

Frontend: Vercel

Backend: Render

Ensure environment variables are set correctly in the Render dashboard.

🔐 Privacy & Security

Resumes are processed temporarily

Uploaded files are deleted after analysis

No resume data is stored permanently

👥 Team

Neev Sahu — Backend Developer

Nishi Singhal — UI/UX Designer & Frontend Developer

📌 Vision

CREDExA aims to make hiring:

Fairer

More transparent

Explainable by design

No black boxes. Only clarity.

## 📁 Project Structure

```bash
CREDExA/
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js
│       ├── api.js
│       ├── App.css
│       └── index.js
├── backend/
│   ├── controllers/
│   │   └── analyzeController.js
│   ├── services/
│   │   ├── resumeParser.js
│   │   ├── genaiNarrativeService.js
│   │   ├── semanticService.js
│   │   └── skillConceptService.js
│   ├── utils/
│   │   ├── roleDetector.js
│   │   ├── roleSkills.js
│   │   ├── scoreCalculator.js
│   │   ├── scoreBandResolver.js
│   │   ├── scoreExplanationGenerator.js
│   │   └── skillExtractor.js
│   ├── index.js
│   └── README.md
└── README.md


