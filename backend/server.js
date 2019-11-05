const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});
require('dotenv').config();

const app = express();

//connect DynamoDB

//Middleware
app.use(bodyParser.urlencoded ({extended: false}));
app.use(bodyParser.json());


const users = require('./routes/api/users');
const moods = require('./routes/api/moods'); 

//Middleware
app.use(passport.initialize());
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Passport config
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/moods', moods);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

