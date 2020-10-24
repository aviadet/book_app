const express = require('express');
const app = express();
const books = require('./src/Books/books.routes');

const PORT = process.env.PORT || 5000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Books API Routes
app.use('/api/books', books);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
