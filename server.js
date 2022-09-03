const express = require('express');
const app = express();
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
monoose = require('mongoose');
const PORT = process.env.PORT || 3500;
const corsOptions = require('./config/corsOptions');
const connectDB = require('./config/dbConn');
const { mongoose } = require('mongoose');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
require('dotenv').config()

connectDB()
// custom middleware logger
app.use(logger);

// Cross Origin Resource Sharing

app.use(cors(corsOptions));

// built-in middleware to handle urlencoded data
// in other words, form data:  
// ‘content-type: application/x-www-form-urlencoded’
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

// middleware for cookieParser
app.use(cookieParser());

// routes
app.use('/api/register', require('./api/register'));
app.use('/api/auth', require('./api/auth'));
app.use('/api/refresh', require('./api/refresh'));

app.use(verifyJWT)
app.use('/employees', require('./api/api/employees'));

app.use(errorHandler);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));