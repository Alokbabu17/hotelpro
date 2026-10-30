# HotelPro - Hotel Management System 

Hey there! This is **HotelPro**, a full-stack MERN project I built to manage hotel daily tasks and room bookings. It handles everything from users searching for rooms and booking them, to staff handling check-ins/check-outs, and an admin panel to see how much money the hotel made.

Built this as part of my web development journey using MongoDB, Express, React, and Node.js.

---

## What does this project do?

### 1. For Guests (Normal Users)
- Sign up and log in securely.
- Browse all rooms with categories (Standard, Deluxe, Executive, Presidential).
- Filter rooms according to your budget.
- Pick check-in and check-out dates (it calculates the total price automatically).
- Check your booked rooms in "My Bookings" and cancel anytime if needed.

### 2. For Staff (Reception / Housekeeping)
- View all guest reservations in one list.
- One-click **Check-In** button when the guest arrives.
- One-click **Check-Out** button when they leave.
- When someone checks out, the room is marked for cleaning automatically.

### 3. For Admin
- View total revenue made so far.
- See how many rooms are vacant vs occupied.
- View total bookings and all registered users list.

---

## Tech Stack Used

- **Frontend:** React.js (with Vite), Bootstrap 5 for simple UI styling, React Router, Axios.
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB Atlas (Cloud Database).
- **Authentication:** JWT (JSON Web Tokens) + Bcrypt for password security.

---

## Project Structure


## Project Structure

```
hotelpro/
├── backend/
│   ├── src/
│   │   ├── config/          # MongoDB connection
│   │   ├── controllers/     # Code logic for routes
│   │   ├── models/          # MongoDB schemas (User, Room, Booking)
│   │   ├── routes/          # API endpoints
│   │   ├── seed.js          # Adds sample rooms and users
│   │   └── server.js        # Express app runner
│   ├── .env                 # Secret keys and Mongo URI
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Room Cards, Protected Route
│   │   ├── context/         # Auth login state
│   │   ├── pages/           # Home, Rooms, Login, Dashboard pages
│   │   ├── App.jsx          # All routes
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## How to Run This on Your PC

If you want to run this locally, follow these simple steps:

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Step 1: Clone this repo


git clone [https://github.com/Alokbabu17/hotelpro-management-system.git](https://github.com/Alokbabu17/hotelpro-management-system.git)
cd hotelpro-management-system



### Step 2: Setup Backend

1. Open terminal and go to backend folder:

cd backend
npm install




2. Create a .env file inside backend/ folder and paste this:
env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=mysecretkey123
CLIENT_URL=http://localhost:5173




3. Insert sample data (rooms and demo accounts) into database:

node src/seed.js




4. Start backend server:

npm run dev




Backend will start running on `http://localhost:5000.

---

### Step 3: Setup Frontend

1. Open a new terminal tab and go to frontend folder:
   
cd frontend
npm install




3. Start the frontend:

npm run dev




Open http://localhost:5173 in your browser!

---

## Demo Login Credentials (Ready to Test)

You don't need to create accounts from scratch to test, use these directly:

| Role | Email | Password | What you can test |
| --- | --- | --- | --- |
| **Guest** | `guest@hotelpro.com` | `password123` | Book rooms, check booking history, cancel booking |
| **Staff** | `staff@hotelpro.com` | `password123` | Check-in / check-out guests |
| **Admin** | `admin@hotelpro.com` | `password123` | View revenue, total bookings, room stats |

---

## Future Improvements

* [ ] Add Razorpay live payment gateway checkout.
* [ ] Download PDF receipts for bookings.
* [ ] Add dark mode toggle.



