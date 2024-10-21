# Project- Spring Boot & Angular(Bank Management System)

Welcome to the Bank Management System repository built using **Spring Boot** for the backend and **Angular** for the frontend! This project aims to provide a foundation for managing banking operations using modern web technologies.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
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
