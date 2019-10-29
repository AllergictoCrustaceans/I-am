const express = require('express');
const router = express.Router();
let ChatLog = require('../../models/ChatLog');

const AWS = require('aws-sdk');
const comprehend = new AWS.Comprehend({
    region: 'us-west-2'
});

const lexruntime = new AWS.LexRuntime();


//NO ROUTES FOR DELETING, UPDATING

//GET chatlog database userInput, botInput ONLY
router.get('/chatlog', (req, res) => {
    ChatLog.find({}, {
        "botInput" : 1,
        "userInput" : 1,
        "date" : 1
    }).sort({
        "date" : 1
    })
    .then((chatlog) => res.json(chatlog))
    .catch((err) => res.status(400).json('Error:' + err))
});

//Let's not implement this yet.
//GET parts (get conversations by date) of the ChatLog database
// router.get('/chatlog/:id', (req, res) => {
//     ChatLog.findById(req.params.id) 
//     .then((chatlog) => res.json(chatlog))
//     .catch((err) => res.status(400).json('Error:' + err))
// });
//Let's not implement this yet

//POST user input, and comprehend data into the ChatLog database
router.post('/chatlog', async (req, res) => {
    if(!req.body.userInput || !req.body.userID || !req.body.date || !req.body.botInput) {
        return res.status(400).json('Error. Incorrect input.');
    } 
    const userInput = req.body.userInput; //get from lex?
    const userID = req.body.userID;
    const date = req.body.date;
    const botInput = req.body.botInput; //get from lex?

    // DETECT TEXT SENTIMENT
    const sentimentParams = {
        LanguageCode: 'en',
        Text: userInput
    }
    
    //AWS Comprehend
    const data = await comprehend.detectSentiment(sentimentParams).promise();


    //GET TOPIC & botInput
    const lexParams = {
        botAlias: 'Test',
        botName: 'IAM',
        contentType: '',
        inputStream: '',
        userId: '',
        accept: '',
        requestAttributes: any,
        sessionAttributes: any,
        checkpointLabelFilter: ''
    }

    //AWS Lex
    const lexData = await lexruntime.postContent(lexParams).promise();

    console.log(lexData);

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
    .then(() => res.json('User input sent to ChatLog database'))
    .catch((err) => res.status(400).json('Error:' + err))
});


module.exports = router;

