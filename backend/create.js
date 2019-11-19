const uuid = require('uuid');
const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

const comprehend = new AWS.Comprehend();
const documentClient = new AWS.DynamoDB.DocumentClient({region: 'us-west-2'});

async function main(event, context) {
    console.log("******************************************", event);
    const params = {
        Text: event.currentIntent.slots.thoughts,
        LanguageCode: 'en'
    };

    const response = await comprehend.detectSentiment(params).promise();
    console.log("*************************************", response);
    let sentiment;

    if(response.Sentiment === "POSITIVE") {
        sentiment = {
            "sessionAttributes" : {
                "sentiment" : response.Sentiment
            },
            "dialogAction" : {
                "type" : "Close",
                "fulfillmentState" : "Fulfilled",
                "message" : {
                    "contentType" : "PlainText",
                    "content" : "Wow! That's something to celebrate. :) Do you feel like this incident taught you something new about yourself?"
                }
            }
        };
    } else if(response.Sentiment === "MIXED") {
        sentiment = {
            "sessionAttributes" : {
                "sentiment" : response.Sentiment
            },
            "dialogAction" : {
                "type" : "Close",
                "fulfillmentState" : "Fulfilled",
                "message" : {
                    "contentType" : "PlainText",
                    "content" : "I'm not sure how I feel about this either. The good and the bad parts are necessary, don't ya think?"
                }
            }
        };
    } else if(response.Sentiment === "NEUTRAL") {
        sentiment = {
            "sessionAttributes" : {
                "sentiment" : response.Sentiment
            },
            "dialogAction" : {
                "type" : "Close",
                "fulfillmentState" : "Fulfilled",
                "message" : {
                    "contentType" : "PlainText",
                    "content" : "I understand. Hey-- but you know what? There's nothing wrong with feeling neutral about this. That's what makes us human. :) "
                }
            }
        };
    } else {
        sentiment = {
            "sessionAttributes" : {
                "sentiment" : response.Sentiment
            },
            "dialogAction" : {
                "type" : "Close" ,
                "fulfillmentState" : "Fulfilled",
                "message" : {
                    "contentType" : "PlainText",
                    "content" : "Ooof. That sounds rough :/ How have you been holding up since this happened?"
                }
            }
        };
    }
        const putParams = {
            TableName: 'UsersMessages',
            Item: {
                "userID": event.currentIntent.slots.name,
                "messageID": uuid.v1(),
                "timestamp": Date.now(),
                "userInput": params.Text,
                "botInput": sentiment.dialogAction.message.content,
                "topic" : event.currentIntent.slots.subject,
                "overallSentiment": response.Sentiment,
                "positive": response.SentimentScore.Positive,
                "neutral": response.SentimentScore.Neutral,
                "mixed": response.SentimentScore.Mixed,
                "negative": response.SentimentScore.Negative
            },
        };
        console.log("***************************************", sentiment);


        await documentClient.put(putParams).promise();
    return sentiment;
}

exports.main = main;
