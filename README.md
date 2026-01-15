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
- Database service 

Installation & Running the Application (Windows)

Install the required dependencies:
cd C:\webgis
npm install

Create the environment configuration file:
copy .env.example .env

Edit the .env file and set a secure value for JWT_SECRET.
If MongoDB is used, make sure the MongoDB service is running and the DB_URI value is correct.

Run the application:
npm start

Once the server is running, open the following URLs in your browser:
Application UI: http://localhost:3000/
API Base URL: http://localhost:3000/api
API Documentation (Swagger): http://localhost:3000/api-docs

Core API Endpoints

Authentication
POST /api/auth/register – User registration
POST /api/auth/login – User login (JWT-based)

Disaster Reports
GET /api/incidents – Retrieve all incidents
POST /api/incidents – Create a new incident (authentication required)
DELETE /api/incidents/:id – Delete an incident (admin or owner)

Authentication & Authorization
Guest: Read-only access (view incidents)
Authenticated User: Can create incidents and delete own incidents
Admin: Full access (can manage all incidents)

