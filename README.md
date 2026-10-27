# 🎬 iMovies – Movie Ticket Booking Made Simple

A modern, responsive full-stack **MERN (MongoDB, Express, React, Node.js)** movie ticket booking web application designed with a sleek cinema dark theme and vibrant neon pink accents.

Built from scratch for college project submission, presentations, and viva demonstrations.

---

## 🌟 Key Features

1. **Sleek Cinema UI & Dark Theme**: Deep dark backgrounds (`#0c0d14`) accented with hot pink (`#ff2a70`), backdrop-blurred navigation, smooth animations, and responsive typography.
2. **Hero Spotlight Carousel**: Featured premiere banner highlighting blockbuster releases with ratings, runtime, genre tags, and instant booking triggers.
3. **Dynamic Movie Catalog**: Movie cards with high-definition posters, IMDb ratings, genres, release info, synopsis previews, and ticket pricing.
4. **Instant Search & Genre Filtering**: Live real-time search across titles, cast, and directors, combined with one-click genre pills (`Action`, `Sci-Fi`, `Drama`, `Animation`, etc.) and city filters.
5. **City & Multiplex Selection**: Switch between major cities (Mumbai, Delhi, Bengaluru, Hyderabad, Pune, Chennai) with real local theater names and showtimes.
6. **Interactive Visual Seat Matrix**: Cinema screen indicator (`SCREEN THIS WAY`) with curved neon light bar, row-by-row seat grid (Rows A–E, Seats 1–8), and clear states (*Available*, *Selected*, *Reserved*).
7. **Multi-Tier Ticket Categories**: Select between Standard, Premium, and VIP Recliner classes with automated price updates.
8. **Live Price Calculator**: Real-time calculation of ticket count, base subtotal, and 12% GST/taxes.
9. **Digital Cinema Pass & Confetti**: Upon booking confirmation, a cinema ticket pass appears with a confetti burst, unique booking ID (`IMV-XXXXX`), theater details, customer summary, barcode, and QR code pass.
10. **Print & Ticket Management**: One-click ticket printing (`window.print()`), "My Bookings" history, email search filter, and instant cancellation.
11. **Dual-Mode Database Architecture**:
    - **MongoDB Atlas Mode**: Connects securely to your cloud database via `server/.env`.
    - **Automatic Demo Fallback Mode**: If MongoDB credentials are not provided or network is offline, the app switches to a built-in in-memory database store so your **college demo never crashes**!

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18 + Vite | Blazing fast client-side UI, component state management |
| **Styling** | Vanilla CSS3 (Custom Design System) | Responsive dark theme, neon glow effects, mobile-first |
| **Icons & Effects** | Lucide React + Canvas Confetti | Cinema icons and booking celebration effects |
| **Backend** | Node.js + Express 4 | RESTful API server, routing, request validation |
| **Database** | MongoDB Atlas + Mongoose 8 | Cloud NoSQL document database with schema validation |
| **Fallback DB** | In-Memory Object Store | High-reliability demo fallback for offline or viva demo |
| **Environment** | Dotenv | Safe storage of sensitive environment variables |

---

## 📂 Project Directory Structure

```text
IMoviesProject/
├── server/
│   ├── config/
│   │   ├── db.js               # MongoDB Atlas connection + graceful demo fallback
│   │   └── inMemoryStore.js    # Built-in demo store with sample blockbuster movies
│   ├── controllers/
│   │   ├── movieController.js  # Listing, searching, genre/city metadata
│   │   └── bookingController.js# Booking creation, validation, cancellation
│   ├── models/
│   │   ├── Movie.js            # Mongoose Movie schema
│   │   └── Booking.js          # Mongoose Booking schema
│   ├── routes/
│   │   ├── movieRoutes.js      # REST endpoints for /api/movies
│   │   └── bookingRoutes.js    # REST endpoints for /api/bookings
│   ├── seed/
│   │   └── seedMovies.js       # Curated blockbuster movie dataset
│   ├── .env.example            # Environment variables template
│   ├── .env                    # Active environment variables (git-ignored)
│   ├── package.json            # Backend dependencies & scripts
│   └── server.js               # Express server entry point
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Header, logo, city picker, search bar, status
│   │   │   ├── HeroBanner.jsx          # Featured movie showcase
│   │   │   ├── FilterBar.jsx           # Genre filter buttons & result count
│   │   │   ├── MovieCard.jsx           # Movie card with poster & price tag
│   │   │   ├── MovieDetailsModal.jsx   # Detailed synopsis, cast, and theaters
│   │   │   ├── BookingModal.jsx        # Seat matrix, date/time, customer form
│   │   │   ├── TicketConfirmation.jsx  # Digital boarding pass ticket & QR
│   │   │   ├── MyBookingsModal.jsx     # Booking history & cancellation
│   │   │   ├── Footer.jsx              # Footer branding & database status
│   │   │   └── Toast.jsx               # Alert notifications
│   │   ├── services/
│   │   │   └── api.js                  # Centralized API fetch layer
│   │   ├── App.jsx                     # Main application logic
│   │   ├── App.css                     # Dark theme with pink accents
│   │   ├── index.css                   # Global reset and typography
│   │   └── main.jsx                    # React Vite entry point
│   ├── index.html                      # HTML root template with fonts
│   ├── vite.config.js                  # Vite server & API proxy config
│   └── package.json                    # Frontend dependencies & scripts
│
├── .gitignore
└── README.md                           # Documentation & College Viva Guide
```

---

## 🚀 Step-by-Step Setup & Running Guide

### Prerequisites
Make sure **Node.js** (v18 or higher) is installed on your computer. You can check by opening PowerShell or Terminal and running:
```bash
node -v
```

---

### Step 1: Start the Backend Server

1. Open a terminal / PowerShell window and navigate to the `server` folder:
   ```bash
   cd "C:\Users\shyam pote\Desktop\IMoviesProject\server"
   ```
2. (Optional) Configure MongoDB Atlas:
   - Open `server/.env` in any text editor.
   - If you have a MongoDB Atlas connection string, paste it:
     ```env
     PORT=5000
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/imovies?retryWrites=true&w=majority
     NODE_ENV=development
     ```
   - **Note**: If you don't have MongoDB Atlas yet, leave `MONGODB_URI` blank! The backend will automatically run in **Demo Fallback Mode** with 8 blockbuster movies ready for booking!
3. Start the server:
   ```bash
   npm start
   ```
   *You should see:*
   ```text
   🚀 iMovies Backend Server is running on: http://localhost:5000
   📡 Health Check: http://localhost:5000/api/health
   🍿 Movies API:   http://localhost:5000/api/movies
   🎫 Bookings API: http://localhost:5000/api/bookings
   ```

---

### Step 2: Start the Frontend Client

1. Open a **second** terminal / PowerShell window and navigate to the `client` folder:
   ```bash
   cd "C:\Users\shyam pote\Desktop\IMoviesProject\client"
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *You should see:*
   ```text
     VITE v6.0.7  ready in 250 ms

     ➜  Local:   http://localhost:3000/
     ➜  Network: use --host to expose
   ```
3. Open your browser and go to:
   **[http://localhost:3000](http://localhost:3000)**

---

## ☁️ Cloud Deployment Guide

[![GitHub Repository](https://img.shields.io/badge/GitHub-IMoviesProject-181717?style=for-the-badge&logo=github)](https://github.com/aditipote4-spec/IMoviesProject)
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/aditipote4-spec/IMoviesProject)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aditipote4-spec/IMoviesProject&root-directory=client)

### Repository URL
- **Public GitHub Repo**: [https://github.com/aditipote4-spec/IMoviesProject](https://github.com/aditipote4-spec/IMoviesProject)

---

### Option 1: 1-Click Full-Stack Deployment via Render Blueprint
Because this repository contains a root `render.yaml` Blueprint, Render can automatically deploy **both** the backend and the frontend together:
1. Open [https://dashboard.render.com/blueprints/new](https://dashboard.render.com/blueprints/new) and log in with GitHub.
2. Select repository: `aditipote4-spec/IMoviesProject`.
3. Render reads `render.yaml` and sets up:
   - `imovies-backend` (Node Web Service in `server/`)
   - `imovies-frontend` (Static Web App in `client/dist`)
4. Click **Apply**.
5. Once complete, Render provides your live frontend and backend URLs!

---

### Option 2: Frontend on Vercel + Backend on Render
1. **Backend on Render**:
   - Go to [render.com](https://render.com) -> **New +** -> **Web Service**.
   - Connect `aditipote4-spec/IMoviesProject`.
   - Root directory: `server`
   - Build: `npm install`, Start: `node server.js`
   - Add env vars: `PORT=5000`, `NODE_ENV=production`
   - Copy the generated backend URL (e.g. `https://imovies-backend-xxxx.onrender.com`).
2. **Frontend on Vercel**:
   - Go to [vercel.com](https://vercel.com) -> **Add New Project**.
   - Import `aditipote4-spec/IMoviesProject`.
   - Root directory: `client`
   - Framework preset: `Vite`
   - Environment Variable:
     - `VITE_API_BASE_URL` = `https://imovies-backend-xxxx.onrender.com/api`
   - Click **Deploy**.

---

### 🔑 Securely Configuring MongoDB Atlas

If you wish to switch from the built-in **Demo In-Memory Mode** to a live **MongoDB Atlas Cluster**:

1. **Get Connection String from MongoDB Atlas**:
   - Log into [cloud.mongodb.com](https://cloud.mongodb.com).
   - In your cluster, click **Connect** $\rightarrow$ **Drivers** (Node.js).
   - Copy the connection string format:
     `mongodb+srv://<db_username>:<db_password>@cluster0.abcde.mongodb.net/imovies?retryWrites=true&w=majority`
2. **Fixing Common Atlas Authentication Issues**:
   - **Database User**: Go to **Database Access** in Atlas. Ensure your user has `readWriteAnyDatabase` or `readWrite@imovies` permissions.
   - **Password Encoding**: If your password has special symbols (e.g., `@`, `:`, `#`, `%`), URL-encode them (e.g., `@` becomes `%40`), or use an alphanumeric password.
   - **Network Access (IP Whitelist)**: Go to **Network Access** in Atlas and ensure `0.0.0.0/0` (Allow Access from Anywhere) is active so cloud providers (Render/Vercel) and college networks can reach the database.
3. **Applying the URI**:
   - For **Local testing**: Add `MONGODB_URI="your_encoded_uri"` inside `server/.env` and restart the server.
   - For **Production on Render**: Go to your Render Web Service $\rightarrow$ **Environment** $\rightarrow$ Add `MONGODB_URI` with your connection string.
   - *Never commit `server/.env` to GitHub!*
4. **Verification**:
   - When connected, the `/api/health` endpoint responds with `"isMongoAtlasConnected": true`, and the UI pill turns green (`● Atlas`).
   - If left blank or invalid, the app safely defaults to **Demo In-Memory Mode** so your college presentation never crashes!

---

## 📡 REST API Documentation

Base URL: `http://localhost:5000/api`

### 1. Health & Database Status
- **Method**: `GET`
- **Endpoint**: `/api/health`
- **Description**: Returns server status, mode (`atlas` or `demo`), and connection state.
- **Sample Response**:
  ```json
  {
    "status": "online",
    "appName": "iMovies API",
    "version": "1.0.0",
    "mode": "atlas",
    "isMongoAtlasConnected": true,
    "timestamp": "2026-10-27T14:18:39.573Z"
  }
  ```

### 2. Get All Movies (with optional filters)
- **Method**: `GET`
- **Endpoint**: `/api/movies`
- **Query Parameters**:
  - `search` *(optional)*: Search query string (e.g. `dune`, `nolan`, `cillian`)
  - `genre` *(optional)*: Filter by genre (e.g. `Sci-Fi`, `Action`, `Drama`)
  - `city` *(optional)*: Filter by city (e.g. `Mumbai`, `Delhi`)
  - `featured` *(optional)*: `true` for hero premiere
- **Sample Response**:
  ```json
  {
    "success": true,
    "count": 8,
    "dataSource": "MongoDB Atlas",
    "data": [
      {
        "_id": "671df...",
        "title": "Dune: Part Two",
        "tagline": "Long live the fighters.",
        "genre": ["Sci-Fi", "Adventure", "Action"],
        "rating": 8.8,
        "duration": "2h 46m",
        "price": { "standard": 220, "premium": 350, "vip": 520 }
      }
    ]
  }
  ```

### 3. Get Single Movie Details
- **Method**: `GET`
- **Endpoint**: `/api/movies/:id`

### 4. Create a Movie Booking
- **Method**: `POST`
- **Endpoint**: `/api/bookings`
- **Request Body**:
  ```json
  {
    "movieId": "demo_mov_1",
    "movieTitle": "Dune: Part Two",
    "poster": "https://images.unsplash.com/...",
    "duration": "2h 46m",
    "language": "English",
    "city": "Mumbai",
    "theater": "PVR IMAX Phoenix Marketcity",
    "date": "2026-10-28",
    "showtime": "05:30 PM",
    "ticketTier": "Premium",
    "seats": ["B3", "B4"],
    "pricePerTicket": 350,
    "customer": {
      "name": "Rahul Sharma",
      "email": "rahul@example.com",
      "phone": "9876543210"
    }
  }
  ```
- **Response** (HTTP 201 Created):
  ```json
  {
    "success": true,
    "message": "Booking confirmed successfully!",
    "data": {
      "bookingId": "IMV-52243",
      "ticketCount": 2,
      "subtotal": 700,
      "taxAndFees": 84,
      "totalAmount": 784,
      "paymentStatus": "Paid"
    }
  }
  ```

### 5. Get Bookings List
- **Method**: `GET`
- **Endpoint**: `/api/bookings` (or `/api/bookings?email=rahul@example.com`)

### 6. Cancel a Booking
- **Method**: `PUT`
- **Endpoint**: `/api/bookings/:id/cancel`

---

## 🎓 College Viva & Presentation Guide

Here are answers to typical questions professors and external examiners ask during final project evaluation:

### Q1: What is the MERN stack and how does data flow in iMovies?
> **Answer**:
> - **M (MongoDB Atlas)**: Cloud NoSQL database storing collections of `movies` and `bookings`.
> - **E (Express.js)**: Web framework on top of Node.js defining REST API routes, input validation, and controllers.
> - **R (React.js + Vite)**: Frontend single-page application (SPA) managing component state, seat selection, and user interaction.
> - **N (Node.js)**: JavaScript runtime environment executing our backend server.
>
> **Data Flow**: When a user selects seats and clicks "Confirm & Pay", the React client sends an HTTP `POST` request to `/api/bookings`. Express routes this to `bookingController.js`, which validates the input, calculates pricing + taxes, generates an `IMV-XXXXX` booking ID, and persists it into MongoDB via Mongoose. The backend sends back an HTTP 201 JSON response, which React renders as a digital ticket pass with celebration confetti.

### Q2: How does the application handle MongoDB Atlas outages or missing credentials?
> **Answer**:
> The project implements a **Dual-Mode Graceful Degradation pattern** in `server/config/db.js`.
> During startup, the server tries to connect to MongoDB Atlas with a 5-second timeout. If credentials are missing or the college network firewall blocks database port 27017, the server automatically switches to an in-memory database store (`inMemoryStore.js`) without crashing.
> The UI dynamically detects this via the `/api/health` endpoint and displays a status pill (`Atlas` or `Demo DB`). All features—including search, genre filtering, seat locking, and ticket creation—remain 100% functional.

### Q3: How is seat selection handled and prevented from duplication?
> **Answer**:
> In `BookingModal.jsx`, the visual matrix maps rows (A–E) and seat numbers (1–8). Already reserved seats are disabled visually and programmatically. When a user clicks a seat, React updates the `selectedSeats` state array, which recalculates the ticket quantity and total bill in real time.

### Q4: Why did you choose Vite over Create-React-App?
> **Answer**:
> Vite uses native ES Modules (ESM) and the ultra-fast `esbuild` bundler, providing instant server start (<300ms) and Hot Module Replacement (HMR). Create-React-App is deprecated by the React team.

### Q5: How are secrets managed?
> **Answer**:
> Secrets like database passwords and port numbers are stored in `server/.env`. This file is listed in `.gitignore` so sensitive database credentials are never committed to version control. A sanitized template is provided in `server/.env.example`.

---

## 📄 License
This project is open-source and created for educational purposes. Feel free to use it for learning and project submissions!
