const express = require('express');
const dbConnection = require('./config/db');
require('dotenv').config()

const app = express();

dbConnection()

// Middleware to parse JSON bodies
app.use(express.json());

//Index Page
app.get('/', (req, res)=>{
    res.send('Welcome to Contact-API...')
})

//ContactRoutes
const contactRoutes = require('./routes/contact');
app.use('/api', contactRoutes);

//UserRoutes
const UserRoutes = require('./routes/user');
app.use('/api', UserRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`)
})