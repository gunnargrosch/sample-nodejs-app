# Node.js Security Pipeline Application

This is a sample Node.js application designed to work with the security pipeline infrastructure. It demonstrates security best practices and includes comprehensive testing.

## Features

- Express.js web server with security middleware
- Helmet.js for security headers
- CORS support
- Input validation
- Health check endpoint
- Comprehensive unit and integration tests
- Security scanning integration

## API Endpoints

- `GET /` - Application information
- `GET /health` - Health check
- `GET /api/users` - Get list of users
- `POST /api/users` - Create a new user

## Security Features

- Helmet.js security headers
- Input validation and sanitization
- CORS configuration
- Request size limits
- Error handling without information leakage

## Development

### Prerequisites

- Node.js 18+ 
- npm

### Installation

```bash
npm install
```

### Running Locally

```bash
npm start
```

The application will start on port 3000 (or PORT environment variable).

### Testing

```bash
# Run unit tests
npm test

# Run integration tests
npm run test:integration

# Run tests in watch mode
npm run test:watch
```

### Security Scanning

```bash
# Run npm audit
npm run security:audit

# Run retire.js scan
npm run security:retire

# Run Snyk scan (requires SNYK_TOKEN)
npm run security:snyk
```

### Linting

```bash
npm run lint
```

## Deployment

This application is designed to be deployed through the security pipeline. The pipeline will:

1. Run security scans
2. Execute tests
3. Deploy to Beta environment
4. Deploy to Production (with approval)

### Lambda Deployment

The application includes a Lambda handler (`src/lambda.js`) for serverless deployment through AWS SAM.

## Environment Variables

- `PORT` - Server port (default: 3000)
- `ENVIRONMENT` - Environment name (dev/beta/prod)

## Project Structure

```
nodejs-app/
├── src/
│   ├── index.js          # Main application
│   └── lambda.js         # Lambda handler
├── tests/
│   ├── app.test.js       # Unit tests
│   └── integration.test.js # Integration tests
├── package.json
├── template.yaml         # SAM template
└── README.md
```

## Security Considerations

- All user inputs are validated
- Security headers are applied via Helmet.js
- Error messages don't leak sensitive information
- Dependencies are regularly scanned for vulnerabilities
- CORS is properly configured

## Pipeline Integration

This application works with the security pipeline by:

- Including `package.json` with security scanning scripts
- Providing comprehensive test suites
- Including SAM template for deployment
- Following security best practices
