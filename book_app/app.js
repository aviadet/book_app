const express = require('express');
const app = express();
const books = require('./src/Books/books.routes');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/books', { useNewUrlParser: true, useUnifiedTopology: true });
const books_db = mongoose.connection;

books_db.on('error', (err) => {
    console.log(err)
});
books_db.once('open', () => {
    console.log('Database connection Established!');
})

const PORT = process.env.PORT || 5000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Books API Routes
app.use('/api/books', books);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
