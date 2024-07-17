const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors');

connectToMongo();

const app = express()
const port = 5000
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    console.log("Connected to Backend")
})
app.use('/api/auth', require('./Routes/auth'));
app.use('/api/notes', require('./Routes/notes'));

app.listen(port, () => {
    console.log('Listening at port 5000')
})