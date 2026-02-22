# 🔱 UCSD Triton Advisor — Oogway AI Academic Dashboard

An **adaptive, AI-native academic advising interface** for UC San Diego. Replacing static tools and slow VAC appointments, Triton Advisor provides a **real-time, personalized academic pathway** using a dynamic dashboard and conversational AI avatar. Built as a **hackathon demo-ready prototype**, it integrates **student profiles, course insights, GPA trends, and “what-if” simulations** to create an engaging future-facing HCI system.  

---

## 🎯 Problem Statement

Current academic advising systems at UCSD rely on **static spreadsheets, delayed VAC appointments, and rigid planning tools**. Students often struggle to understand their graduation timeline, course difficulty, or the impact of taking extra courses.  

**Our Solution:**  
- A **morphing, live dashboard** showing GPA trends, credit load, graduation probability, and course difficulty.  
- A **Claude-powered conversational avatar**, Oogway, guiding students interactively and responding to “what-if” scenarios.  
- Real-time simulations and adaptive UI for **personalized, visually engaging academic advising**.  

**Hackathon Focus:** Demo-ready, visually impressive interface with adaptive panels and natural AI conversation. No full scraping or perfect modeling required.  

---

## 🚀 Features

### 1️⃣ Login Page
- Quick access demo profile: Antara Chhabra, 4.0 GPA  
- Option to upload your own degree audit HTML  
- Seamless navigation to the live dashboard  

### 2️⃣ Dashboard (dashboard.html)
- **Degree Audit Panel (Top Left):** Color-coded GPA, courses taken, grades earned  
- **Calendar View (Mid Left):** Shows current courses and weekly schedule  
- **Oogway AI Avatar Panel (Right):** Placeholder avatar; clickable for full chat session  
- **Webcam Feed:** Bottom of avatar panel for live user interaction  
- **Progress Bar (Bottom):** 4-year timeline with freshman → senior markers and completed units  
- **What-if Simulation:** Add/drop courses and see adaptive roadmap updates  

### 3️⃣ Advisor Session (React app)
- Claude-powered chatbot with **personalized student responses**  
- Student snapshot sidebar reflects live dashboard data  
- Quick question chips and smart fallback responses  
- Full UCSD branding and color scheme  

### 4️⃣ Data Simulation
- Mock student profiles: GPA trends, majors/minors, planned graduation  
- Pre-processed Reddit/RateMyProfessor insights  
- JSON API feeds driving **both avatar and adaptive dashboard**  

---

## 📁 Project Structure
ucsd-advisor/
├── frontend.html ← Login page
├── dashboard.html ← Main dashboard after login
│
├── advisor-react/ ← React app for AI advisor
│ ├── package.json
│ ├── public/
│ │ ├── index.html
│ │ └── oogway.jpg
│ └── src/
│ ├── index.js
│ └── App.jsx ← Full chat UI with UCSD branding
│
└── backend/ ← Express + Claude API backend
├── package.json
├── .env.example ← Copy to .env and add your API key
└── src/
└── server.js ← REST API (port 3002)


---

## 🔌 API Endpoints

| Method | Path              | Description                        |
|--------|-----------------|------------------------------------|
| GET    | /health          | Health check                        |
| POST   | /api/chat        | Send message to Oogway              |
| POST   | /api/chat/stream | Streaming response (SSE)            |
| GET    | /api/student     | Get student profile data             |
