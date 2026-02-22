🔱 UCSD Triton Advisor — Oogway AI Academic Dashboard

An adaptive, AI-native academic advising interface for students. Replacing static tools and slow appointments, Triton Advisor provides a **real-time, personalized academic pathway** using a dynamic dashboard and conversational AI avatar. Built as a hackathon demo-ready prototype, it integrates student profiles, course insights, GPA trends, and “what-if” simulations to create an engaging, **future-facing human-computer interaction (HCI) system**.

## Demo Link
https://tritonadvisor.netlify.app/

## Problem Statement

Current academic advising systems at universities rely on static spreadsheets, delayed appointments, and rigid planning tools. Students often struggle to understand their graduation timeline, course difficulty, or the impact of taking extra courses.

## Our Solution

- A **morphing, live dashboard** showing GPA trends, credit load, graduation probability, and course difficulty.
- A **Claude-powered conversational avatar, Oogway**, guiding students interactively and responding to “what-if” scenarios.
- **Real-time simulations** and adaptive UI for personalized, visually engaging academic advising.
- Hackathon Focus: Demo-ready, visually impressive interface with adaptive panels and natural AI conversation. No full scraping or perfect modeling required.

## Features

- **Login Page:** Quick access demo profile, option to upload your own degree audit HTML, seamless navigation to dashboard.
- **Dashboard:** Degree Audit Panel (Top Left, color-coded GPA and grades), Calendar View (Mid Left, current courses), Oogway AI Avatar Panel (Right, clickable for full chat session), Webcam feed at bottom of avatar panel, 4-year progress bar (bottom) with freshman → senior markers, What-if simulation for add/drop courses.
- **Advisor Session (React App):** Claude-powered chatbot with personalized student responses, student snapshot sidebar reflecting dashboard data, quick question chips, fallback responses, full UCSD branding.
- **Data Simulation:** Mock student profiles (GPA trends, majors/minors, planned graduation), pre-processed Reddit/RateMyProfessor insights, JSON API feeds for both avatar and dashboard.

## Implementing a Future Interface

Triton Advisor embodies the **next generation of adaptive interfaces**:

- **Dynamic, context-aware UI:** Panels morph and update in real time according to student data and interactions.
- **Conversational HCI:** The Oogway AI avatar leverages **natural language understanding, sentiment awareness, and edge computing** to guide users in a human-like dialogue.
- **Predictive and prescriptive analytics:** Graduation probabilities, overload risks, and what-if simulations provide **anticipatory feedback**, allowing students to explore scenarios before making decisions.
- **Multi-modal interaction:** Combines **visual dashboards, interactive sliders, and live webcam feed** to create an immersive experience.
- **AI-driven personalization:** Every student sees a tailored academic roadmap, highlighting **critical paths, early graduation opportunities, and potential bottlenecks**.
- **Generative UI principles:** Panels, charts, and recommendations adapt on-the-fly, showcasing the **fluidity and responsiveness** expected from future academic platforms.
- **Engagement and feedback loops:** Real-time metrics and interactive simulations create a **living interface that responds to user behavior**, promoting deeper engagement and self-directed planning.

By combining **adaptive visualizations, conversational AI, predictive analytics, and multi-modal interaction**, Triton Advisor transforms the static, spreadsheet-driven world of academic advising into a **proactive, immersive, and intelligent future interface**.

## Our Solution

- A morphing, live dashboard showing GPA trends, credit load, graduation probability, and course difficulty.
- A Claude-powered conversational avatar, Oogway, guiding students interactively and responding to “what-if” scenarios.
- Real-time simulations and adaptive UI for personalized, visually engaging academic advising.
- Hackathon Focus: Demo-ready, visually impressive interface with adaptive panels and natural AI conversation. No full scraping or perfect modeling required.

## Features

- **Login Page:** Quick access demo profile, option to upload your own degree audit HTML, seamless navigation to dashboard.
- **Dashboard:** Degree Audit Panel (Top Left, color-coded GPA and grades), Calendar View (Mid Left, current courses), Oogway AI Avatar Panel (Right, clickable for full chat session), Webcam feed at bottom of avatar panel, 4-year progress bar (bottom) with freshman → senior markers, What-if simulation for add/drop courses.
- **Advisor Session (React App):** Claude-powered chatbot with personalized student responses, student snapshot sidebar reflecting dashboard data, quick question chips, fallback responses, full UCSD branding.
- **Data Simulation:** Mock student profiles (GPA trends, majors/minors, planned graduation), pre-processed Reddit/RateMyProfessor insights, JSON API feeds for both avatar and dashboard.

## Implementing a Future Interface

Triton Advisor embodies the next generation of adaptive interfaces:

- **Dynamic, context-aware UI:** Panels morph and update in real time according to student data and interactions.
- **Conversational HCI:** The Oogway AI avatar leverages natural language understanding, sentiment awareness, and edge computing to guide users in a human-like dialogue.
- **Predictive and prescriptive analytics:** Graduation probabilities, overload risks, and what-if simulations provide anticipatory feedback, allowing students to explore scenarios before making decisions.
- **Multi-modal interaction:** Combines visual dashboards, interactive sliders, and live webcam feed to create an immersive experience.
- **AI-driven personalization:** Every student sees a tailored academic roadmap, highlighting critical paths, early graduation opportunities, and potential bottlenecks.
- **Generative UI principles:** Panels, charts, and recommendations adapt on-the-fly, showcasing the fluidity and responsiveness expected from future academic platforms.
- **Engagement and feedback loops:** Real-time metrics and interactive simulations create a living interface that responds to user behavior, promoting deeper engagement and self-directed planning.

## Technology Used

**Frontend & UI**
- HTML & CSS: Core static pages (frontend.html, dashboard.html) for login and main interface.
- React: Interactive advisor session UI with dynamic panels and chat integration.
- Webcam Integration: Real-time webcam feed embedded for user engagement.

**Backend & APIs**
- Node.js & Express: REST API serving student profile data, chat routing, and simulated academic data.
- JSON APIs: For data simulation integration and seamless communication between frontend and advisor.

**AI & Conversational Agent**
- Anthropic Claude (or Claude-like models): Powers the agentic virtual AI academic advisor, Oogway.
- Agentic Interaction: Implements conversational state, rich context awareness, and adaptive guidance based on student data.

**Data & Simulation**
- Dataset Simulation: Generated fake student profiles (GPA trends, course history, graduation goals) driving UI and advisor responses.
- Scraped Insights: Pre-collected and pre-processed insights from external sources — including Reddit and RateMyProfessor — embedded into recommendation logic.

**Adaptive Interface & Future HCI**
- Context-Aware UI Panels: GPA trends, progress timelines, credit risk gauges, and heatmaps morph in real time based on user interactions.
- What-If Simulations: Interactive scenario sliders that recompute plans and risks instantly.
- Multi-Modal UX: Combines conversational AI, visual dashboards, and interactive controls for a responsive, anticipatory interface.
- Predictive Analytics: Graduation probability and overload risk forecasts based on simulated student progression.

## Team Roles & Responsibilities

1. Frontend & Adaptive UI Lead – Morphing dashboard, GPA trends, progress bars, what-if simulation
2. Conversational Avatar / Chatbot – Claude-powered Oogway, personalized responses, UI triggers
3. Data Simulation & Integration Lead – Mock student data, pre-processed insights, JSON API
4. Backend / Orchestration & Edge Integration – Claude API routing, real-time dashboard updates
5. Demo / Design & Polish Lead – UI animations, live demo flow, judge-ready presentation
