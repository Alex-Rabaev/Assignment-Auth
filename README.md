# Assignment-Auth
Full Stack Developer Assignment

Prerequisites:
- Python 3 and pip installed
- Node.js and npm installed
- PostgreSQL

Backend Setup:
1. Clone the Repository

    `git clone https://github.com/Alex-Rabaev/Assignment-AI-consultant.git`

    `cd backend`

2. Set Up a Virtual Environment
   
    `python -m venv venv`

    `source venv/bin/activate`  
    or `venv\Scripts\activate` for Windows

3. Install Backend Dependencies

    `pip install -r requirements.txt`
   
4. Set Up Environment Variables
   
    Copy the .env.example file and create a .env file. Fill it with the required values.

5. Initialize the Database

    `flask db init`
    `flask db migrate`
    `flask db upgrade`
6. Run the Backend
    `python run.py`
    Backend should be running on http://localhost:5000/.

Frontend Setup
1. Navigate to Frontend Directory

    `cd frontend`
2. Install Frontend Dependencies

    `npm install`
3. Run the Frontend
   
    `npm start`
Frontend should be running on http://localhost:3000/.
