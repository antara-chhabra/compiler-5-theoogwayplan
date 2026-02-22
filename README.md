# 🔱 UCSD Triton Advisor — Oogway AI Academic Dashboard

An adaptive, AI-native academic advising interface for UC San Diego. Replacing static tools and slow VAC appointments, Triton Advisor provides a real-time, personalized academic pathway using a dynamic dashboard and conversational AI avatar. Built as a hackathon demo-ready prototype, it integrates student profiles, course insights, GPA trends, and “what-if” simulations to create an engaging, future-facing HCI system.

## Problem Statement

Current academic advising systems at UCSD rely on static spreadsheets, delayed VAC appointments, and rigid planning tools. Students often struggle to understand their graduation timeline, course difficulty, or the impact of taking extra courses.

**Our Solution:**  
- A morphing, live dashboard showing GPA trends, credit load, graduation probability, and course difficulty.  
- A Claude-powered conversational avatar, Oogway, guiding students interactively and responding to “what-if” scenarios.  
- Real-time simulations and adaptive UI for personalized, visually engaging academic advising.  

Hackathon Focus: Demo-ready, visually impressive interface with adaptive panels and natural AI conversation. No full scraping or perfect modeling required.

## Features

- **Login Page**: Quick access demo profile (Antara Chhabra, 4.0 GPA), option to upload your own degree audit HTML, seamless navigation to dashboard.  
- **Dashboard**: Degree Audit Panel (Top Left, color-coded GPA and grades), Calendar View (Mid Left, current courses), Oogway AI Avatar Panel (Right, clickable for full chat session), Webcam feed at bottom of avatar panel, 4-year progress bar (bottom) with freshman → senior markers, What-if simulation for add/drop courses.  
- **Advisor Session (React App)**: Claude-powered chatbot with personalized student responses, student snapshot sidebar reflecting dashboard data, quick question chips, fallback responses, full UCSD branding.  
- **Data Simulation**: Mock student profiles (GPA trends, majors/minors, planned graduation), pre-processed Reddit/RateMyProfessor insights, JSON API feeds for both avatar and dashboard.

## Project Structure
ucsd-advisor/
├── frontend.html                # Login page
├── dashboard.html               # Main dashboard after login
├── advisor-react/               # React app for AI advisor
│   ├── package.json
│   ├── public/
│   │   ├── index.html
│   │   └── oogway.jpg
│   └── src/
│       ├── index.js
│       └── App.jsx              # Full chat UI with UCSD branding
└── backend/                     # Express + Claude API backend
    ├── package.json
    ├── .env.example             # Copy to .env and add your API key
    └── src/
        └── server.js            # REST API (port 3002)

