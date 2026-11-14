# SwiftDrop – Courier & Logistics Management Platform

A full-stack courier and logistics management application built with Next.js, TypeScript, Express.js, PostgreSQL, and Prisma. SwiftDrop provides separate dashboards for customers, delivery agents, and administrators to manage parcel deliveries, tracking, and payments.

<p align="center">
  <a href="https://project-7-teal.vercel.app/">
    <strong>🚀 View Live Application</strong>
  </a>
</p>

## 🌐 Live Demo

**Frontend:** https://project-7-teal.vercel.app/

**Backend API:** https://project-a6.vercel.app

## ✨ Features

### 👤 Customer
- Customer registration and login
- Customer dashboard
- Multi-step parcel creation form
- View and manage personal parcels
- Filter parcels by delivery status
- Parcel tracking history
- Cancel eligible pending parcels
- View payment history and payment details
- Stripe Checkout integration

### 🚚 Delivery Agent
- Delivery agent authentication
- Dedicated delivery dashboard
- Browse available parcels
- Assign parcels to themselves
- View assigned parcels
- Filter assigned parcels by status
- Manage delivery progress
- Update parcel delivery statuses

### 🛠️ Administrator
- Administrator dashboard
- View total users and parcels
- Parcel status analytics chart
- Manage and view registered users
- Browse all parcel records
- View system audit logs
- Filter and paginate records

## 🧰 Technologies Used

### Frontend
- Next.js 16 (App Router)
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack Query
- Zustand
- Axios
- React Hook Form
- Zod
- Recharts
- Lucide React
- Sonner

### Backend
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Stripe

### Deployment
- Vercel

## 🏗️ Application Architecture

The application follows a frontend-backend architecture.

- **Frontend:** Next.js application responsible for the user interface, routing, authentication state, and API communication.
- **Backend:** Express REST API responsible for authentication, business logic, authorization, parcel management, and payments.
- **Database:** PostgreSQL for persistent data storage, managed through Prisma ORM.
- **Payment Gateway:** Stripe Checkout for online payments.

## 🔐 Authentication & Authorization

SwiftDrop supports three user roles:

| Role | Access |
|---|---|
| CUSTOMER | Customer dashboard and personal parcel/payment operations |
| DELIVERY_AGENT | Available parcels and assigned delivery management |
| ADMIN | Administrative dashboard, users, parcels, and audit logs |

JWT-based authentication is used for protected API requests, with role-based authorization enforced by the backend.

## 📦 Parcel Statuses

- PENDING
- PICKED_UP
- IN_TRANSIT
- OUT_FOR_DELIVERY
- DELIVERED
- CANCELLED

## 💳 Payment Integration

Stripe Checkout is integrated for online parcel payments.

The payment workflow includes:
1. Creating a payment record.
2. Creating a Stripe Checkout session.
3. Redirecting the customer to Stripe Checkout.
4. Handling payment success and cancellation routes.
5. Updating payment status through the backend Stripe webhook.

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone YOUR_FRONTEND_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd YOUR_FRONTEND_REPOSITORY_NAME
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root.

```env
NEXT_PUBLIC_API_URL=https://project-a6.vercel.app/api/v1

NEXT_PUBLIC_DEMO_CUSTOMER_EMAIL=your_demo_customer_email
NEXT_PUBLIC_DEMO_CUSTOMER_PASSWORD=your_demo_customer_password

NEXT_PUBLIC_DEMO_AGENT_EMAIL=your_demo_agent_email
NEXT_PUBLIC_DEMO_AGENT_PASSWORD=your_demo_agent_password

NEXT_PUBLIC_DEMO_ADMIN_EMAIL=your_demo_admin_email
NEXT_PUBLIC_DEMO_ADMIN_PASSWORD=your_demo_admin_password
```

Use dedicated demo-account credentials. Never put personal credentials, Stripe secret keys, or other private secrets in frontend environment variables.

### 5. Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 6. Build for production

```bash
npm run build
```

## 📁 Project Structure

```text
my-app/
├── public/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── customer/
│   │   ├── agent/
│   │   ├── admin/
│   │   └── payment/
│   ├── components/
│   │   ├── shared/
│   │   ├── layouts/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   ├── providers/
│   ├── services/
│   ├── store/
│   └── types/
├── .env.local
├── package.json
└── README.md
```

## 🌍 Deployment

The frontend is deployed on Vercel.

**Live URL:** https://project-7-teal.vercel.app/

## 🎯 Project Objectives

This project demonstrates practical full-stack development concepts, including:

- Building responsive user interfaces
- Role-based dashboards
- REST API integration
- JWT authentication
- State management
- Form validation
- Database-driven application workflows
- Stripe payment integration
- Production deployment

## 👨‍💻 Author



**Project Name:** SwiftDrop  
**Project Type:** Courier & Logistics Management Platform

---

<p align="center">
  <strong>SwiftDrop – Making parcel delivery management simpler.</strong>
</p>
