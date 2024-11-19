# Project- Spring Boot & Angular(Bank Management System)

Welcome to the Bank Management System repository built using **Spring Boot** for the backend and **Angular** for the frontend! This project aims to provide a foundation for managing banking operations using modern web technologies.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Role-based Access](#role-based-access)

## Overview

This Bank Management System allows users and administrators (managers) to interact with the banking system in a seamless and efficient manner. The system includes features like account management, loan management, transaction history, user profile management, role-based access control, and more.

The application is divided into two main parts:
1. **Backend**: Developed using **Spring Boot**, which handles the server-side logic, REST APIs, and database interactions.
2. **Frontend**: Developed using **Angular**, providing a user-friendly interface for the bank's clients and administrators.

## Features

- **User Registration and Login**: New users can sign up, and existing users can log in to access their account.
- **Account Management**: Users can view their account details, check balance, and manage account status.
- **Transaction Management**: Complete transaction history is available. Users can perform transactions, and administrators can view all transactions and also approved or declined transaction.
- **Loan Management**: Users can apply for loans and track their loan details. Admins can approve or reject loan applications.
- **Loan Payment**: Users can make loan payments, and loans are updated in real time.
- **Bank Statement**: Users can generate and view their bank statements.
- **Role-based Access Control**: Separate access for users and managers/admins. Users have limited actions, while admins can manage accounts and loans.

## Technologies Used

### Backend (Spring Boot):
- **Spring Boot**: Framework for building RESTful web services.
- **Spring Data JPA**: For database interactions and CRUD operations.
- **Spring Security**: For authentication and role-based authorization.
- **MySQL**: Relational database for storing bank-related data.
- **Java 17**: Programming language used for backend development.

### Frontend (Angular):
- **Angular**: For building dynamic web applications.
- **TypeScript**: Scripting language for writing Angular components.
- **HTML/CSS**: For structuring and styling the application.
- **Bootstrap**: For responsive design and UI components.

## Screenshots

📌 Login Page
![login page](https://github.com/user-attachments/assets/ed42ab1e-56d9-4fae-a46a-4e67ee007e4a)

📌 New Account Open
![new account open](https://github.com/user-attachments/assets/7b69a4c6-d923-484c-89f3-bde2d431b417)

📌 User Profile
![user profile](https://github.com/user-attachments/assets/c515420a-1c69-43a8-bc62-77c02e07dedf)

📌 Deposit
![deposit](https://github.com/user-attachments/assets/6ea3347e-c522-4d3a-9941-c37e90df96f2)

📌 Withdraw
![withdraw](https://github.com/user-attachments/assets/42f09759-1d97-4ad5-a55c-812adaed9878)

📌 Transfer Fund
![fund transfer](https://github.com/user-attachments/assets/ed9d5c22-7ba4-458d-a7d2-f5c9594e97ab)

📌 Bank Statement
![statement](https://github.com/user-attachments/assets/c043cc9a-b57f-472e-ae1c-1ee29ca6caed)

📌 Loan Application
![loan apply](https://github.com/user-attachments/assets/26a1cb4f-4988-46f0-bf65-a83979df6e86)

📌 Loan Details
![loan list](https://github.com/user-attachments/assets/cf36d67a-1b42-4c3d-90b1-19c209691dba)

📌 Loan Payment
![loan payment](https://github.com/user-attachments/assets/3380f7fd-3e66-4310-af51-51736ef31bc8)

📌 Admin approval
![admin transaction approval](https://github.com/user-attachments/assets/ad7ce935-3b5d-4024-9242-286a3f13002d)

📌 Home Page
![home page](https://github.com/user-attachments/assets/66aef4e1-ea28-429c-b8ad-eb77e613d0c2)

## Installation

### Prerequisites:
- **Java 17**
- **Node.js and npm**
- **MySQL** (or any other RDBMS)

### Backend Setup:
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bank-management-system.git
   cd bank-management-system/backend

2. Configure the database:

   Update src/main/resources/application.properties with your MySQL credentials.

3. Build and run the backend:
   ```bash
   ./mvnw clean install
   ./mvnw spring-boot:run

4. The backend will be running at http://localhost:8084.

###Frontend Setup:
1. Navigate to the frontend directory:
   ```bash
   cd bank-management-system/frontend

2. Install dependencies:
   ```bash
   npm install

3. Run the Angular development server:
   ```bash
   ng serve

## Role-based Access
The system has two roles:

- User: Can view and manage their own account, apply for loans, and view their transaction history.
- Admin/Manager: Can approve accounts, approve/reject loans, and view/manage all users' transactions.

### Route Protection:
Auth Guard: Routes are protected based on user roles, ensuring that users and managers have access only to authorized sections of the application.
