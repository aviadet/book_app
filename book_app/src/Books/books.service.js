/*
    The service files are responsible for recieving requests from the end points
    They are incharge of all the logic
    They may communicate with other services
    after and if there are any validations or logic to implement on the requests
    once they are done the service will forward the query to the db file
    after it recieves the response to the query, they return the response to he end point
    which, in turn, returns the reply to the request sender(another service, application, frontend etc.)
*/

const fs = require('fs');
const util = require('util');

//Turns a callback based asyncv function to a promise based function
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const getAllBooks = async books_path => {
    if(!books_path.length)
        throw new Error('A path to a file must be provided');  
    try {
        return await readFile(books_path);
    }
    catch (error) {
        throw new Error('Read file operation failed: ' + error.message);
    }
}

const getBookById = async (books_path, book_id) => {
    if (!books_path.length)
        throw new Error('A path to a file must be provided');
    try {
        const jsonFile = await readFile(books_path);
        const books = JSON.parse(jsonFile);
    
        const found = books.some(book => book.id === parseInt(book_id));
        if (found) {
            const wanted_book = books.filter(book => book.id === parseInt(book_id));
            return wanted_book;
        }
        else {
            return (`No Book with the id of ${book_id}`);
        }
    }
    catch (error) {
        throw new Error('Read file operation failed: ' + error.message);
    }
}

const createBook = async (books_path, body) => {
    if (!books_path.length)
        throw new Error('A path to a file must be provided');
    try {
        const jsonFile = await readFile(books_path);
        const books = JSON.parse(jsonFile);

        const newBook = {
            id: (books.length + 1),
            name: body.name,
            loan: 'False'
        };

        if (!newBook.name) {
            return 'Please enter the book name';
        };

        books.push(newBook);
        await writeFile(books_path, JSON.stringify(books, null, 2), (err) => {
            if (err) console.log('Error writing file:', err);
        });
        return books;
    }
    catch (error) {
        throw new Error('Read file operation failed: ' + error.message);
    }
}

const updateBook = async (books_path, book_id, body) => {
    if (!books_path.length)
        throw new Error('A path to a file must be provided');
    try {
        const jsonFile = await readFile(books_path);
        const books = JSON.parse(jsonFile);

        const found = books.some(book => book.id === parseInt(book_id));

        if (found) {
            updBook = body;
            books.forEach(book => {
                if (book.id === parseInt(book_id)) {
                    book.name = updBook.name ? updBook.name : book.name;
                    book.loan = updBook.loan ? updBook.loan : book.loan;
                }
            });
            await writeFile(books_path, JSON.stringify(books, null, 2), (err) => {
                if (err) console.log('Error writing file:', err);
            });
            return `Book been updated`;
        }
        else {
            return `No Book with the id of ${book_id}`;
        }
    }
    catch (error) {
        throw new Error('Read file operation failed: ' + error.message);
    }
}

const deleteBook = async (books_path, book_id) => {
    if (!books_path.length)
        throw new Error('A path to a file must be provided');
    try {
        const jsonFile = await readFile(books_path);
        var books = JSON.parse(jsonFile);

        const found = books.some(book => book.id === parseInt(book_id));
        
        if (found) {
            books = books.filter(book => book.id !== parseInt(book_id));
            await writeFile(books_path, JSON.stringify(books, null, 2), (err) => {
                if (err) console.log('Error writing file:', err);
            });
            return 'Book Deleted';
        }
        else {
            return `No Book with the id of ${book_id}`;
        }
    }
    catch (error) {
        throw new Error('Read file operation failed: ' + error.message);
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}