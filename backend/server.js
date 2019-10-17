const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

const app = express();

//Middleware
app.use(bodyParser.urlencoded ({extended: false}));
app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

//Mongoose connection
mongoose.connect(
    db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    }
)
.then(() => console.log('MongoDB successful connection.'))
.catch(err => console.log(err));

const users = require('./routes/api/users');
const chatlog = require('./routes/api/chatlog');
const mood = require('./routes/api/mood'); 

//Middleware
app.use(passport.initialize());
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Passport config
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);
app.use('/api/chatlog', chatlog);
app.use('/api/mood', mood);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

