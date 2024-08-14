const express = require('express');
const dbConnection = require('./config/db');
require('dotenv').config()

const app = express();

dbConnection()

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log(`Server Started at ${PORT}`)
})