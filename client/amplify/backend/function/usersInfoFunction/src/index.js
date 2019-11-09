const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');
const documentClient = new AWS.DynamoDB.DocumentClient({region:'us-west-2'});
const server = awsServerlessExpress.createServer(app);

AWS.config.update({region: 'us-west-2'})

exports.handler = async (event, context) => {
  let responseBody = '';
  let statusCode = 0;
  const putUsersTable = {
    TableName: 'usersTable',
    Item: {
      ID: 1,
      Name: 'Joe Schmo',
      Email: 'schmo@momo.com',
      Timestamp: Date.now()
    }
  }

  const data = await documentClient(putUsersTable).promise();
  try {
    responseBody = JSON.stringify(data);
  } catch(err) {
    responseBody = `Unable to create user. ${err}`;
  }

  console.log(`EVENT: ${JSON.stringify(event)}`);
  awsServerlessExpress.proxy(server, event, context);
};
