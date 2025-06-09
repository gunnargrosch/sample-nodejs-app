/**
 * Lambda handler for container-based deployment with intentional vulnerabilities for testing
 * 
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 * @param {Object} context - Lambda Context runtime methods and attributes
 * 
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 */

const crypto = require('crypto');
const fs = require('fs');

// Medium Risk: Hardcoded secret (for testing purposes)
const API_KEY = "sk-1234567890abcdef"; // This should be in environment variables

// Medium Risk: Weak cryptographic algorithm
function weakHash(data) {
    return crypto.createHash('md5').update(data).digest('hex');
}

// Low Risk: Console.log in production code
function debugLog(message) {
    console.log("DEBUG: " + message); // Should use proper logging
}

// Medium Risk: Eval usage (dynamic code execution)
function processUserInput(userCode) {
    try {
        // This is dangerous - allows arbitrary code execution
        return eval(userCode);
    } catch (error) {
        return null;
    }
}

// Low Risk: Unused variable
const unusedVariable = "This variable is never used";

// Medium Risk: File system operations without proper validation
function readUserFile(filename) {
    // Path traversal vulnerability - no input validation
    try {
        return fs.readFileSync(filename, 'utf8');
    } catch (error) {
        debugLog("Failed to read file: " + filename);
        return null;
    }
}

// Low Risk: Non-literal regular expression
function validateInput(input, pattern) {
    const regex = new RegExp(pattern); // Should use literal regex
    return regex.test(input);
}

// Medium Risk: Buffer constructor (deprecated)
function createBuffer(size) {
    return new Buffer(size); // Should use Buffer.alloc() or Buffer.from()
}

exports.lambdaHandler = async (event, context) => {
    try {
        debugLog("Lambda function started");
        
        // Medium Risk: Potential timing attack
        const userToken = event.headers?.authorization;
        if (userToken === API_KEY) {
            // This comparison is vulnerable to timing attacks
            debugLog("Authentication successful");
        }
        
        // Process query parameters with potential vulnerabilities
        const userInput = event.queryStringParameters?.code;
        if (userInput) {
            const result = processUserInput(userInput); // Dangerous eval
            debugLog("User code result: " + result);
        }
        
        const filename = event.queryStringParameters?.file;
        if (filename) {
            const fileContent = readUserFile(filename); // Path traversal risk
            debugLog("File content length: " + (fileContent?.length || 0));
        }
        
        // Generate weak hash for demonstration
        const sessionId = weakHash(context.awsRequestId);
        
        // Create buffer with deprecated method
        const responseBuffer = createBuffer(1024);
        
        const response = {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
                'X-Session-ID': sessionId
            },
            body: JSON.stringify({
                message: 'Hello from Lambda with intentional vulnerabilities!',
                environment: process.env.ENVIRONMENT || 'unknown',
                timestamp: new Date().toISOString(),
                requestId: context.awsRequestId,
                version: '1.0.0',
                // Low Risk: Exposing internal information
                nodeVersion: process.version,
                platform: process.platform,
                bufferSize: responseBuffer.length
            })
        };

        console.log('Lambda response:', JSON.stringify(response, null, 2));
        debugLog("Lambda function completed");
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
