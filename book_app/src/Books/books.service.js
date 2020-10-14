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

const getAllBooks = async books_path => {
    if(!books_path.length)
        throw new Error('A path to a file must be provided');
    
    try{
        return await readFile(books_path);
    }catch(error){
        throw new Error('Read file operation failed: ' + error.message);
    }
}

const getBookById = books_path => {
    
}

const createBook = books_path => {
    
}

const updateBook = books_path => {
    
}

const deleteBook = books_path => {
    
}

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
}