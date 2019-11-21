import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  console.log(event);
  const params = {
    TableName: process.env.tableName,
    ProjectionExpression: '#userID, topic, overallSentiment, positive, neutral, mixed, negative',
    KeyConditionExpression: '#userID = :userID',
    ExpressionAttributeNames: {
      '#userID' : 'userID'
    },
    ExpressionAttributeValues: {
      ':userID' : event.queryStringParameters.email
    }
  };

  try {
    const result = await dynamoDbLib.call("query", params);
    if (result.Items) {
      return success(result.Items);
    } else {
      return failure({ status: false, error: "Item not found." });
    }
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}