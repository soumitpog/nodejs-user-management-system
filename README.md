# User Management System
The User Management System is a web application built using Node.js, Express, and EJS (Embedded JavaScript). This project aims to provide a platform for user registration, authentication, and profile management. It allows users to create accounts, log in securely, and update their profile information. EJS is used as the view engine to create dynamic web pages, making the application user-friendly and interactive.

## Key Features
**User Registration**: Users can create accounts by providing their username, email, and password. The system securely stores user information in a MongoDB database.

**User Profile Management**: Users can update their profile information, making it a versatile platform for managing their personal details.

**EJS Templates**: EJS is employed as the view engine, allowing dynamic rendering of HTML pages. This ensures a more interactive and user-friendly interface.

## Installation
1) Create a .env file to store your credentials. Example below:
```
MONGODB_URI = mongodb+srv://<username>:<password>@mongodburlhere
```
2) To install and run this project - install dependencies using npm and then start your server:
```
$ npm install
$ npm start
```
## Future Enhancements:
This project can be expanded with features like password reset, email verification, role-based access control, and user administration functionalities to make it even more versatile and secure.

The User Management System with Node.js, Express, and EJS is a starting point for building applications that require user management, and it can be customized and extended to meet specific project requirements.
