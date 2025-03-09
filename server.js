const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

// Router tanımlamaları yapıldı.
app.use('/api/contacts', require('./routes/contactRoute'));

// Error handler middleware'i en sona eklenmelidir.
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});