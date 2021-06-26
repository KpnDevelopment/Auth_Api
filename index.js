const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');


// import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post');


dotenv.config();


// mongo connect 
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("db Connected"))


// middleware

app.use(express.json());

// route middle ware
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);

app.listen(4001, () => console.log("server started"));