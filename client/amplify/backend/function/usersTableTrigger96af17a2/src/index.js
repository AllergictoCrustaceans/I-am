exports.handler = function(event, context) {
  //eslint-disable-line
  // 1.) if user is authenticated, then put name, email, timestamp, and create id for that user.

  // 2.) if user goes to another endpoint (/mia, /moods), then get id and name from users table, and put it in messages table every time there's a UserInput. 
  console.log(JSON.stringify(event, null, 2));
  event.Records.forEach(record => {
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
  });
  context.done(null, 'Successfully processed DynamoDB record'); // SUCCESS with message
};
