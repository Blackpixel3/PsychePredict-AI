# PsychePredict AI: Psychological Disorder Prediction Platform

> **MCA Project Title:** Deep Learning Based Multi-Class Prediction of Psychological Disorders Using Patient Assessment Data  
> **Module Status:** MODULE 1 (Frontend) & MODULE 2 (Python Backend & Integration) COMPLETE

---

## 📋 Project Overview

**PsychePredict AI** is a clinical healthcare intelligence platform designed to facilitate early, objective, multi-class screening across **Depression**, **Anxiety**, and **Stress**. It integrates validated clinical psychometric batteries (**PHQ-9**, **GAD-7**, and **DASS-21**) alongside patient demographic and lifestyle factors.

### ⚠️ Medical Disclaimer
> **IMPORTANT:** This application is developed strictly for academic research and preliminary screening purposes. Outputs and probability estimates do not constitute a medical or psychiatric diagnosis. Patients in acute distress must contact licensed clinical professionals or emergency hotlines immediately.

---

## 🛠️ Technology Stack

### Module 1: Frontend Client
- **Framework:** React 19 with Vite & TypeScript
- **Styling:** Tailwind CSS (Navy Blue, Teal, White, Light Slate)
- **Visualizations:** Recharts (Multi-class probability distribution placeholder)
- **Icons:** Lucide React
- **Routing:** React Router v7 (`react-router-dom`)
- **State Management:** React Context API (`AssessmentContext`)

### Module 2: Python Backend & API
- **Framework:** FastAPI with Uvicorn
- **Validation & Serialization:** Pydantic v2 & Pydantic Settings
- **Data Processing:** Pandas and NumPy (Official Lovibond item mappings & sum calculations)
- **Database:** SQLite (`assessments.db` with thread-safe transactional pooling)
- **Testing:** Pytest with HTTPX AsyncClient

---

## 📂 Project Architecture

```
Disorder/
├── backend/                    # Module 2: Python FastAPI Backend
│   ├── app/
│   │   ├── core/
│   │   │   ├── database.py     # SQLite initialization & connection pool
│   │   │   └── security.py     # Anonymized ID generator & text sanitizer
│   │   ├── routes/
│   │   │   ├── assessment.py   # POST /api/assessment/submit, GET /api/assessment/{id}
│   │   │   ├── health.py       # GET /api/health
│   │   │   └── predict.py      # POST /api/predict (Module 3 contract placeholder)
│   │   ├── schemas/
│   │   │   ├── assessment.py   # Demographics, PHQ-9, GAD-7, DASS-21 validation
│   │   │   ├── common.py       # Standard structured JSON ApiResponse wrappers
│   │   │   └── predict.py      # Module 3 prediction contract schemas
│   │   ├── services/
│   │   │   ├── assessment_service.py # Coordinates scoring, ID generation, and DB
│   │   │   ├── db_service.py         # SQLite CRUD queries
│   │   │   └── scoring_service.py    # Official psychometric sum calculations (Pandas/NumPy)
│   │   ├── config.py           # Environment settings via Pydantic Settings
│   │   └── main.py             # FastAPI entrypoint, CORS configuration, exception handlers
│   ├── tests/
│   │   ├── test_assessment.py  # Validation & database storage tests
│   │   ├── test_health.py      # Health & root endpoint tests
│   │   └── test_predict.py     # Prediction contract tests
│   ├── .env.example            # Environment configuration template
│   ├── .env                    # Local environment settings
│   └── requirements.txt        # Python dependency manifest
├── src/                        # Module 1: React Frontend Client
│   ├── components/             # Reusable UI cards, badges, navbar, sidebar, wizard
│   ├── context/                # AssessmentContext with live backend status polling
│   ├── data/                   # Official PHQ-9, GAD-7, DASS-21 questions & mock cohort
│   ├── pages/                  # Landing, Dashboard, Assessment, Results, About
│   ├── services/
│   │   └── api.ts              # Centralized API service connecting React to FastAPI
│   ├── types/                  # TypeScript data contracts & severity types
│   ├── App.tsx                 # Route declarations & global providers
│   └── index.css               # Tailwind directives & typography
├── tailwind.config.js          # Healthcare palette configuration
├── pytest.ini                  # Pytest runner configuration
└── package.json
```

---

## 🌐 Implemented REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend operational check, DB connection & Module 3 readiness |
| `POST` | `/api/assessment/submit` | Validate 44 psychometric/demographic inputs, calculate scores & store in SQLite |
| `GET` | `/api/assessment/{id}` | Retrieve stored assessment record and score breakdown |
| `GET` | `/api/assessment/recent` | Retrieve recent anonymized assessment records for dashboard triage |
| `POST` | `/api/predict` | Prediction API contract placeholder for Module 3 (Returns model-not-available response; never generates fake predictions) |

Interactive OpenAPI documentation is available at: `http://127.0.0.1:8000/docs`

---

## 🚀 Running Both Applications Locally

### 1. Start the FastAPI Backend

Open a terminal in the project root:

```powershell
# Navigate to project directory
cd c:\Users\sayye\Desktop\Disorder

# Activate virtual environment and start FastAPI via Uvicorn
backend\.venv\Scripts\python.exe -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
```

The backend server will be live at:
- API Base: `http://127.0.0.1:8000/api`
- Interactive API Docs: `http://127.0.0.1:8000/docs`

---

### 2. Start the React Frontend

Open a second terminal in the project root:

```powershell
# Navigate to project directory
cd c:\Users\sayye\Desktop\Disorder

# Start Vite dev server (Windows command)
npm.cmd run dev
```

The frontend application will be live at:
- Web App: `http://localhost:5173/`

---

## 🧪 Running Automated Tests

To run the backend test suite:

```powershell
backend\.venv\Scripts\pytest.exe -v
```

All 7 test cases covering health, validation schemas, SQLite persistence, and prediction contracts pass automatically.
