const express = require('express');
const router = express.Router();
let topic = require('../../models/Topic');
let chatlog = require('../../models/ChatLog');

//combine chatlog and topic database together
//assign colors to the sentiments.


router.get('/mood', (req, res) => {

})