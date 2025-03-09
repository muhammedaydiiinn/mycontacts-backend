const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectionDb = async () => {
    try {
       const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('MongoDB Connected: ', connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log('MongoDB Connection Failed');
        process.exit(1);
    }
}

module.exports = connectionDb;