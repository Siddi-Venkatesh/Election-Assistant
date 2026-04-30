# Election Process Assistant - VoterAssist

Welcome to the **VoterAssist** repository! This project is an interactive, step-by-step smart assistant designed to help users understand the election process and easily access necessary resources.

This project is a submission for the Hack2Skill hackathon.

## 🎯 Chosen Vertical: Election Process Education

We chose the **Election Process Education** vertical. Citizens often find the election process overwhelming and confusing due to lack of prior experience. Our solution breaks down the journey into simple, actionable, and visual steps to build confidence and encourage participation.

## 🧠 Approach and Logic

The application logic is designed around a **progressive disclosure** approach driven by a smart, contextual assistant:
1. **Interactive Timeline:** Instead of a wall of text, users see a chronological timeline of steps they need to take (Eligibility -> Registration -> Polling Booth -> Voting Day -> e-EPIC Download).
2. **Logical Decision Making:** The app provides dynamic routing and information based on the user's specific context (e.g., checking their eligibility age or finding a specific polling booth).
3. **Historical Data Analysis:** An interactive "Election Results" dashboard allows users to view state-wise seat distributions and vote shares (2014-2024) utilizing a dynamic Python-generated dataset.
4. **Smart Chat Assistant:** For personalized or specific questions, a floating assistant powered by the Google Gemini API provides immediate, concise answers without requiring the user to navigate away from the page.

## 🚀 How the Solution Works

Our solution is a full-stack application designed for maximum usability and performance:
- **Frontend:** Built using **React (Vite)** and **Tailwind CSS**. It provides a highly accessible, responsive, and visually stunning user interface with glassmorphic elements, **Recharts** for data visualization, and smooth micro-animations powered by **Framer Motion**.
- **Backend:** A robust, secure **Python Flask** server handles API requests. It acts as a secure proxy to the Gemini API, ensuring that sensitive API keys are never exposed to the client.
- **Data Pipeline:** A custom Python scraping script (`scrape_elections.py`) extracts and processes thousands of data points for all 28 states to feed our interactive Election Results dashboard with realistic data.
- **Deployment:** The entire application is containerized via Docker and securely deployed on **Google Cloud Run** using a continuous integration pipeline tied to GitHub.

## 📌 Assumptions Made

- The user has access to a modern web browser.
- The assistant's content is generalized for standard Indian electoral processes (e.g., Form 6, Voter Helpline App), but the logic is scalable to localize to any region.
- The mock data for polling booths represents a localized structure of what an official ECI database would return.

## 🌟 Evaluation Focus Areas Addressed

- **Code Quality:** The application is cleanly structured with distinct frontend (`src/pages`, `src/services`) and backend (`backend/routes`) directories, ensuring maintainability.
- **Security:** Strict separation of concerns. The Google Gemini API key is securely stored in the Cloud Run environment variables and is never exposed to the frontend, preventing unauthorized use.
- **Efficiency:** The frontend utilizes Vite for rapid bundling and React state management to minimize unnecessary re-renders. 
- **Testing:** The modular nature of the backend routes and React components allows for easy unit testing and validation of functionality.
- **Accessibility:** Designed with clear contrast, semantic HTML elements, and fully responsive layouts that work seamlessly across desktop and mobile devices. 
- **Localization:** The platform supports multiple languages (English, Hindi, Telugu) utilizing `react-i18next` for an inclusive user experience.
- **Google Services:** Meaningful integration of the **Google Gemini API** (via `google-generativeai`) to power the smart chat assistant, delivering real-time, context-aware guidance to users. The project is also fully deployed on **Google Cloud Run**.

## 🛠️ How to Run Locally

### Prerequisites
- Node.js (v16+)
- Python (3.9+)

### Setup Backend (Flask + Gemini API)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   # Windows:
   venv\Scripts\activate
   # Mac/Linux:
   source venv/bin/activate
   pip install -r requirements.txt
   ```
3. Set up your environment variables:
   - Create a `.env` file in the `backend/` directory using `.env.example` as a template.
   - Add your Google Gemini API key: `GEMINI_API_KEY=your-key-here`
4. Run the server:
   ```bash
   python app.py
   ```

### Setup Frontend (React)
1. Open a new terminal and navigate to the root folder:
   ```bash
   cd election-assistant
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

The application will be running concurrently, with the frontend communicating seamlessly with the Flask backend.
