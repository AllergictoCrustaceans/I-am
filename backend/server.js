const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

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
//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Routes
app.use('/api/users', users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

