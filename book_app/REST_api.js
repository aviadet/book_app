const express = require('express');
const router = express.Router();
const books_path = './Books.json';
const fs = require(`fs`);

// Read DB
var books = [];
fs.readFile(books_path, 'utf8', (err, jsonString) => {
    if (err) {
        console.log("File read failed:", err);
        return;
    }
    try {
        books = JSON.parse(jsonString);
        console.log('DB been loaded');
    }
    catch (err) {
        console.log('Error parsing JSON string:', err);
    };

});

// Gets all Books
router.get('/', (req, res) => {
    fs.readFile(books_path, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        try {
            books = JSON.parse(jsonString);
        }
        catch (err) {
            console.log('Error parsing JSON string:', err);
        };

    });
    res.json(books);
    const timeStamp = new Date().toLocaleString();
    console.log(`${timeStamp} executed: ${req.method}`);
});

// Get a single Book
router.get('/:id', (req, res) => {
    fs.readFile(books_path, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        try {
            books = JSON.parse(jsonString);
        }
        catch (err) {
            console.log('Error parsing JSON string:', err);
        };

    });
    const found = books.some(book => book.id === parseInt(req.params.id));
    if (found) {
        res.json(books.filter(book => book.id === parseInt(req.params.id)));
        const timeStamp = new Date().toLocaleString();
        console.log(`${timeStamp} executed: ${req.method}, for book id ${req.params.id}`);
    }
    else {
        res.status(400).json({
            msg: `No Book with the id of ${req.params.id}`
        });
    }
    
});

// Create Book
router.post('/', (req, res) => {
    // res.send(req.body);
    
    const newBook = {
        id: (books.length + 1),
        name: req.body.name,
        loan: 'False'
    };

    if (!newBook.name) {
        return res.status(400).json({ msg: 'Please enter the book name' });
    };

    books.push(newBook);
    res.json(books);
    fs.writeFile(books_path, JSON.stringify(books, null, 2), (err) => {
        if (err) console.log('Error writing file:', err);
    });
    const timeStamp = new Date().toLocaleString();
    console.log(`${timeStamp}executed: ${req.method}`);

});

// Update Book
router.put('/:id', (req, res) => {
    const found = books.some(book => book.id === parseInt(req.params.id));

    if (found) {
        updBook = req.body;
        books.forEach(book => {
            if (book.id === parseInt(req.params.id)) {
                book.name = updBook.name ? updBook.name : book.name;
                book.loan = updBook.loan ? updBook.loan : book.loan;

                res.json({ msg: 'Book updated', book });
            }
        })
        fs.writeFile(books_path, JSON.stringify(books, null, 2), (err) => {
            if (err) console.log('Error writing file:', err);
        });
        const timeStamp = new Date().toLocaleString();
        console.log(`${timeStamp} executed: ${req.method}, for book id ${req.params.id}`);
    }
    else {
        res.status(400).json({
            msg: `No Book with the id of ${req.params.id}`
        });
    }
});

// Delete Book
router.delete('/:id', (req, res) => {
    const found = books.some(book => book.id === parseInt(req.params.id));

    if (found) {
        books = books.filter(book => book.id !== parseInt(req.params.id));
        res.json({ msg: 'Book Deleted',  books});
        fs.writeFile(books_path, JSON.stringify(books, null, 2), (err) => {
            if (err) console.log('Error writing file:', err);
        });
        const timeStamp = new Date().toLocaleString();
        console.log(`${timeStamp} executed: ${req.method}, for book id ${req.params.id}`);
    }
    else {
        res.status(400).json({
            msg: `No Book with the id of ${req.params.id}`
        });
    }
});

module.exports = router;