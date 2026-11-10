const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));


// Middleware to read JSON data
app.use(express.json());
app.use(express.static('public'));

// Book model
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    }
});

const Book = mongoose.model('Book', bookSchema);

// GET - Get all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get books"
        });
    }
});



// GET - Get one book
app.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(400).json({
            message: "Invalid book ID"
        });
    }
});


 // POST - Create a new book
app.post('/books', async (req, res) => {
    const { title, author } = req.body;

    if (
        typeof title !== 'string' ||
        typeof author !== 'string' ||
        !title.trim() ||
        !author.trim()
    ) {
        return res.status(400).json({
            message: "Title and author are required and cannot be empty."
        });
    }

    try {
        const newBook = await Book.create({
            title: title.trim(),
            author: author.trim()
        });

        res.status(201).json(newBook);
    } catch (error) {
        console.error("Create book error:", error);

        res.status(500).json({
            message: "Failed to create book"
        });
    }
});


 // PUT - Update a book
app.put('/books/:id', async (req, res) => {
    const { title, author } = req.body;

    // Validate the title and author
    if (
        typeof title !== 'string' ||
        typeof author !== 'string' ||
        !title.trim() ||
        !author.trim()
    ) {
        return res.status(400).json({
            message: "Title and author are required and cannot be empty."
        });
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            {
                title: title.trim(),
                author: author.trim()
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(updatedBook);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: "Invalid book data."
            });
        }

        res.status(400).json({
            message: "Invalid book ID or book data"
        });
    }
});


// DELETE - Delete a book
app.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully",
            book: deletedBook
        });
    } catch (error) {
        res.status(400).json({
            message: "Invalid book ID"
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});