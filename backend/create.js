import uuid from "uuid";
import AWS from 'aws-sdk';
import * as dynamoDbLib from "./libs/dynamodb-lib";
import {success, failure} from "./libs/response-lib";

const comprehend = new AWS.Comprehend();

export async function main(event, context) {
  // const data = JSON.parse(event.body);

  const params = {
    Text: event.inputTranscript,
    LanguageCode: 'en'
  };

  const response = await comprehend.detectSentiment(params).promise();
  console.log(response);
  let sentiment;

  const putParams = {
    TableName: process.env.tableName,
    Item: {
      userID: event.requestContext.identity.cognitoIdentityId,
      messageID: uuid.v1(),
      userInput: params.Text, //data.content,
      botInput: sentiment.dialogAction.message.content,
      positive: response.SentimentScore.Positive,
      neutral: response.SentimentScore.Neutral,
      mixed: response.SentimentScore.Mixed,
      negative: response.SentimentScore.Negative,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", putParams);
    return success(putParams.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}