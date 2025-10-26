💎 Wallet System — Full Stack Application

A complete Digital Wallet Platform built using .NET 8 (Clean Architecture), Angular 20, and PostgreSQL 17.
This project demonstrates a modern full-stack architecture featuring secure authentication, wallet management, transaction tracking, and an intuitive admin dashboard.

🧭 Overview

The Wallet System enables users to:

🔐 Register & log in securely using JWT authentication

💰 Manage multiple wallets with different currencies

💸 Perform and track transactions (Top-up, Payment, Refund)

🧑‍💼 Admins can monitor users, wallets, and overall system activity

This solution follows Clean Architecture principles with CQRS + MediatR, ensuring scalability, separation of concerns, and testability.


⚙️ Tech Stack
Layer	Technology
Frontend	Angular 20, SCSS, TypeScript
Backend	.NET 8, Clean Architecture, MediatR, EF Core
Database	PostgreSQL 17
Authentication	JWT (JSON Web Tokens)
ORM	Entity Framework Core
Design Pattern	CQRS, Repository Pattern
API Docs	Swagger / OpenAPI

🧩 Project Structure

wallet-system/
│
├── backend/              # .NET 8 Clean Architecture API
│   ├── Wallet.Api
│   ├── Wallet.Application
│   ├── Wallet.Domain
│   └── Wallet.Infrastructure
│
├── frontend/             # Angular 20 Application
│   └── src/
│
├── database/             # PostgreSQL Backup & Schema
│   └── WalletDb.backup
│
└── README.md             # Root-level documentation (this file)


🚀 How to Run
🧱 1️⃣ Database Setup

Restore the database using pgAdmin or CLI:
pg_restore -U postgres -d WalletDb "database/WalletDb.backup"



⚙️ 2️⃣ Backend API (.NET 8)
cd backend/Wallet.Api
dotnet restore
dotnet run


🌐 3️⃣ Frontend (Angular 20)
cd frontend
npm install
ng serve

📊 Core Features
👤 User Features

Register / Login / Logout

View wallet balance

Perform top-up or payment transactions

View recent transaction history

🧑‍💼 Admin Features

Manage users, wallets, and transactions

Filter, sort, and analyze system data

Dashboard with analytics (total users, balances, etc.)


🧠 Technical Highlights

Clean separation of layers

CQRS implementation with MediatR

EF Core + Repository Pattern

FluentValidation for request validation

Secure JWT authentication

Comprehensive Swagger documentation








