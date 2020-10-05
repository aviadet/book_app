const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Books API Routes
app.use('/api/books', require('./REST_api'));

app.listen(PORT, () => console.log(`Servver started on port ${PORT}`));
