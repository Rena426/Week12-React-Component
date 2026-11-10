
import { useState, useEffect } from 'react';
import Header from './components/Header';
import BookCard from './components/BookCard';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('Loading books...');

  // Get books from the Express API
  useEffect(() => {
    fetch('/books')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load books');
        }
        return response.json();
      })
      .then((data) => {
        setBooks(data);
        setMessage('');
      })
      .catch(() => {
        setMessage('Could not load books. Check the server connection.');
      });
  }, []);

  // Add a new book
  const addBook = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, author }),
      });

      if (!response.ok) {
        throw new Error('Could not add book');
      }

      const newBook = await response.json();

      setBooks((previousBooks) => [...previousBooks, newBook]);
      setTitle('');
      setAuthor('');
      setMessage('');
    } catch (error) {
      setMessage('Could not add book. Please try again.');
    }
  };

  return (
    <div className="app">
      <Header />

      <main>
        <h2>Add a Book</h2>

        <form onSubmit={addBook}>
          <input
            type="text"
            placeholder="Book title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Author name"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            required
          />

          <button type="submit">Add Book</button>
        </form>

        <h2>My Books</h2>

        {message && <p>{message}</p>}

        <div className="book-list">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>

        {!message && books.length === 0 && (
          <p>No books found. Add your first book!</p>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
