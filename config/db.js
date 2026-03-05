const mongoose = require('mongoose');

const connectDB = async () => {
    let MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://fanyanwu83:2gzYARFKvDE8DBvR@cluster0.nvozb5i.mongodb.net/moderate_ustaz?retryWrites=true&w=majority&appName=Cluster0';

    if (MONGODB_URI.startsWith('MONGODB_URI=')) {
        MONGODB_URI = MONGODB_URI.replace('MONGODB_URI=', '');
    }

    try {
        const conn = await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.log('Server running without database connection');
        // Don't exit process since the app handles disconnected state
        return null;
    }
};

module.exports = connectDB;
