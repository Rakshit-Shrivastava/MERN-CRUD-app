const connectToMongo = require('./database');
const express = require('express');
const app = express();
const PORT = 3000;
var cors = require('cors');

// function call to connect to database
connectToMongo();

// cores policy
app.use(cors());

// middleware for using JSON format
app.use(express.json());

// defining static folder
app.use(express.static(__dirname+'./uploads'))

// routes for api call
app.get('/', (req, res)=>{
    res.send("Hello world, Welcome to my youtube channel. Subscribe for more such videos.");
})
app.use('/user/auth', require('./routes/users'));
app.use('/user/profile', require('./routes/profiles'));

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
});