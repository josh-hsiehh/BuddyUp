# BuddyUp 🧠🤝

**BuddyUp** is a full-stack accountability app built for college students looking to improve their structure, time management, and overall wellbeing. The app helps users reflect on their purpose, track progress on goals, and stay accountable with the support of friends.

---

## 🛠️ Tech Stack

### 🔹 Frontend
- [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- TailwindCSS
- Axios for API calls

### 🔹 Backend
- [FastAPI](https://fastapi.tiangolo.com/) (Python 3.9+)
- PostgreSQL (hosted via AWS RDS)
- SQLAlchemy ORM
- CORS middleware enabled

### 🔹 Auth & Data
- Firebase Authentication (planned)
- PostgreSQL for storing reflections, tasks, and user data

---

## 🚀 Features

- 🔐 Firebase login for secure authentication (coming soon)
- 🧠 Reflection prompts to build self-awareness
- 🏆 Goal tracking and task progress
- 🧍‍♂️ Buddy system for accountability
- 🧾 Daily reflections stored in PostgreSQL
- 📆 Randomized prompt generation for purposeful thinking

---

## 🧪 Running the App Locally



```bash
1. Clone The Repo

git clone https://github.com/josh-hsiehh/BuddyUp.git
cd BuddyUp

2. Backend setup
cd backend/fastapi-backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --host 127.0.0.1 --port 8000

Make sure your PostgreSQL connection is working — update DATABASE_URL in main.py if needed.

3. Frontend setup
cd frontend/app  # or frontend/my-project if you haven't renamed yet
npm install
npm run dev
This will start the app on http://localhost:5174.

🤝 Contributing
This project is a WIP — open to contributions, suggestions, and collabs. DM me or fork the repo if you’re interested!

📬 Contact
Made by @josh-hsiehh on Github, IG, and X 💙
Linkedin: https://www.linkedin.com/in/joshua--hsieh/
Discord: joshuaH3838


