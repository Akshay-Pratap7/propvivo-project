# PropVivo WorkFlow - HRMS Solution

PropVivo WorkFlow is a state-of-the-art Human Resource Management System (HRMS) designed to streamline organizational workflows. It is built as a modular monolith backend with a GraphQL API layer, coupled with a responsive, type-safe Next.js frontend.

---

## 🚀 Key Features

* **Dashboard Overview**: A central hub showcasing live widgets (Attendance, Leaves, Document Vault, Performance, Pending Training, Announcements).
* **Attendance Tracking**: Real-time clock-in/out records mapped to the database.
* **Leave Management**: Leave requests, approvals, and dynamic balance calculations.
* **Payroll & Payslips**: Deductions, gross/net pay metrics, and historical payslip access.
* **Expense Reimbursement**: Dynamic expense logging and category-wise status workflows.
* **Team Management**: Complete directory of employee designations, departments, and roles.
* **Document Vault**: Upload, verify, and track document validation states.
* **Performance & Goals**: Create and track key performance indicators (KPIs) and goals.
* **Value Contributions**: Award contribution points to build a real-time organizational leaderboard.
* **Recruitment Workspace**: Manage open job postings and the interview pipeline.
* **Onboarding Journeys**: Sequential checklist tracking for new hires.
* **HR Analytics**: Generated reports and trends on headcount, payroll, and attendance.

---

## 🛠️ Technology Stack

### Backend
* **Runtime**: .NET Core 10 SDK
* **API Layer**: HotChocolate GraphQL Server
* **ORM & Database**: Entity Framework Core with PostgreSQL
* **Architecture**: CQRS (MediatR), Repository Pattern, Domain-Driven Design (DDD)

### Frontend
* **Framework**: Next.js 16 (App Router, Turbopack)
* **API Client**: Apollo Client (v4) with GraphQL Code Generator (`client-preset`)
* **Styling**: Vanilla CSS & Tailwind CSS
* **Tables & Grid**: TanStack Table

---

## ⚙️ Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
* [.NET 10 SDK](https://dotnet.microsoft.com/download)
* [Node.js (v18+)](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/)

---

### 2. Running the Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Restore dependencies:
   ```bash
   dotnet restore
   ```
3. Update database connection string in `backend/API/HRMS.API/appsettings.Development.json`.
4. Run migrations/start the server:
   ```bash
   dotnet run --project API/HRMS.API
   ```
The backend server will launch on `http://localhost:5056`. GraphQL playground is available at `http://localhost:5056/graphql`.

---

### 3. Running the Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install package dependencies:
   ```bash
   npm install
   ```
3. Generate GraphQL hooks and types:
   ```bash
   npm run generate
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
Open `http://localhost:3000` (or `http://localhost:3001` depending on port availability) in your browser.

---

## 🧑‍💻 Architecture & Type Safety

This project achieves end-to-end type safety using **GraphQL Code Generator**:
* Operations and queries are defined inline in Next.js page components using the `graphql()` helper.
* Running `npm run generate` compiles these queries against the backend schema to create highly optimized React Query hooks.
* Frontend state components compile during `npm run build` with **zero TypeScript errors or warnings**.
