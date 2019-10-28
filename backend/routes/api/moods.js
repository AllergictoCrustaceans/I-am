const express = require('express');
const router = express.Router();
let ChatLog = require('../../models/ChatLog');

let AWS = require('aws-sdk');
const comprehend = new AWS.Comprehend({
    region: 'us-west-2'
});

// NO ROUTES FOR DELETING, UPDATING

//GET all sentiment values with colorful nodes from ChatLog database
router.get('/mood', (req, res) => {
    ChatLog.find({}, {
        "positive" : 1,
        "mixed" : 1,
        "neutral" : 1,
        "negative" : 1,
    })
    .then((moods) => res.json(moods))
    .catch((err) => res.status(400).json('Error' + err))
})

//GET keywords associated to sentiment values from ChatLog database
router.get('/mood/:id', (req, res) => {
    ChatLog.find({}, {
        "keywords" : 1,
        "date" : 1
    }).sort({
        "date" : 1
    })
    .then((mood) => res.json(mood))
    .catch((err) => res.status(400).json('Error:' + err))
});

//POST comprehend keyphrase data into the ChatLog database
router.post('/moods', async (req, res) => {
    const userInput = req.body.userInput;
    const userID = req.body.userID;

    // DETECT KEYPHRASE
    const keyphraseParams = {
        LanguageCode : 'en',
        Text: userInput
    }

    const data = await comprehend.detectKeyPhrases(keyphraseParams).promise();
    

    const keywords = data.KeyPhrases.Text;

    const newTopic = new Topic ({
        userInput,
        userID,
        keywords,
    });

    console.log(data);

    newTopic.save()
    .then(() => res.json('Keyphrase and its details sent to Topic database.'))
    .catch((err) => res.status(400).json('Error:' + err))
});


module.exports = router;