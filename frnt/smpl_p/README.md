# Assiign (Personal Expense Tracker)

**Assignment Submission for Associate Software Engineer Internship at "Better"**

## Problem Statement
Built a small full-stack software product — **Personal Expense Tracker** — that allows users to manage their income and expenses efficiently with a clean and responsive interface.

## Tech Stack
- **Backend**: Python + Flask (REST API)
- **Frontend**: React.js + Tailwind CSS
- **Database**: SQLite
- **Additional Libraries**: Flask-CORS, Chart.js, React Chart.js 2, Lucide React (icons)

## Features
- Add Income and Expense transactions
- Support for 9 categories (Food, Transport, Rent, Salary, Entertainment, Shopping, Bills, Health, Other)
- Real-time (Asynchronous type) Dashboard showing Total Income, Total Expense, and Balance
- Interactive Pie Chart for Income vs Expense visualization
- Full transaction history with date, category, and description
- One-click delete functionality
- Fully responsive design (mobile + desktop friendly)
- Data persistence using SQLite database

## Architecture & Structure
- Clean separation between Frontend and Backend
- RESTful API design with proper routes (`/api/transactions`, `/api/summary` etc.)
- SQLite database for simple and reliable local persistence
- Logical organization with dedicated components for Dashboard, Add Transaction, and Transaction List
- Clear error handling and loading states

## AI Usage
I used Grok AI.  
I manually reviewed, tested, and verified every line of code, fixed routing issues, and ensured all endpoints work correctly.  
AI was also used to help to improve Tailwind styling for a polished UI.

## How to Run the Application

### 1. Backend (Flask)

# Window
cd Backend

create venv name env_btr
env_btr\Scripts\activate     #  Activate Virtual Environment 
pip install Flask
pip install Flask-cors
pip freeze > requirements.txt
pip install -r requirements.txt
python app.py

## Frontend name as 
cd frnt

npm create vite@latest smpl_p
cd smpl_p
npm install
npm install tailwindcss @tailwindcss/vite

## Setup Tailwind CSS
location vite.config.js
plugins tailwindcss()
index.css @import "tailwindcss";

npm install chart.js react-chartjs-2 lucide-react

npm run dev



## Future Enhancements (Optional - Advanced Features)
**Note**:
Potential future enhancements using Machine Learning and AI:
The current submission prioritizes simplicity, reliability, and timely delivery using SQLite and basic full-stack technologies.

1- **Expense Prediction**: Forecast future monthly expenses and income trends based on historical data using time-series models 

2- **Smart Recommendations**: Provide personalized spending recommendations and budget alerts 

3- **Budget Planning Assistant**: Generate monthly budget plans and savings goals with predictive insights.

4- **Task Automation**: Set up recurring transactions and automated reminders for bills.
..


