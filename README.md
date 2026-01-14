# Ankara Disaster Monitoring System (WebGIS)

The **Ankara Disaster Monitoring System** is a WebGIS-based application designed to monitor, report, and manage natural and man-made disasters (earthquake, fire, flood, landslide, storm, gas leakage, etc.) within the Ankara metropolitan area.

The system consists of a **Leaflet-based frontend**, a **Node.js / Express backend**, and a fully documented **REST API** using **Swagger (OpenAPI)**.

---

## Table of Contents

- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Environment Configuration](#environment-configuration)
- [Running the Application](#running-the-application)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Core API Endpoints](#core-api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Error Handling & Middleware](#error-handling--middleware)
- [Known Limitations](#known-limitations)
- [Roadmap](#roadmap)
- [License](#license)

---

## Key Features

### Frontend (WebGIS)
- Interactive **Leaflet** map centered on Ankara
- Disaster markers with:
  - Category-based color and icon
  - Severity-based size and priority
- Disaster filtering by:
  - Category
  - Severity level
- Sidebar dashboard:
  - User session status
  - Recent disaster reports
  - Alert banner for last-24-hour critical incidents
- Location selection by **map click**
- Responsive UI (desktop / tablet / mobile)

### Backend (REST API)
- Node.js & Express-based RESTful architecture
- User authentication & role-based authorization
- Disaster report CRUD operations
- Centralized middleware layer
- Swagger (OpenAPI) documentation
- Static frontend hosting via Express (`public/`)

---

## System Architecture

Client (Browser)
|
| HTTP / JSON
v
Express Server (server.js)
|
|-- Routes (routes/)
|-- Middleware (middleware/)
|-- Models (models/)
|-- Swagger (swagger.js / swagger.yaml)
|
v
Database (MongoDB / SQL – configurable)



---

## Project Structure

Root directory: `C:\webgis`

C:\webgis
├── middleware/ # Authentication, validation, error handling
├── models/ # Database models (User, Incident, etc.)
├── node_modules/ # NPM dependencies
├── public/ # Frontend (HTML, CSS, JS, assets)
├── routes/ # Express route definitions
├── .env # Environment variables (ignored in VCS)
├── .env.example # Environment variable template
├── package.json
├── package-lock.json
├── README.md
├── server.js # Application entry point
├── swagger.js # Swagger initialization
└── swagger.yaml # OpenAPI specification



---

## Technology Stack

### Frontend
- Leaflet.js
- OpenStreetMap
- Font Awesome
- Vanilla JavaScript (ES6)

### Backend
- Node.js
- Express.js
- Swagger / OpenAPI
- JWT (Authentication)
- dotenv
- CORS middleware

### Database (Configurable)
- MongoDB (Mongoose) **or**
- PostgreSQL / MySQL (via ORM)

---

## Installation

### Prerequisites
- Node.js (LTS recommended)
- npm
- Database service (if persistence is enabled)

### Install Dependencies
```bash
cd C:\webgis
npm install
Environment Configuration
Create a .env file using the provided template:

bash
Kodu kopyala
copy .env.example .env
Example .env
env
Kodu kopyala
# Server
PORT=3000
NODE_ENV=development

# Base URL
BASE_URL=http://localhost:3000

# Authentication
JWT_SECRET=replace_with_secure_secret
JWT_EXPIRES_IN=1d

# Database
DB_URI=mongodb://localhost:27017/webgis

# CORS
CORS_ORIGIN=http://localhost:3000
⚠️ Never commit .env files to version control.

Running the Application
Development Mode
bash
Kodu kopyala
npm run dev
Production Mode
bash
Kodu kopyala
npm start
Once running:

Application UI:
http://localhost:<PORT>/

API Base URL:
http://localhost:<PORT>/api

API Documentation (Swagger)
Swagger UI is exposed via:

bash
Kodu kopyala
http://localhost:<PORT>/api-docs
swagger.js initializes Swagger middleware

swagger.yaml contains OpenAPI schema definitions

Core API Endpoints
Actual routes may vary depending on implementation in routes/.

Authentication
Method	Endpoint	Description
POST	/api/auth/register	User registration
POST	/api/auth/login	User login (JWT)

Disaster Reports
Method	Endpoint	Description
GET	/api/incidents	Get all incidents
GET	/api/incidents?type=fire	Filter by category
GET	/api/incidents?severity=critical	Filter by severity
POST	/api/incidents	Create incident (auth required)
DELETE	/api/incidents/:id	Delete incident (admin/owner)

Authentication & Authorization
Guest

Read-only access

Authenticated User

Create incidents

Delete own incidents

Admin / Authority

Full access (delete any incident)

Authorization is enforced through:

JWT verification middleware

Role / ownership checks

Error Handling & Middleware
Centralized error handler

Input validation middleware

Authentication & authorization middleware

Graceful HTTP error responses (4xx / 5xx)

Known Limitations
Real-time updates are not enabled (polling only)

Media upload (photo/video) not implemented

Single-city support (Ankara only)

Offline mode not supported

Roadmap
WebSocket / SSE for real-time alerts

Marker clustering & heatmaps

Media attachment support

Incident verification & moderation workflow

Multi-city and national scale support

Audit logging and rate limiting

