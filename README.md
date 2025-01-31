# 📄 Gestion-CV-Backend - Curriculum Management System

Gestion-CV-Backend is a web application designed to manage faculty members' curriculum vitae at UCI. It allows professors to maintain their CVs, department heads to review faculty information, and administrators to manage user roles securely.

---

## 🎯 Features

- 🔹 **Role-based access control** (Professors, Department Heads, Admins)
- 🔹 **Secure authentication system** using JWT & bcrypt
- 🔹 **Professors can manage and download** their CVs in PDF format
- 🔹 **Department heads can search & view** faculty CVs
- 🔹 **Admins have full user management capabilities**

---

## 🛠️ Technologies Used

- **Backend:** Nest.js, Node.js  
- **Database:** PostgreSQL  
- **Authentication & Security:** JWT, bcrypt, dotenv  

---

## 🚀 Installation & Setup

Follow these steps to set up the project locally:

1️⃣ **Clone the repository**
```sh
git clone https://github.com/ArielPlayit/Gestion-CV-Backend.git
```

2️⃣ **Navigate to the project directory**
```sh
cd Gestion-CV-Backend
```

3️⃣ **Install dependencies**
```sh
npm install
```

4️⃣ **Create a `.env` file and configure environment variables:**
```env
# Environment
NODE_ENV=development

# Cookies
COOKIE_HTTP_ONLY=true
COOKIE_MAX_AGE=3600000

# Database
DB_NAME=ProyectoDB
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432

# Security
JWT_SECRET=proyectofinal
MAX_INTENTOS_USUARIOS=5
MAX_INTENTOS_IP=10
```

5️⃣ **Run the application**
```sh
npm run start
```

---

## 📬 Contact

For any inquiries or collaboration opportunities, feel free to reach out:

📩 **Email:** [originalghost2003@gmail.com](mailto:originalghost2003@gmail.com)  
💻 **GitHub:** [ArielPlayit](https://github.com/ArielPlayit)  

🚀 Happy coding!

