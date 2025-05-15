# 🛒 Mini E-commerce Project

A full-stack mini e-commerce application with:

- ✨ **Frontend:** Next.js (React)
- 🔧 **Backend:** Node.js, Express, TypeScript
- 🗄️ **Database:** PostgreSQL with Prisma ORM

## 📂 Project Structure

## ⚙️ Tech Stack

| Layer        | Tech Used                          |
|--------------|------------------------------------|
| Frontend     | Next.js, React, Tailwind CSS       |
| Backend      | Node.js, Express, TypeScript       |
| ORM          | Prisma                             |
| Database     | PostgreSQL                         |
| Auth         | JWT                                |

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mini-ecom.git
cd mini-ecom

# Backend
cd server
npm install

# Frontend
cd ../client
npm install

cd ../server
npx prisma migrate dev --name init
npx prisma generate

cd server
npm run dev

cd client
npm run dev
```

## 📦 Features

### ✅ Authentication

- User registration and login using **JWT**
- Auth handled securely with **HTTP-only cookies**
- Protected API endpoints for logged-in users

### ✅ Product Management

- Authenticated users can:
  - **Create**, **edit**, and **delete** their own products
- Each product includes:
  - Name
  - Price
  - Quantity
  - Optional Image (via URL or upload)

### ✅ Inventory Tracking

- Track **product quantity** per user
- Quantity updates automatically based on changes

### ✅ Pricing Insights

- Displays **average price per product name** across all users

### ✅ Form Validation

- Robust **form validation** using **Zod** (schema-safe and typesafe)
- Instant client-side feedback and server-side verification

### ✅ Frontend UI

- Built with **Next.js** and styled using **Tailwind CSS**
- UI components powered by **shadcn/ui**:
  - Dialogs, Inputs, Cards, Buttons, Forms, Toasts, etc.
- Responsive design for both desktop and mobile
- Includes:
  - Signup/Login pages
  - Product dashboard with image, price, and quantity
  - Alerts, modals, and smooth UX

