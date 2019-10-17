const express = require('express');
const router = express.Router();
let Chat = require('../../models/Chat');

//NO ROUTES FOR DELETING, UPDATING

//GET entire chatlog database
router.get('/chathistory', (req, res) => {
    Chat.find()
    .then((chatlog) => res.json(chatlog))
    .catch((err) => res.status(400).json('Error:' + err))
});


//GET parts of the chatlog database
router.get('/chathistory/:id', (req, res) => {
    Chat.findById(req.params.id) 
    .then(() => res.json(chatlog))
    .catch((err) => res.status(400).json('Error:' + err))
});

//POST user input into the chatlog database
router.post('/chathistory', (req, res) => {
    Chat.create(req.body) 
    .then(() => res.json('User input sent to chatlog database'))
    .catch((err) => res.status(400).json('Error:' + err))
});


module.exports = router;

