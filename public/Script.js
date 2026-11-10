
const form = document.getElementById('book-form');
const message = document.getElementById('message');
const booksList = document.getElementById('books-list');

// Get and display all books
async function loadBooks() {
    message.textContent = 'Loading books...';

    try {
        const response = await fetch('/books');
        const books = await response.json();

        if (!response.ok) {
            throw new Error(books.message || 'Could not load books');
        }

        booksList.innerHTML = '';

        if (books.length === 0) {
            booksList.textContent = 'No books yet. Add your first book!';
        } else {
            books.forEach(book => {
                const bookDiv = document.createElement('div');
                bookDiv.className = 'book';

                const title = document.createElement('h3');
                title.textContent = book.title;

                const author = document.createElement('p');
                author.textContent = 'Author: ' + book.author;

                // Update button
                const editButton = document.createElement('button');
                editButton.textContent = 'Update';

                editButton.addEventListener('click', async function() {
                    const newTitle = prompt(
                        'Enter the new book title:',
                        book.title
                    );

                    if (newTitle === null) {
                        return;
                    }

                    const newAuthor = prompt(
                        'Enter the new author:',
                        book.author
                    );

                    if (newAuthor === null) {
                        return;
                    }

                    if (!newTitle.trim() || !newAuthor.trim()) {
                        message.textContent =
                            'Error: Title and author cannot be empty.';
                        return;
                    }

                    message.textContent = 'Updating book...';

                    try {
                        const response = await fetch('/books/' + book._id, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                title: newTitle.trim(),
                                author: newAuthor.trim()
                            })
                        });

                        const result = await response.json();

                        if (!response.ok) {
                            throw new Error(
                                result.message || 'Could not update book'
                            );
                        }

                        message.textContent = 'Book updated successfully!';
                        await loadBooks();
                    } catch (error) {
                        message.textContent = 'Error: ' + error.message;
                    }
                });

                // Delete button
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.style.marginLeft = '10px';

                deleteButton.addEventListener('click', async function() {
                    const confirmDelete = confirm(
                        'Are you sure you want to delete this book?'
                    );

                    if (!confirmDelete) {
                        return;
                    }

                    message.textContent = 'Deleting book...';

                    try {
                        const response = await fetch('/books/' + book._id, {
                            method: 'DELETE'
                        });

                        const result = await response.json();

                        if (!response.ok) {
                            throw new Error(
                                result.message || 'Could not delete book'
                            );
                        }

                        message.textContent = 'Book deleted successfully!';
                        await loadBooks();
                    } catch (error) {
                        message.textContent = 'Error: ' + error.message;
                    }
                });

                bookDiv.appendChild(title);
                bookDiv.appendChild(author);
                bookDiv.appendChild(editButton);
                bookDiv.appendChild(deleteButton);

                booksList.appendChild(bookDiv);
            });
        }

        // Clear loading message after books are displayed
        message.textContent = '';
    } catch (error) {
        message.textContent = 'Error: ' + error.message;
    }
}

// Add a new book
form.addEventListener('submit', async function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const author = document.getElementById('author').value.trim();

    if (!title || !author) {
        message.textContent = 'Error: Title and author are required.';
        return;
    }

    message.textContent = 'Saving book...';

    try {
        const response = await fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, author })
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Could not add book');
        }

        form.reset();
        message.textContent = 'Book added successfully!';
        await loadBooks();
    } catch (error) {
        message.textContent = 'Error: ' + error.message;
    }
});

// Load books when the page opens
loadBooks();
