const connectToMongo = require('./database');
const express = require('express');
const app = express();
const PORT = 3000;
var cors = require('cors')

connectToMongo();

app.use(cors());

app.use(express.json());

app.use(express.static(__dirname+'./uploads'))

app.use('/user/auth', require('./routes/users'));
app.use('/user/profile', require('./routes/profiles'));

app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
});