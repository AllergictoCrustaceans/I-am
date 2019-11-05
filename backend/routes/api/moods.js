const express = require('express');
const router = express.Router();

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'}); 

const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

async function getUserTopic() {
    router.get('/moods', (req, res) => {
        const getTopicParams = {
            TableName : 'Messages',
            FilterExpression: '#t = :t AND #n = :n',
            ExpressionAttributeNames: {
                '#t' : 'Topic',
                '#n' : 'Name'
            },
            ExpressionAttributeValues: {
                // ":n" : the oauth email that the user is assocated to
                // ":t" : the topic name that the user selected on screen
            },
        }

        const data = await documentClient.scan(getTopicParams).promise();
        try {
            console.log(data);
        } catch(err) {
            console.log(err);
        }
    })  
}

exports.handler = getUserTopic;
module.exports = router;