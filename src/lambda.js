const serverless = require('serverless-http');
const app = require('./index');

// Export the Lambda handler
module.exports.handler = serverless(app);
