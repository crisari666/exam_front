# Environment Setup

This document explains how to configure the environment variables for the English Exam application.

## Required Environment Variables

### API Base URL

The application needs to know where your backend API is located. You can configure this using the `VITE_API_BASE_URL` environment variable.

#### Option 1: Create a .env file (Recommended)

Create a `.env` file in the root directory of your project:

```bash
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api/

# Environment
NODE_ENV=development
```

#### Option 2: Set environment variable in your shell

```bash
# For macOS/Linux
export VITE_API_BASE_URL=http://localhost:3000/api/

# For Windows (Command Prompt)
set VITE_API_BASE_URL=http://localhost:3000/api/

# For Windows (PowerShell)
$env:VITE_API_BASE_URL="http://localhost:3000/api/"
```

#### Option 3: Use the default value

If no environment variable is set, the application will use the default value: `http://localhost:3000/api/`

## Backend API Endpoints

The application expects the following endpoints to be available:

### Customer Validation
- **GET** `{{BASE_URL}}customers/code/:code`
- **Purpose**: Validate customer code and check if exam is already completed
- **Response**: 
  - Success: `{ "customerCode": "CUST001" }`
  - If exam is finished: Empty response (404)

### Submit Exam Results
- **POST** `{{BASE_URL}}customers/finish-exam`
- **Purpose**: Submit completed exam results
- **Payload**: See the API documentation for the complete structure

## Development vs Production

### Development
- Use `http://localhost:3000/api/` for local development
- Make sure your backend server is running on port 3000

### Production
- Set `VITE_API_BASE_URL` to your production API endpoint
- Example: `https://your-api-domain.com/api/`

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your backend allows requests from your frontend domain
2. **Connection Refused**: Verify your backend server is running and accessible
3. **404 Errors**: Check that the API endpoints match exactly what your backend provides

### Testing the Connection

You can test if your backend is accessible by visiting the customer validation endpoint in your browser:
```
http://localhost:3000/api/customers/code/TEST123
```

If you get a response (even an error), the connection is working. If you get "Connection refused", check your backend server.

## Security Notes

- Never commit `.env` files to version control
- Use HTTPS in production
- Consider implementing proper authentication for your API endpoints
