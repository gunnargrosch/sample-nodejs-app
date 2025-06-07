/**
 * Lambda handler for container-based deployment
 * 
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context - Lambda Context runtime methods and attributes
 * 
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */

exports.lambdaHandler = async (event, context) => {
    try {
        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            body: JSON.stringify({
                message: 'Hello from containerized Lambda!',
                environment: process.env.ENVIRONMENT || 'unknown',
                timestamp: new Date().toISOString(),
                requestId: context.requestId,
                version: '1.0.0'
            })
        };

        console.log('Lambda response:', JSON.stringify(response, null, 2));
        return response;
        
    } catch (error) {
        console.error('Error in Lambda handler:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: 'Internal server error',
                error: process.env.NODE_ENV === 'production' ? 'Something went wrong' : error.message
            })
        };
    }
};
