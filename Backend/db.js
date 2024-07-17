require('dotenv').config();
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);

const mongoURI = 'mongodb://localhost:27017/10-06-2024';

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        .then(() => console.log('Connected to MongoDB'))
        .catch(e => console.log(e));
}
module.exports = connectToMongo;
