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
                    "content" : "Wow! That's something to celebrate. :) I'll log this good vibe for ya. Check your moods!"
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
                    "content" : "I'm not sure how I feel about this either. Hmm, tell you what, I'll log this 'meh' vibe for ya. Check your moods!"
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
                    "content" : "I understand. Hey-- but you know what? There's nothing wrong with feeling neutral about this. That's what makes us human. I got your feelings on memory. Check your moods! :) "
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
                    "content" : "Ooof. That sounds rough :/ I'll log this sad vibe from ya, but chin up you know? You're still an amazing person! Check your moods when you ready :)"
                }
            }
        };
    }

        const putParams = {
            TableName: 'UsersMessages',
            Item: {
                "userID" : event.currentIntent.slots.email,
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

        try {
            const result = await documentClient.put(putParams).promise();
            console.log("Success", result);
        } catch(e) {
            console.log(e);
        }

        console.log(":)");

    return sentiment;
}

exports.main = main;
