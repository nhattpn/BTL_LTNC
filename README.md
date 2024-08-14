# ReactJs and Nodejs App

A full-stack web application built with React.js for the client-side and Node.Js with MongoDB for the server-side. The application is designed to provide users with an easy and secure way to manage their academic data (for students and teachers).

## Installation

To install and run the application, follow these steps:

1. Clone the repository to your local machine
2. Navigate to the "qlsv_be" directory and replace a .env file with the following variables (.env already exist because we don't care about this project anymore):

```
JWT_SECRET=xxxxxx
ATLAS_URI=mongodb+srv://viewer123:keytovictory@cluster1.......
PORT=5000
CLOUDINARY_CLOUD_NAME = '<your_cloudinary_name>'
CLOUDINARY_API_KEY = 'xxxxxxxxxxxxxxx' 
CLOUDINARY_API_SECRET = 'xxxxxxxxxxxxxxxxxxxxxxxx' 
```

4. Make sure that the JWT Token, in your `env`, matches the one on the MongoDB Atlas Server.
5. Run the NodeJs application by running `npm start` in the "qlsv_be" directory
6. Navigate to the "login-frontend" directory and run `npm install` to install the required packages
7. Run the client-side by running `npm start`

## Technologies Used

- Node.js and Express
- React.Js
- Redux
- MongoDB
- PrimeReact

## Features

- Secure authentication using Spring Security
- Easy database configuration
- Responsive and modern UI design with PrimeReact
  -- Fast and efficient client-side rendering with React.js.
- Easy configuration with environment variables
- Good performance with split code, lazy loading.

## Origin branch DEMO

Link: https://youtu.be/s7xp0EB3fAw
