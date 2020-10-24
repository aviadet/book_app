/*
    A route file only recieves, forwards and reply
    recieve a request, forwards to a service, reply to the request sender
    There should be no logic in the route
*/

const express = require('express');
const router = express.Router();
const books_path = './data/db/Books.json';
const {getAllBooks, getBookById, createBook, updateBook, deleteBook} = require('./books.service');

// Gets all Books
router.get('/', async (req, res) => {
    try {
        const getAllBooksResponse = await getAllBooks(books_path);
        res.send(getAllBooksResponse);
        const timeStamp = new Date().toLocaleString();
        console.log(`${timeStamp} executed: ${req.method}`);
    }
    catch (error) {
        res.status(500).send(`Something went wrong: ${error}`);
    }
});



// Get a single Book
router.get('/:id', async (req, res) => {
    try {
        const getBookByIdResponse = await getBookById(books_path, req.params.id);
        console.log(getBookByIdResponse);
        res.json(getBookByIdResponse);
        const timeStamp = new Date().toLocaleString();
        console.log(`${timeStamp} executed: ${req.method}, for book id ${req.params.id}`);
    }
    catch (error) {
        res.status(500).send(`Something went wrong: ${error}`);
    }  
});

// Create Book
router.post('/', async (req, res) => {
    try {
        const createBookResponse = await createBook(books_path, req.body);
        res.send(createBookResponse);
        const timeStamp = new Date().toLocaleString();
        console.log(`${timeStamp}executed: ${req.method}`);
    }
    catch (error) {
        res.status(500).send(`Something went wrong: ${error}`);
    }
});

// Update Book
router.put('/:id', async (req, res) => {
    try {
        const updateBookResponse = await updateBook(books_path, req.params.id, req.body);
        res.send(updateBookResponse);
        const timeStamp = new Date().toLocaleString();
        console.log(`${timeStamp} executed: ${req.method}, for book id ${req.params.id}`);
    }
    catch (error) {
        res.status(500).send(`Something went wrong: ${error}`);
    } 
});

// Delete Book
router.delete('/:id', async (req, res) => {
    try {
        const deleteBookResponse = await deleteBook(books_path, req.params.id);
        res.send(deleteBookResponse);
        const timeStamp = new Date().toLocaleString();
        console.log(`${timeStamp} executed: ${req.method}, for book id ${req.params.id}`);
    }
    catch (error) {
        res.status(500).send(`Something went wrong: ${error}`);
    } 
});

module.exports = router;