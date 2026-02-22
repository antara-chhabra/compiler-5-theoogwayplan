# 🔱 UCSD Triton Advisor — Oogway AI Academic Dashboard

A full-stack adaptive academic advising interface for UC San Diego.

---

## 📁 Project Structure

```
ucsd-advisor/
├── frontend.html          ← Login page (open directly in browser)
├── dashboard.html         ← Main dashboard (navigated to after login)
│
├── advisor-react/         ← React app (dynamic advisor session)
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   └── oogway.jpg
│   └── src/
│       ├── index.js
│       └── App.jsx        ← Full chat UI with UCSD branding
│
└── backend/               ← Express + Anthropic API backend
    ├── package.json
    ├── .env.example       ← Copy to .env and add your API key
    └── src/
        └── server.js      ← REST API (port 3002)
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend
cp .env.example .env
# Edit .env → set ANTHROPIC_API_KEY=sk-ant-...
npm install
npm start
# → Runs on http://localhost:3002
```

### 2. React Advisor App

```bash
cd advisor-react
npm install
npm start
# → Runs on http://localhost:3001
```

### 3. Open the Dashboard

Simply open `frontend.html` in your browser.
- Click **Quick Access → Antara Chhabra** (demo) OR upload your own files
- Navigates to `dashboard.html` automatically
- Click **"Start a Session with Advisor"** to open the React chat session

> **Note:** For the "Start Session" to work, both backend (3002) and React app (3001) must be running.

---

## 🔌 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET`  | `/health` | Health check |
| `POST` | `/api/chat` | Send a message to Oogway |
| `POST` | `/api/chat/stream` | Streaming response (SSE) |
| `GET`  | `/api/student` | Get student profile data |

### Chat Request Body
```json
{
  "messages": [
    { "role": "user", "content": "Can I graduate in 3 years?" }
  ],
  "systemPrompt": "Optional custom system prompt"
}
```

### Chat Response
```json
{
  "content": "Looking at your pace...",
  "usage": { "input_tokens": 450, "output_tokens": 180 }
}
```

---

## 🎨 Features

- **Login Page** (`frontend.html`)
  - Quick access demo profile (Antara Chhabra, 4.00 GPA)
  - Upload your own degree audit (HTML from DARS/uAchieve)
  - Upload your class schedule
  - Animated loading transition

- **Dashboard** (`dashboard.html`)
  - **Degree Audit Panel** — real data from DARS: FA25 grades, WI26 in-progress, SP26 planned
  - **Weekly Calendar** — Winter 2026 schedule with all 6 courses, all locations shown, scrollable
  - **Oogway Avatar Panel** — clickable icon opens full session, live webcam feed
  - **Progress Bar** — 4-year journey tracker with standing markers

- **Advisor Session** (React app)
  - Dynamic Claude-powered chat
  - Oogway persona with Kung Fu Panda aesthetic
  - Student snapshot sidebar with real audit data
  - Quick question chips
  - Smart fallback responses when API unavailable
  - Full UCSD brand color scheme

---

## 🏫 UCSD Brand Colors Used

| Color | Hex | Usage |
|-------|-----|-------|
| UC San Diego Navy | `#182B49` | Primary background |
| UC San Diego Blue | `#00629B` | Panels, accents |
| UC San Diego Yellow | `#FFCD00` | Headers, highlights |
| UC San Diego Gold | `#C69214` | Secondary gold |
| Turquoise (accent) | `#00C6D7` | Course codes, status |
| Magenta (accent) | `#D462AD` | MUS 4 calendar |
| Orange (accent) | `#FC8900` | CSE 89, warnings |
| Green (accent) | `#6E963B` | ANTH 10, on-track |

---

## 📊 Student Data (Antara Chhabra — from real degree audit)

- **GPA:** 4.00 (UC Graded Units: 16u in FA25)
- **FA25 Completed:** CSE 11 A+, MATH 18 A+, WCWP 10A A+, ECON 1 A (16u)
- **Prior Transfer:** MATH 20A TP, AP EI3 TP (8u) + additional AP credit
- **Total Completed:** 31u
- **WI26 In Progress:** MATH 20C, CSE 12, CSE 20, MUS 4, ANTH 10, CSE 89 (22u)
- **SP26 Planned:** ECON 120A, WCWP 10B
- **Remaining:** 127u → Est. Grad: Spring 2029

---
