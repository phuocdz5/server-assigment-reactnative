const {mongoose} = require('mongoose')
require('dotenv').config();

const dbUrl = process.env.MONGODB_URI || 'mongodb+srv://admin:phuocdaica624@cluster0.on1mfeq.mongodb.net/'

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(dbUrl);

        console.log('Connect to mongodb successfully');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;