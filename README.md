# Health Assistant — Offline Triage for Rural Care

![Health Assistant Logo](public/logo.svg)

**Health Assistant** is an offline-first, mobile Progressive Web App (PWA) designed to empower rural health workers. It acts as an AI-powered Diagnostic and Triage Support Engine, allowing workers to easily log patient symptoms through voice commands and visual scanning, even in remote areas without internet access.

## ✨ Key Features

- **Multi-Modal AI Disease Prediction Engine**
  - **Text/Voice Symptoms:** A custom, offline-capable Neural Network evaluates simple "Yes/No" answers across 11 key symptom vectors (e.g., Fever, Chills, Vomiting, Diarrhea, Breathing).
  - **Offline Image Scanning:** Uses the device camera and an offline HTML5 Canvas heuristic engine to analyze pixel data (e.g., detecting severe redness for bleeding/rashes, or yellowing for jaundice).
  - **Combined Diagnosis:** The AI combines both vocal and visual signals to predict the probability of 8 specific disease classes (Malaria, Dengue, Typhoid, Gastroenteritis, Respiratory Infection, Pregnancy Complications, Trauma, and Minor Illness).
  
- **Voice-Activated Input (Web Speech API)**
  - Fully supports hands-free operation.
  - Native language support for both **English** and **Kannada**.
  - Works entirely offline (requires device language packs to be downloaded).

- **Offline-First Data Architecture**
  - All patient assessments are saved locally using IndexedDB (`idb-keyval`).
  - Automatically syncs to the cloud backend (MongoDB/Supabase) once an internet connection is restored.

- **Bilingual Interface**
  - Seamlessly toggle between English and Kannada for all UI elements and voice prompts.

## 🛠 Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS 4
- **Routing:** TanStack Router
- **State Management:** React hooks & IndexedDB
- **AI/Logic:** Custom in-memory Neural Network (`src/lib/ai-triage.ts`) and Canvas Heuristics (`src/lib/vision.ts`)
- **Backend Sync:** Supabase / MongoDB (Configurable)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd health-assistant
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📱 Enabling Offline Voice Recognition
To ensure the voice features work in completely remote areas without internet:
1. On your Android device, go to **Settings > System > Languages & input**.
2. Go to **On-screen keyboard > Gboard > Voice typing > Offline speech recognition**.
3. Download the **English** and **Kannada** language packs.

## 🏗 Architecture & Code Structure
- `/src/components/health/`: Core UI components (HealthAssistant workflow, ImageScanner, VoiceButton).
- `/src/lib/ai-triage.ts`: The offline neural network model that trains itself on synthetic data to map symptom vectors to disease targets.
- `/src/lib/vision.ts`: The offline heuristic algorithm that analyzes raw image pixels.
- `/src/lib/sync.ts`: Handles background synchronization between IndexedDB and the cloud.
- `/src/lib/triage.ts`: Master definition of all 11 binary (Yes/No) questions and their associated severities.

## 🤝 Contributing
Contributions are welcome! If you're improving the AI predictions, please ensure your changes in `ai-triage.ts` remain lightweight and fully functional offline.
