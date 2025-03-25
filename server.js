const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const connectionDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();

connectionDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Router tanımlamaları yapıldı.
app.use('/api/contacts', require('./routes/contactRoute'));
app.use('/api/users', require('./routes/userRoute'));

// Error handler middleware'i en sona eklenmelidir.
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});