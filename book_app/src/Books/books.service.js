/*
    The service files are responsible for recieving requests from the end points
    They are incharge of all the logic
    They may communicate with other services
    after and if there are any validations or logic to implement on the requests
    once they are done the service will forward the query to the db file
    after it recieves the response to the query, they return the response to he end point
    which, in turn, returns the reply to the request sender(another service, application, frontend etc.)
*/

const Books = require('./books.db');

const getAllBooks = async () => {
    try {
        return await Books.find();
    }
    catch (error) {
        throw new Error('Read DB operation failed: ' + error.message);
    }
}

const getBookById = async (book_id) => {
    try {  
        return await Books.findById(book_id);
    }
    catch (error) {
        throw new Error('Read file operation failed: ' + error.message);
    }
}

const createBook = async (body) => {
    try {
        const newBook = new Books({
            name: body.name,
            loan: 'False'
        });
        if (!newBook.name) {
            return 'Please enter the book name';
        };

        await newBook.save();
        return 'Book added successfully!';
    }
    catch (error) {
        throw new Error('Create new Book operation failed: ' + error.message);
    }
}

const updateBook = async (book_id, body) => {
    try {
        let updBook = {
            name: body.name,
            loan: body.loan
        }

        await Books.findByIdAndUpdate(book_id, { $set: updBook });
        return 'Book been updated';
    }
    catch (error) {
        throw new Error('Update book operation failed: ' + error.message);
    }
}

const deleteBook = async (book_id) => {
    try {
        await Books.findByIdAndRemove(book_id);
        return 'Book Deleted';
    }
    catch (error) {
        throw new Error('Delete book operation failed: ' + error.message);
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}