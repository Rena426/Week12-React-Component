# Week 7 Books CRUD Application

## Project Description

This project is a simple book management application built with Node.js, Express, and MongoDB. It includes a frontend webpage that allows users to add, view, update, and delete books.

The frontend uses JavaScript Fetch API to communicate with the Express backend without reloading the page. Book information is stored in MongoDB so it remains saved after the server restarts.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- HTML
- CSS
- JavaScript

## How to Run

1. Install Node.js.
2. Clone or download this repository.
3. Open the project folder in a terminal.
4. Install the dependencies:

   ```bash
   npm install
   ```

5. Create a `.env` file in the project folder and add your MongoDB connection string:

   ```text
   MONGO_URI=your_mongodb_connection_string
   ```

   Replace the example value with your own MongoDB connection string. Do not upload your `.env` file to GitHub.

6. Start the server:

   ```bash
   node Server.js
   ```

7. Open the application in your browser:

   http://localhost:3000

## API Reference

| Method | Endpoint | Description |
|---|---|---|
| GET | `/books` | Returns all books |
| GET | `/books/:id` | Returns one book by ID |
| POST | `/books` | Creates a new book |
| PUT | `/books/:id` | Updates an existing book |
| DELETE | `/books/:id` | Deletes a book |

## Validation and Error Handling

The server checks that book titles and authors are provided and are not empty or made only of spaces. It returns appropriate HTTP status codes for successful requests and errors.

## Screenshots

Screenshots demonstrating the CRUD operations and validation tests will be included with the project submission.

## AI Use Disclosure

I used ChatGPT to help me understand and develop parts of this application, troubleshoot errors, improve validation, and prepare the project documentation. I tested the application using the browser and Thunder Client and made changes while following the instructions and reviewing the code.