/*
    A route file only recieves, forwards and reply
    recieve a request, forwards to a service, reply to the request sender
    There should be no logic in the route
*/

const express = require('express');
const router = express.Router();
const books_path = './Books.json';
const fs = require(`fs`);
const {getAllBooks, getBookById, createBook, updateBook, deleteBook} = require('./books.service');

// Gets all Books
router.get('/', async (req, res) => {
    try{
        const getAllBooksResponse = await getAllBooks(books_path);
        res.send(getAllBooksResponse);
        const timeStamp = new Date().toLocaleString();
        console.log(`${timeStamp} executed: ${req.method}`);
    }catch(error){
        res.status(500).send(`Something went wrong: ${error}`);
    }
});

/*

// Get a single Book
router.get('/:id', (req, res) => {
    fs.readFile(books_path, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        try {
            const books = JSON.parse(jsonString);
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
*/
module.exports = router;