import uuid from "uuid";
import AWS from "aws-sdk";

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const comprehend = new AWS.Comprehend();

async export function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
    console.log(data);
  const params = {
      Text: data.inputTranscript,
      LanguageCode: 'en'
  };

  const response = await comprehend.detectSentiment(params).promise();

  let sentiment;

  if(response.Sentiment === "POSITIVE") {
      sentiment = {
          "sessionAttributes" : {
              "sentiment" : sentiment
          },
          "dialogAction" : {
              "type" : "Close",
              "fulfillmentState" : "Fulfilled",
              "message" : {
                  "contentType" : "PlainText",
                  "content" : "Wow! That's something to celebrate! :)"
              }
          }
      }
  } else if(response.Sentiment === "MIXED") {
      sentiment = {
          "sessionsAttributes" : {
              "sentiment" : sentiment
          },
          "dialogAction" : {
              "type" : "Close",
              "fulfillmentState" : "Fulfilled",
              "message" : {
                  "contentType" : "PlainText",
                  "content" : "I understand. There are good and bad parts, and all are necessary. "
              }
          }
      }
  } else if(response.Sentiment === "NEUTRAL") {
      sentiment = {
          "sessionAttributes" : {
              "sentiment" : sentiment
          },
          "dialogAction" : {
              "type" : "Close",
              "fulfillmentState" : "Fulfilled",
              "message" : {
                  "contentType" : "PlainText",
                  "content" : "I'm not sure how I'd feel either :/"
              }
          }
      }
  } else {
      sentiment = {
          "sessionAttributes" : {
              "sentiment" : sentiment
          },
          "dialogAction" : {
              "type" : "Close",
              "fulfillmentState" : "Fulfilled",
              "message" : {
                  "contenType" : "PlainText",
                  "content" : "Oooof! I'm sorry to hear that. That sounds rough :(. "
              }
          }
      }
  }

  const putParams = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      messageId: uuid.v1(),
      userInput: params.Text, //could be data.content
      botInput: sentiment.dialogAction.message.content,
      overallSentiment: response.Sentiment,
      Positive: response.SentimentScore.Positive,
      Neutral: response.SentimentScore.Neutral,
      Mixed: response.SentimentScore.Mixed,
      Negative: response.SentimentScore.Negative,
      attachment: data.attachment,
      createdAt: Date.now()
    }
  };

  dynamoDb.put(params, (error, data) => {
    // Set response headers to enable CORS (Cross-Origin Resource Sharing)
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    // Return status code 500 on error
    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({ status: false })
      };
      callback(null, response);
      return;
    }

    // Return status code 200 and the newly created item
    const response = {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
  });
}