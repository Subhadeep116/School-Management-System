<h1 align="center">🎓 School Management System</h1>

<p align="center">
  A full-stack School Management System to manage teachers, students, courses, attendance, exams, results, and more.
  <br />
  Built with <b>Spring Boot</b>, <b>React JS</b>, <b>MySQL</b>, and <b>JWT Authentication</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Java-17+-brightgreen" />
  <img src="https://img.shields.io/badge/SpringBoot-3.x-brightgreen" />
  <img src="https://img.shields.io/badge/React-18+-blue" />
  <img src="https://img.shields.io/badge/MySQL-8.0-orange" />
  <img src="https://img.shields.io/badge/License-MIT-blue" />
</p>

---

## ✨ Features

- 🔒 JWT-based Authentication & Role-based Authorization (Admin, Teacher, Student)
- 👨‍🏫 Manage Teachers, Students, Grades, Batches, Courses
- 🧑‍🎓 Exam, Assignment & Result Modules for Students
- 🕒 Timetable Scheduling
- 📊 Attendance, Leave & Holiday Management
- 📣 Notice Board System
- 📬 Email notifications for exam results

---

## 🧰 Tech Stack

| Category       | Technology                             |
|----------------|-----------------------------------------|
| 👨‍💻 Frontend    | React JS, Bootstrap                    |
| 🔧 Backend     | Spring Boot (Java 17), Spring Security  |
| 💾 Database    | MySQL 8.x                               |
| 🛠 Build Tool  | Maven                                   |
| 🔐 Security    | Spring Security 6, JWT Authentication   |

---

## 📂 Modules

### 👨‍💼 Administrator
- Manage teachers, students, courses, exams, and results.
- Assign grades, batches, and timetables.

### 👩‍🏫 Teacher
- View timetable, submit assignments, enter grades, take attendance.

### 👨‍🎓 Student
- View timetable, take exams, check results, submit assignments, apply leave.

---

## ⚙️ Functional Components

| Module                    | Key Functionalities |
|---------------------------|---------------------|
| 🔐 **Authentication**     | JWT Login, Role-based Access |
| 👨‍🏫 **Teacher**           | Register, Update, Delete, Profile Mgmt |
| 🧑‍🎓 **Student**           | Register, Update, Delete, Profile Mgmt |
| 🏫 **Grade & Batch**       | Add, Update, Delete Grades/Batches |
| 📘 **Course**              | Manage all school subjects |
| 🕒 **Timetable**           | Schedule & search by teacher, student, course |
| 📝 **Exams**              | Add exams, questions, results |
| 📈 **Results**            | Calculate & Email student grades |
| 📚 **Assignments**        | Create, Submit, Review assignments |
| 📢 **Notice Board**       | Add & display important updates |
| 📆 **Attendance**         | Clock-in/out, regularization, approval |
| 🌴 **Leave & Holidays**   | Apply, approve, manage leaves & holidays |
## 🚀 Getting Started

### 🔧 Backend Setup (Spring Boot)

```bash
git clone https://github.com/yourusername/school-management-system.git
cd backend
./mvnw clean install
```
---

## ⚙️ Setup Instructions

### Configure Your Database

Edit the file at `src/main/resources/application.properties` in the backend folder and update your MySQL connection details:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/school_db
spring.datasource.username=root
spring.datasource.password=your_password

```
### Run the Backend

Navigate to the backend directory and run:

```bash
./mvnw spring-boot:run
```
### 🌐 Frontend Setup (React JS)

Navigate to the frontend folder and install dependencies:

```bash
cd frontend
npm install
npm start
```
## 🔐 Authentication Flow

- Uses JWT tokens for secure session handling.
- Role-based API access for Admin, Teacher, and Student.
- Tokens are stored in HTTP headers and validated using Spring Security filters.

---

## 📦 Folder Structure

```bash
school-management-system/
├── backend/               # Spring Boot Backend
│   └── src/
│       └── main/java/com/school
│       └── resources/application.properties
├── frontend/              # React JS Frontend
│   └── public/
│   └── src/
└── README.md

```
## 🙋‍♂️ Author

Developed by **[Subhadeep Kumbhakar]**  
🔗 GitHub: [@Subhadeep116](https://github.com/Subhadeep116)  
