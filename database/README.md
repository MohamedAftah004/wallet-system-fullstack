# 🗄️ Wallet Database — PostgreSQL 17

This is the **database layer** for the Wallet System — a PostgreSQL-based relational database that stores users, wallets, and transactions for the digital wallet platform.  
The database is exported as a **binary backup file (`WalletDb.backup`)**, which can be easily restored using **pgAdmin** or the **psql CLI**.

---

## 🧭 Overview

The **WalletDb** database handles:

- 🧍 User registration and account management
- 💰 Wallets linked to users, storing balance and currency
- 💸 Transactions (Top-ups, Payments, Refunds, Reversals)
- 🔗 Referential integrity via foreign key relationships
- ⚙️ Entity Framework Core migrations support

---

## ⚙️ Tech Stack

| Component             | Technology                         |
| --------------------- | ---------------------------------- |
| **Database Engine**   | PostgreSQL 17                      |
| **Schema Management** | Entity Framework Core (Code-First) |
| **Backup Format**     | `.backup` (Custom binary dump)     |
| **ORM Integration**   | .NET 9 (EFCore)                    |
| **Migration Table**   | `__EFMigrationsHistory`            |

---

## 🧱 Database Schema

### **Tables Overview**

| Table                       | Description                                                |
| --------------------------- | ---------------------------------------------------------- |
| **Users**                   | Stores user details (name, email, phone, password, status) |
| **Wallets**                 | Represents digital wallets linked to users                 |
| **Transactions**            | Logs all wallet activities (TopUps, Payments, Refunds)     |
| **\_\_EFMigrationsHistory** | Tracks EFCore migrations applied to the database           |

---

### 🧍 **Users Table**

| Column         | Type      | Description                           |
| -------------- | --------- | ------------------------------------- |
| `Id`           | UUID      | Primary key                           |
| `FullName`     | TEXT      | User’s full name                      |
| `Email`        | TEXT      | Unique email address                  |
| `PhoneNumber`  | TEXT      | Contact number                        |
| `PasswordHash` | TEXT      | Hashed password                       |
| `UserStatus`   | INT       | Enum (Active, Frozen, Disabled, etc.) |
| `CreatedAt`    | TIMESTAMP | Record creation date                  |
| `UpdatedAt`    | TIMESTAMP | Last updated timestamp                |

---

### 💰 **Wallets Table**

| Column                   | Type       | Description                             |
| ------------------------ | ---------- | --------------------------------------- |
| `Id`                     | UUID       | Primary key                             |
| `UserId`                 | UUID       | FK → `Users(Id)`                        |
| `Balance_Amount`         | NUMERIC    | Wallet balance                          |
| `Balance_CurrencyCode`   | VARCHAR(3) | ISO currency code (e.g., EGP, USD, EUR) |
| `Balance_CurrencySymbol` | VARCHAR(5) | Currency symbol                         |
| `Status`                 | INT        | Enum (Active, Frozen, Closed)           |
| `CreatedAt`              | TIMESTAMP  | Creation date                           |
| `UpdatedAt`              | TIMESTAMP  | Last update date                        |

🔗 **Relation:**

```sql
ALTER TABLE "Wallets"
ADD CONSTRAINT "FK_Wallets_Users_UserId"
FOREIGN KEY ("UserId") REFERENCES "Users"("Id") ON DELETE CASCADE;
💸 Transactions Table
Column	Type	Description
Id	UUID	Primary key
WalletId	UUID	FK → Wallets(Id)
Amount_Value	NUMERIC	Transaction amount
Amount_CurrencyCode	VARCHAR(3)	ISO currency code
Type	INT	Enum (0=TopUp, 1=Payment, 2=Refund)
Status	INT	Enum (0=Pending, 1=Completed, 3=Reversed)
Description	VARCHAR(255)	Transaction description
CreatedAt	TIMESTAMP	Created timestamp
UpdatedAt	TIMESTAMP	Updated timestamp

🔗 Relation:

sql
Copy code
ALTER TABLE "Transactions"
ADD CONSTRAINT "FK_Transactions_Wallets_WalletId"
FOREIGN KEY ("WalletId") REFERENCES "Wallets"("Id") ON DELETE CASCADE;
🔐 Entity Relationships Diagram
scss
Copy code
Users (1) ────< (∞) Wallets (1) ────< (∞) Transactions
Each User owns one or more Wallets

Each Wallet contains multiple Transactions

Cascade delete ensures relational integrity

⚡ Sample Data (Included)
The backup file already includes:

👤 Sample users (e.g., mohamed, mostafa, youssef, etc.)

💰 Wallets in multiple currencies (EGP, EUR, BHD)

💸 Transactions covering all statuses and types (Pending, Completed, Reversed)

This makes it ready for frontend/backend testing right after restoration.

🚀 Restore Instructions
🧩 Option 1 — Using pgAdmin (Recommended)
Open pgAdmin 4

Create a new database named WalletDb

Right-click the database → Restore...

Choose your backup file:

Copy code
WalletDb.backup
Set Format → Custom or Tar

Click Restore

✅ Database restored successfully with all data and schema.

🧩 Option 2 — Using CLI (pg_restore)
bash
Copy code
pg_restore -U postgres -d WalletDb "WalletDb.backup"
You may need to create the database first:

bash
Copy code
createdb -U postgres WalletDb
🧠 Notes
The backup was generated using pg_dump (v17.6)

Compatible with PostgreSQL 15+

Works seamlessly with the .NET 9 EFCore codebase

The same schema is reflected in Wallet.Domain.Entities

👨‍💻 Author
Mohamed Aftah
Full Stack Developer — (.NET | Angular | PostgreSQL)
📧 mohamedaftah04@gmail.com
🔗 [GitHub](https://github.com/MohamedAftah004)
🔗 [LinkedIn](https://www.linkedin.com/in/mabd-elfattah/)
```
