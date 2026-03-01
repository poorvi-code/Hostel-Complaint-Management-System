🏨 Hostel Complaint Management System

A production-ready full-stack web application built to streamline hostel complaint management.
Students can submit complaints online, and administrators can efficiently track and resolve them in real time.

🚀 Live Demo

🌐 Access Here:
http://YOUR_PUBLIC_IP

🧩 Architecture Overview

Client (Browser)
      ↓
React Frontend (Nginx)
      ↓
Node.js + Express API
      ↓
MongoDB Database

✔ Fully containerized using Docker
✔ Orchestrated with Docker Compose
✔ Deployed on AWS EC2

✨ Key Features

📝 Submit hostel complaints

📋 View and track complaint history

🔄 Update complaint status (Pending / In Progress / Resolved)

🔐 Admin panel for complaint management

📊 Structured complaint handling workflow

🐳 Dockerized production deployment


🛠️ Tech Stack

Layer	Technology
Frontend	React.js
Backend	Node.js, Express.js
Database	MongoDB
Web Server	Nginx
DevOps	Docker, Docker Compose
Cloud	AWS EC2


📂 Project Structure

Hostel-Complaint-Management-System/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server files
│
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── React source files
│
└── docker-compose.yml

⚙️ Getting Started

1️⃣ Clone the Repository
git clone https://github.com/YOUR_USERNAME/Hostel-Complaint-Management-System.git
cd Hostel-Complaint-Management-System

2️⃣ Run with Docker 🐳
sudo docker-compose up -d --build

3️⃣ Verify Containers
sudo docker ps

4️⃣ Access Application

Open in your browser:
http://YOUR_PUBLIC_IP

🛑 Stop the Application
sudo docker-compose down

☁️ AWS Deployment Steps

Launch Ubuntu EC2 instance
Install Docker & Docker Compose
Configure Security Group:
HTTP (Port 80) → 0.0.0.0/0
Clone repo
Run:
sudo docker-compose up -d --build


🔒 Production Improvements (Optional)

Enable HTTPS using Let's Encrypt

Add environment variables (.env)

Add CI/CD pipeline (GitHub Actions)

Add role-based authentication

Implement logging & monitoring


📸 Screenshots



📈 Future Enhancements

📧 Email notifications

📊 Admin analytics dashboard

🏷️ Complaint categorization

🔔 Real-time updates (WebSockets)

📱 Mobile responsiveness improvements


👨‍💻 Author

Poorvi Rai K
GitHub: https://github.com/YOUR_USERNAME

📄 License

This project is licensed under the MIT License.
