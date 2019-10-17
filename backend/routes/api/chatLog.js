const express = require('express');
const router = express.Router();
let ChatLog = require('../../models/ChatLog');

//NO ROUTES FOR DELETING, UPDATING

//GET chatlog database userInput, botInput ONLY
router.get('/chatlog', (req, res) => {
    ChatLog.find()
    .then((chatlog) => res.json(chatlog))
    .catch((err) => res.status(400).json('Error:' + err))
});


//GET parts of the chatlog database
router.get('/chatlog/:id', (req, res) => {
    ChatLog.findById(req.params.id) 
    .then(() => res.json(chatlog))
    .catch((err) => res.status(400).json('Error:' + err))
});

//POST user input into the chatlog database
router.post('/chatlog', (req, res) => {
    ChatLog.create(req.body) 
    .then(() => res.json('User input sent to chatlog database'))
    .catch((err) => res.status(400).json('Error:' + err))
});


module.exports = router;

