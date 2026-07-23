# taskflow-network-simulation
A Custom Full-Stack Architecture Simulation in Vanilla JS featuring a hand-crafted AJAX client (FAJAX), mock Network layer with dynamic latency and packet-drop handling, RESTful routing, and LocalStorage databases.
==================================================
📌 Repository Name :
taskflow-network-simulation

📌 Short Description :
A Custom Full-Stack Architecture Simulation in Vanilla JS featuring a hand-crafted AJAX client (FAJAX), mock Network layer with dynamic latency and packet-drop handling, RESTful routing, and LocalStorage databases.
==================================================

# ⚡ TaskFlow - Full-Stack Network & Infrastructure Simulation

TaskFlow is a Single-Page Application (SPA) task management system engineered to simulate a full end-to-end client-server architecture in pure Vanilla JavaScript. 

Instead of relying on browser-native fetching APIs (fetch or built-in XMLHttpRequest), this project builds a custom networking and server stack completely from scratch—simulating network latency, packet loss, RESTful HTTP request routing, and client-side database persistence.

---

## 🏛️ System Architecture

The application is built using a strict modular architecture divided into clear responsibilities:

[ UI / SPA Layer ]
       │
       ▼
[ FAJAX (Custom XMLHttpRequest Engine) ]
       │
       ▼
[ Network Simulation Layer (Latency & Packet Drop) ]
       │
       ▼
[ Server Engines (TodoServer & UserServer) ]
       │
       ▼
[ Database Layer (LocalStorage Persistence) ]

---

## 🛠️ Key Technical Features

- 📡 Custom AJAX Engine (FAJAX): Implements a native-like asynchronous request handler tracking state transitions (readyState 1, 2, 4) and HTTP response status codes.
- 🌐 Network Failure & Latency Simulation:
  - Dynamic network delay (500ms - 1000ms).
  - Packet Loss Handling: Built-in 1% drop rate simulation to test application behavior under unstable network conditions.
- 🖥️ Server-Side Request Routing & Controllers:
  - UserServer: Manages authentication flows (/logIn, /signUp), credential checking, and HTTP error response handling (200, 201, 400, 401, 404, 405).
  - TodoServer: Implements RESTful operations (GET, POST, PUT, DELETE) with dynamic endpoint parsing for isolated user resources.
- 💾 Encapsulated Database Layer: TodoDataBase and UserDataBase execute persistent CRUD operations over localStorage with input validation and data integrity checks.
- 📱 Single Page Application (SPA): View routing and DOM rendering using HTML5 template elements and modern event management.

---

## 🛠️ Tech Stack

- Frontend & UI: Vanilla JavaScript (ES6+ OOP), HTML5 Templates, CSS3 (Variables & Layouts).
- Infrastructure Simulation: Object-Oriented JS (FAJAX, Network, Server, DataBase).
- Data Persistence: Browser localStorage.

---

## 🚀 How to Run

1. Clone this repository:
   git clone https://github.com/r0548524016-lgtm/taskflow-network-simulation.git

2. Open index.html in any web browser or launch via VS Code Live Server.

---

## 👩‍💻 Author
Developed by Rachel Rosenblum
