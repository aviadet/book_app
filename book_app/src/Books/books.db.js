/*
Here, usually all the queries to db will sit
*/

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const book_schema = new schema({
    name: {
        type: String
    },
    loan: {
        type: String
    }
}, { timestamps: true });

const Books = mongoose.model('Books', book_schema);
module.exports = Books;