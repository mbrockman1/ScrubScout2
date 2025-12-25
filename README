
# ScrubScout 🏥

> **The "Glassdoor" for Healthcare Travelers.**

ScrubScout is a community-driven review platform designed for travel nurses and allied health professionals. It allows users to share authentic feedback on hospitals regarding staffing ratios, pay transparency, and safety culture.

This project is a **High-Fidelity MVP (Minimum Viable Product)** built with a modern React frontend and a Python FastAPI backend structure.

---

## 🚀 Features

*   **Facility Search:** Filter hospitals by State, Category (Hospital/Clinic), and Tags (Trauma, Teaching, etc.).
*   **Detailed Reviews:** Star ratings, written feedback, and specific metadata (Ownership, Hospital Type).
*   **Community Moderation:** Admin dashboard to approve/reject reviews and handle flagged content.
*   **User Profiles:** Manage professional identity and verification status.
*   **Legal Compliance:** Dedicated pages for HIPAA policy, Terms of Service, and Traveler Rights.
*   **Dual-Mode Architecture:** Can run in "Mock Mode" (browser-only) or "Full Stack Mode" (connected to Python).

---

## 🛠 Tech Stack

### Frontend
*   **Framework:** React 18 (via Vite)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Icons:** Heroicons (via SVG)

### Backend
*   **Framework:** FastAPI (Python)
*   **Server:** Uvicorn
*   **Validation:** Pydantic

---

## 💻 Getting Started

To run the full application locally, you will need **Node.js** (v18+) and **Python** (v3.9+).

### 1. Clone the Repository
```bash
git clone <repository-url>
cd scrubscout
```

### 2. Frontend Setup (React)
Open a terminal window (Terminal A):

```bash
# Install JavaScript dependencies
npm install

# Run the frontend server
npm run dev
```
*The frontend will start at `http://localhost:5173`*

### 3. Backend Setup (Python)
Open a **new** terminal window (Terminal B):

```bash
# Navigate to backend folder
cd backend

# (Optional but recommended) Create and activate a virtual environment
python -m venv venv
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt

# Run the API server
uvicorn main:app --reload
```
*The backend API will start at `http://localhost:8000`*

---

## ⚙️ Configuration: Mock Data vs. Real API

By default, the application might be set to **Mock Mode** for instant demonstration without needing the Python backend running.

**To switch to the Real Python Backend:**

1.  Open `src/services/api.ts`.
2.  Locate the constant at the top:
    ```typescript
    // Change this to TRUE to connect to the Python FastAPI backend
    const USE_REAL_API = false; 
    ```
3.  Set it to `true`.
4.  Ensure your Python backend is running on port 8000.
5.  The frontend is already configured in `vite.config.ts` to proxy requests from `/api` to `http://localhost:8000`.

---

## 🚧 Roadmap to Production (Gap Analysis)

Currently, the app is a functioning prototype. To make it a live commercial product, the following steps are required:

### 1. Database Integration (Critical)
*   **Current Status:** The Python backend currently uses in-memory lists (arrays) that reset when the server restarts.
*   **Action Required:** Connect FastAPI to a real database.
    *   *Recommendation:* **PostgreSQL** (via SQLAlchemy or Prisma).
    *   *Task:* Create tables for `Users`, `Facilities`, and `Reviews`.

### 2. Authentication System
*   **Current Status:** Auth is simulated. Any email logs in; "Verification" is a timer.
*   **Action Required:** Integrate a real Identity Provider.
    *   *Recommendation:* **Supabase Auth**, **Firebase**, or **Clerk**.
    *   *Task:* Replace `localStorage` logic in `App.tsx` with auth provider hooks.

### 3. Deployment
*   **Frontend:** Deploy to Vercel, Netlify, or AWS Amplify.
*   **Backend:** Deploy to Render, Heroku, Railway, or AWS EC2.
*   **Domain:** Purchase a domain (e.g., `scrubscout.com`) and configure SSL.

### 4. Data Seeding
*   **Current Status:** Includes 3 sample hospitals.
*   **Action Required:** Import real hospital data.
    *   *Source:* CMS (Centers for Medicare & Medicaid Services) provides public datasets of all registered US hospitals.

---

## ⚖️ Legal Disclaimer

**ScrubScout is a platform, not a publisher.**
*   **Section 230 Friendly:** The platform creates a "Community Profile" for facilities. Content is user-generated.
*   **HIPAA:** The app explicitly warns users **not** to post Protected Health Information (PHI).
*   **Nominative Fair Use:** Hospital names are used for identification purposes only. ScrubScout is not affiliated with the facilities listed.

---

## 📄 License

Proprietary Software. All rights reserved.
