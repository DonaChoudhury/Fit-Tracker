
# Gym Activity Tracker

A MERN-stack fitness tracking application that helps users log workouts, monitor daily habits, and track progress over time.  
The app offers muscle group–based exercise logging and daily wellness tracking (water intake, sleep, step count, workout duration) — all in an intuitive, mobile-friendly interface.


## Live Demonstration

A quick demo of the Gym Activity Tracker in action—showcasing user login, exercise logging, and wellness entries.
https://drive.google.com/file/d/15pOZzskizx_h7yyNYeejsuthZa-qD62o/view?usp=drivesdk


## Features

### Workout Tracking
- Select a body part to view related exercises.
- Log 3 sets of reps and weights for each exercise.
- Store workouts day-wise in MongoDB for easy progress tracking.

### Daily Wellness Logs
- Record water intake, sleep hours, step count, and workout duration once per day.
- Automatic update on the landing page via Recoil state management.

### Progress & Insights
- Organized daily records for workouts and wellness.
- Easy filtering and quick navigation between dates.

### Full-Stack MERN Architecture
- Frontend: React.js (Netlify hosted)
- Backend: Node.js + Express.js (AWS hosted)
- Database: MongoDB Atlas
- State Management: Recoil

---

## Tech Stack

**Frontend:**
- React.js
- Recoil (state management)
- Axios
- Material-UI / Custom CSS

**Backend:**
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose

**Hosting:**
- Frontend: Netlify
- Backend: AWS

---

## Installation & Setup

1. **Clone the repository**
   bash
   git clone https://github.com/DonaChoudhury/Fit-Tracker.git
   cd Fit-Tracker


2. **Install dependencies for both frontend and backend**

   bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   

3. **Set up environment variables**
   Create a `.env` file in the `server` folder and add:

   env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   

4. **Run the application**

   * Start the backend server:

     bash
     cd server
     npm start
     
   * Start the frontend development server:

     bash
     cd ../client
     npm start
     

5. **Access the app**
   Open your browser and navigate to:
   http://localhost:3000



## Project Workflow

1. **User Login / Landing Page**

   * User accesses the app and lands on the dashboard showing today’s workout and habit logs.

2. **Select Muscle Group**

   * User selects a body part from a dropdown.
   * Related exercises are fetched from MongoDB via backend API.

3. **Log Workout**

   * User clicks an exercise to open a form for logging 3 sets of reps and weights for the current day.
   * Data is sent to the backend using Axios and stored in MongoDB.

4. **Log Daily Habits**

   * From the daily records dropdown, user logs water intake, sleep, steps, and workout duration (once per day).
   * Recoil updates the landing page instantly without refresh.

5. **View Progress**

   * User can view past day logs and compare performance over time.
   * Filters by date and muscle group allow quick navigation.

6. **Persistent Storage**

   * All workout and daily logs are stored day-wise in MongoDB.
   * Data remains available across sessions and devices.



  **Visual Workflow**
  
flowchart TD
    A[User Login / Landing Page] --> B[Dashboard shows wide range of muscle groups for logging workout and habit logs]
    B --> C[Select Muscle Group from cards shown in the bottom of the screen]
    C --> D[Fetch related exercises from MongoDB via backend API]
    D --> E[Log Workout - Click on  exercise to open form]
    E --> F[Enter 3 sets of reps & weights for current day for the chosen workout]
    F --> G[Send data via Axios to backend & store in MongoDB]
    B --> H[Log Daily Habits - water intake, sleep, steps, workout duration]
    H --> I[Recoil updates landing page instantly without refresh]
    B --> J[View Progress - past logs & compare performance]
    J --> K[Logs Filtered by date & muscle group]
    G --> L[Persistent Storage - logs saved day-wise in MongoDB]
    I --> L
    K --> L
    L --> M[Data available across sessions & devices]



## Author

**Dona Choudhury**
Email: donachoudhury24@gmail.com
LinkedIn: www.linkedin.com/in/dona-choudhury-645735243
GitHub: https://github.com/DonaChoudhury




