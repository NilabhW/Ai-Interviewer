AiInterviewer 🤖👔
AiInterviewer is a web application designed to help job seekers ace their next big opportunity. By leveraging AI, the platform generates role-specific, domain-tailored mock interviews. Users receive real-time, constructive feedback on their answers and can track their performance over time to pinpoint exactly where they need to improve.

✨ Features
Tailored Mock Interviews: Generate custom interview questions based on your specific target role, domain industry, and preferred difficulty level.

Instant AI Feedback: After answering a question, receive immediate, actionable feedback powered by the Groq API, including a performance score, identified strengths, and areas for improvement.

Comprehensive Dashboard: Track your preparation journey. The dashboard aggregates your historical data, displaying average scores, your best sessions, and a "weakness chart" that highlights topics needing more focus.

Secure Authentication & Storage: User accounts and interview histories are securely managed and saved using Firebase Authentication and Firestore.

🛠️ Tech Stack
Frontend: React

Backend/Database: Firebase (Auth & Firestore)

AI Integration: Groq API (for generating questions and evaluating responses)

🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine.

Prerequisites
Node.js installed on your machine.

A Firebase project with Authentication and Firestore enabled.

A Groq API key.

Installation
Clone the repository:

Bash
git clone https://github.com/NilabhW/Ai-Interviewer.git
Navigate into the project directory:

Bash
cd AiInterviewer
Install the dependencies:

Bash
npm install
Environment Variables
Create a .env file in the root directory of your project. Make sure .env is included in your .gitignore file so you don't expose your API keys!

Add the following variables to your .env file:

Code snippet
REACT_APP_GROQ_API_KEY=your_groq_api_key_here
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_firebase_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_firebase_app_id
Running the App
Start the development server:

Bash
npm start
The application will open in your browser at http://localhost:3000.

🐛 Known Issues / To-Do
The application is currently in active development. The following UI/UX bugs are known and slated for upcoming fixes:

Finish Interview Button: The button to terminate the current interview session is currently unresponsive.

Dashboard Duplication: The dashboard currently fetches and displays multiple duplicate copies of the same mock interview attempt.

🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute, especially with the known bugs listed above.
