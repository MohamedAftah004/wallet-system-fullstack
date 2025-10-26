# 💎 Wallet Frontend — Angular 20 Web Application

This is the **frontend interface** for the **Wallet System** — a digital wallet platform that enables users to register, manage wallets, perform transactions, and view analytics dashboards.  
Built with **Angular 20**, **TypeScript**, and **SCSS**, it includes both **Admin** and **User** portals featuring a clean and modern UI.

---

## 🧭 Overview

The **Wallet Frontend** interacts with the backend API (`Wallet.Api`) to display real-time wallet data, transactions, and user details.  
It follows a **modular, feature-based structure** for scalability, maintainability, and ease of extension.

---

## ⚙️ Tech Stack

| Category               | Technology                                   |
| ---------------------- | -------------------------------------------- |
| **Framework**          | Angular 20                                   |
| **Language**           | TypeScript                                   |
| **Styling**            | SCSS (Modular Styling)                       |
| **State Management**   | RxJS + Services                              |
| **HTTP Client**        | Angular HttpClient                           |
| **UI Components**      | Custom Components + Tailored Admin Dashboard |
| **Authentication**     | JWT (Token-based Auth)                       |
| **Charts / Analytics** | Chart.js                                     |

---

## 📂 Project Structure

```
frontend/
│
├── src/
│   ├── app/
│   │   ├── core/             # Shared services, interceptors, guards
│   │   ├── layout/           # Layout components (Sidebar, Navbar)
│   │   ├── modules/          # Feature modules (Auth, Users, Wallets, Transactions)
│   │   ├── pages/            # Page-level components
│   │   ├── shared/           # Reusable UI components
│   │   ├── app.component.ts
│   │   └── app-routing.module.ts
│   │
│   ├── assets/               # Static files (images, logos, etc.)
│   ├── environments/         # environment.ts (API URLs, keys)
│   └── styles/               # Global SCSS styles
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧰 Features

### 👤 **User Portal**

- Register, Login, Logout
- View wallet balance and transaction history
- Perform Top-ups and Payments
- Fully responsive for mobile and desktop

### 🧑‍💼 **Admin Portal**

- View all users and wallets
- Manage transactions (review, filter, sort)
- Dashboard with system-wide statistics
- Role-based access (Admin vs User)

### 🎨 **UI / UX**

- Clean dark-themed dashboard
- Modern SCSS design system
- Animated cards and charts
- Dynamic table filtering and pagination

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run the Development Server

```bash
ng serve
```

App will be available at 👉 [http://localhost:4200](http://localhost:4200)

### 3️⃣ Build for Production

```bash
ng build --configuration production
```

### 4️⃣ API Configuration

Edit `/src/environments/environment.ts` and set your backend API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7124/api',
};
```

### 4️⃣ Login as Admin

Email : admin@admin.com
Pass : admin

````





---

## 🔐 Authentication

- JWT stored in browser **localStorage**
- Automatically attached to requests via HTTP Interceptor
- Role-based route guards (Admin/User access control)

**Example Interceptor Snippet:**
```typescript
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next.handle(req);
}
````

---

## 🧠 Folder Highlights

| Folder       | Description                                         |
| ------------ | --------------------------------------------------- |
| **core/**    | Services, guards, and interceptors                  |
| **layout/**  | Sidebar, navbar, and reusable layout UI             |
| **modules/** | Feature modules (users, wallets, transactions)      |
| **shared/**  | Common UI components (buttons, modals, loaders)     |
| **pages/**   | Page-level views (Dashboard, Login, Register, etc.) |

---

## 🧩 Example Component

### 💸 Transactions Table

Displays the latest transactions with filters and status indicators.

```html
<tr *ngFor="let tx of transactions; let i = index">
  <td>{{ i + 1 }}</td>
  <td>{{ tx.userFullName }}</td>
  <td>{{ tx.amount | number:'1.2-2' }} {{ tx.currencyCode }}</td>
  <td>
    <span [class.success]="tx.status === 'Completed'" [class.pending]="tx.status === 'Pending'">
      {{ tx.status }}
    </span>
  </td>
  <td>{{ tx.createdAt | date:'short' }}</td>
</tr>
```

---

## 🧑‍💻 Author

**Mohamed Aftah**  
Frontend & Backend Developer (Angular / .NET / Clean Architecture)  
📧 **mohamedaftah04@gmail.com**  
🔗 [GitHub](https://github.com/MohamedAftah004)  
🔗 [LinkedIn](https://www.linkedin.com/in/mabd-elfattah/)
# 💎 Wallet Frontend — Angular 20 Web Application

This is the **frontend interface** for the **Wallet System** — a digital wallet platform that enables users to register, manage wallets, perform transactions, and view analytics dashboards.  
Built with **Angular 20**, **TypeScript**, and **SCSS**, it includes both **Admin** and **User** portals featuring a clean and modern UI.

---

## 🧭 Overview

The **Wallet Frontend** interacts with the backend API (`Wallet.Api`) to display real-time wallet data, transactions, and user details.  
It follows a **modular, feature-based structure** for scalability, maintainability, and ease of extension.

---

## ⚙️ Tech Stack

| Category               | Technology                                   |
| ---------------------- | -------------------------------------------- |
| **Framework**          | Angular 20                                   |
| **Language**           | TypeScript                                   |
| **Styling**            | SCSS (Modular Styling)                       |
| **State Management**   | RxJS + Services                              |
| **HTTP Client**        | Angular HttpClient                           |
| **UI Components**      | Custom Components + Tailored Admin Dashboard |
| **Authentication**     | JWT (Token-based Auth)                       |
| **Charts / Analytics** | Chart.js                                     |

---

## 📂 Project Structure

```
frontend/
│
├── src/
│   ├── app/
│   │   ├── core/             # Shared services, interceptors, guards
│   │   ├── layout/           # Layout components (Sidebar, Navbar)
│   │   ├── modules/          # Feature modules (Auth, Users, Wallets, Transactions)
│   │   ├── pages/            # Page-level components
│   │   ├── shared/           # Reusable UI components
│   │   ├── app.component.ts
│   │   └── app-routing.module.ts
│   │
│   ├── assets/               # Static files (images, logos, etc.)
│   ├── environments/         # environment.ts (API URLs, keys)
│   └── styles/               # Global SCSS styles
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧰 Features

### 👤 **User Portal**

- Register, Login, Logout
- View wallet balance and transaction history
- Perform Top-ups and Payments
- Fully responsive for mobile and desktop

### 🧑‍💼 **Admin Portal**

- View all users and wallets
- Manage transactions (review, filter, sort)
- Dashboard with system-wide statistics
- Role-based access (Admin vs User)

### 🎨 **UI / UX**

- Clean dark-themed dashboard
- Modern SCSS design system
- Animated cards and charts
- Dynamic table filtering and pagination

---

## 🚀 Getting Started

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Run the Development Server

```bash
ng serve
```

App will be available at 👉 [http://localhost:4200](http://localhost:4200)

### 3️⃣ Build for Production

```bash
ng build --configuration production
```

### 4️⃣ API Configuration

Edit `/src/environments/environment.ts` and set your backend API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7124/api',
};
```

### 4️⃣ Login as Admin

Email : admin@admin.com
Pass : admin

````





---

## 🔐 Authentication

- JWT stored in browser **localStorage**
- Automatically attached to requests via HTTP Interceptor
- Role-based route guards (Admin/User access control)

**Example Interceptor Snippet:**
```typescript
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = localStorage.getItem('token');
  if (token) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }
  return next.handle(req);
}
````

---

## 🧠 Folder Highlights

| Folder       | Description                                         |
| ------------ | --------------------------------------------------- |
| **core/**    | Services, guards, and interceptors                  |
| **layout/**  | Sidebar, navbar, and reusable layout UI             |
| **modules/** | Feature modules (users, wallets, transactions)      |
| **shared/**  | Common UI components (buttons, modals, loaders)     |
| **pages/**   | Page-level views (Dashboard, Login, Register, etc.) |

---

## 🧩 Example Component

### 💸 Transactions Table

Displays the latest transactions with filters and status indicators.

```html
<tr *ngFor="let tx of transactions; let i = index">
  <td>{{ i + 1 }}</td>
  <td>{{ tx.userFullName }}</td>
  <td>{{ tx.amount | number:'1.2-2' }} {{ tx.currencyCode }}</td>
  <td>
    <span [class.success]="tx.status === 'Completed'" [class.pending]="tx.status === 'Pending'">
      {{ tx.status }}
    </span>
  </td>
  <td>{{ tx.createdAt | date:'short' }}</td>
</tr>
```

---

## 🧑‍💻 Author

**Mohamed Aftah**  
Frontend & Backend Developer (Angular / .NET / Clean Architecture)  
📧 **mohamedaftah04@gmail.com**  
🔗 [GitHub](https://github.com/MohamedAftah004)  
🔗 [LinkedIn](https://www.linkedin.com/in/mabd-elfattah/)
