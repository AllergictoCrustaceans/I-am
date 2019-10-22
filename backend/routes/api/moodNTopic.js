const express = require('express');
const router = express.Router();
let topic = require('../../models/Topic');
let chatlog = require('../../models/ChatLog');

// //combine chatlog and topic database together
// //assign colors to the sentiments.
// router.ChatLog.find({
// 	"$where": "this.CT Chatlog.botInput, Chatlog.userInput, Chatlog.date FROM ChatLog INNER JOIN User as User ON User.name  == this. Chatlog.name "
// },{
// 	"Chatlog.botInput": 1,
// 	"Chatlog.userInput": 1,
// 	"Chatlog.date": 1
// }
// ).sort({
// 	"Chatlog.date": 1
// });

// router.get('/mood', (req, res) => {

// })