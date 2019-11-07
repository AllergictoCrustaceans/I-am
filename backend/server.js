const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

const passport = require('passport');
const bodyParser = require('body-parser');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

const strategyForJwt = new JwtStrategy (options, (payload, next) => {

})

passport.use(strategyForJwt);
app.use(passport.initialize());
app.use(bodyParser.urlencoded ({
    extended: false
}));
app.use(bodyParser.json());

//connect DynamoDB

//Middleware
app.use(bodyParser.urlencoded ({extended: false}));
app.use(bodyParser.json());
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// const users = require('./routes/api/users');
const moods = require('./routes/api/moods'); 

//Passport config
require('./config/passport')(passport);

//Routes
// app.use('/api/users', users);
app.use('/api/moods', moods);


app.get('/', (req, res) => {
    res.send('Are you working bruh');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

