const express = require('express');
const router = express.Router();
let ChatLog = require('../../models/ChatLog');

const AWS = require('aws-sdk');
const comprehend = new AWS.Comprehend({
    region: 'us-west-2'
});



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
router.post('/chatlog', async (req, res) => {
    if(!req.body.userInput || !req.body.userID || !req.body.date || !req.body.botInput) {
        return res.status(400).json('Error. Incorrect input.');
    } 
    const userInput = req.body.userInput;
    const userID = req.body.userID;
    const date = req.body.date;
    const botInput = req.body.botInput;

    // DETECT TEXT SENTIMENT
    const sentimentParams = {
        LanguageCode: 'en',
        Text: userInput
    }
    
    const data = await comprehend.detectSentiment(sentimentParams).promise();

    const overallSentiment = data.Sentiment;
    const positive = data.SentimentScore.Positive;
    const mixed = data.SentimentScore.Mixed;
    const neutral = data.SentimentScore.Neutral;
    const negative = data.SentimentScore.Negative;

    const newChatLog = new ChatLog ({
        userID,
        userInput,
        botInput,
        date,
        overallSentiment,
        positive,
        mixed,
        neutral,
        negative
    });

    console.log(data);

    newChatLog.save()
    .then(() => res.json('User input sent to chatlog database'))
    .catch((err) => res.status(400).json('Error:' + err))
});


module.exports = router;

