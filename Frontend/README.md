# Fullstack E-commerce Project

A full-stack e-commerce project built with **React (Vite)** for the frontend, **Node.js + Express** for the backend, and **SQL (MySQL/PostgreSQL)** for the database.

---

## Table of Contents

- [Project Setup](#project-setup)
- [Frontend Setup](#frontend-setup-react--vite)
- [Backend Setup](#backend-setup-nodejs--express)
- [Database Setup](#database-setup-sql---mysql--postgresql)
- [Authentication & Security](#authentication--security)
- [API Development](#api-development)
- [Deployment](#deployment)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)

---

## Project Setup

1. Install **Node.js** and **npm** (latest version).  
2. Create project folder and initialize Git repository:

```bash
git init
```

3. Setup **frontend** (React + Vite) and **backend** (Node.js + Express).  
4. Install dependencies for both frontend and backend.

---

## Frontend Setup (React + Vite)

- Initialize React project using Vite:

```bash
npm create vite@latest frontend
```

- Install Tailwind CSS:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

- Install UI & animation libraries:

```bash
npm install @shadcn/ui framer-motion react-router-dom
```

- Configure routes with **React Router**.  
- Create reusable components: Navbar, Footer, Cards, Forms.

---

## Backend Setup (Node.js + Express)

- Initialize backend:

```bash
npm init -y
npm install express dotenv bcrypt jsonwebtoken mysql2 sequelize cors
```

- Setup API routes for authentication, products, and orders.  
- Use middleware for logging, validation, and error handling.  
- Configure environment variables with `.env`.

---

## Database Setup (SQL - MySQL / PostgreSQL)

- Install MySQL or PostgreSQL locally or use cloud DB.  
- Create database:

```sql
CREATE DATABASE ecommerce;
```

- Create tables:

**Users**
| Column   | Type         | Notes                   |
|----------|--------------|------------------------|
| id       | INT          | Primary Key, Auto Increment |
| name     | VARCHAR(255) |                        |
| email    | VARCHAR(255) | Unique                 |
| password | VARCHAR(255) | Hashed                 |
| role     | ENUM         | 'user', 'admin'        |

**Products**
| Column     | Type         | Notes                   |
|------------|--------------|------------------------|
| id         | INT          | Primary Key, Auto Increment |
| name       | VARCHAR(255) |                        |
| description| TEXT         |                        |
| price      | DECIMAL(10,2)|                        |
| stock      | INT          |                        |
| category   | VARCHAR(100) |                        |

**Orders**
| Column     | Type         | Notes                   |
|------------|--------------|------------------------|
| id         | INT          | Primary Key, Auto Increment |
| user_id    | INT          | Foreign Key -> Users    |
| product_id | INT          | Foreign Key -> Products |
| quantity   | INT          |                        |
| total_price| DECIMAL(10,2)|                        |
| status     | VARCHAR(50)  |                        |

- Connect backend using **Sequelize ORM** or `mysql2`.

---

## Authentication & Security

- JWT-based authentication: signup, login, token verification.  
- Store passwords securely with **bcrypt**.  
- Protect routes with authorization middleware.  
- Handle cookies/session for logged-in users.

---

## API Development

- **Authentication APIs:** Signup, Login, Logout.  
- **Product APIs:** Get all products, Get product by ID, Add, Update, Delete product.  
- **Order APIs:** Place order, View user orders, Admin order management.  
- Test APIs using Postman or Insomnia.

---

## Deployment

- Frontend: Vercel or Netlify.  
- Backend: Render, Railway, or AWS EC2.  
- Database: PlanetScale, AWS RDS, or Supabase.

---

## Technologies

- **Frontend:** React, Vite, Tailwind CSS, ShadCN/UI, Framer Motion, React Router  
- **Backend:** Node.js, Express, JWT, bcrypt, Sequelize/mysql2  
- **Database:** MySQL or PostgreSQL  
- **Deployment:** Vercel, Netlify, Render, Railway, AWS

---

## Contributing

Contributions are welcome! Fork the repo and submit a pull request.

---

## License

MIT License
