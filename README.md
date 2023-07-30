# Authentication Microservice

The Authentication Microservice provides secure user authentication and authorization functionalities for your application. It handles user registration, login, session management, password reset, and access control.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Authentication Flow](#authentication-flow)
- [Configuration](#configuration)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration with phone verification
- User login with JWT-based authentication
- Password hashing and storage
- Session management with secure cookies
- Password reset functionality
- Role-based access control

## Installation

1. Clone the repository:

   ```
   git clone [https://github.com/your-username/your-authentication-microservice.git](https://github.com/srk0102/authentication)
   cd authentication
   ```
2. Install dependencies:

   ```
   npm install
   ```
3. Configure the environment variables (See [Configuration](#configuration) section).
4. Start the microservice:

   ```
   npm start -> for the prod environment
   npm run dev -> for the dev environment
   npm run local -> for the local environment
   ```

## Usage

To use the Authentication Microservice in your application, you need to make API requests to the exposed endpoints. You can integrate the microservice with your frontend or backend to handle user authentication and authorization.

Ensure that you have properly set up the microservice and its dependencies before integrating it into your application.

## API Endpoints

The Authentication Microservice exposes the following API endpoints:

- `POST /register`: User registration. Accepts user details and sends a verification email.
- `POST /login`: User login. Generates a JWT token upon successful login.
- `POST /logout`: User logout. Clears the user's session and JWT token.
- `POST /forgot-password`: Password reset request. Sends an email with a password reset link.
- `POST /reset-password`: Password reset. Sets a new password after receiving a valid reset token.
- `GET /profile`: Get a user profile. Requires a valid JWT token for authentication.

For detailed information on request parameters and responses, see the [API documentation](./api-docs.md).

## Authentication Flow

The authentication flow for the microservice involves the following steps:

1. User registration with email: Users register with their email and password. An email verification link is sent to the user's email for activation.
2. User registration with phone: Users register with their phone and password. An OTP is sent to the user's phone for activation.
3. User login: Users can log in with their credentials to obtain a JWT token for authentication.
4. Password reset: Users can request a password reset if they forget their password. A reset link is sent to their email or phone to set a new password.
5. User logout: Users can log out to invalidate the JWT token and clear the session.

For a more detailed explanation of the authentication flow, see the [Authentication Flow documentation](./authentication-flow.md).

## Configuration

The microservice can be configured using environment variables. Create a `.env` file in the root directory of the microservice and set the following variables:

```
PORT=3000
MONGO_URL=mongodb://localhost:27017/authdb
JWT_PRIVATE_KEY=mySecretKey
JWT_EXPIRY_TOKEN_TIME=86400
JWT_EXPIRY_REFRESH_TIME=182d
MAILER_SERVICE=your-mail-service
MAILER_USER=your-mail-user
MAILER_PASS=your-mail-password
FE_URL=http://yoururl.com
```

Replace the placeholder values with appropriate configuration details.

## Security Considerations

- Ensure that the microservice is running on a secure server and is accessible only over HTTPS.
- Use strong and unique JWT secrets to prevent token tampering.
- Implement rate limiting and account lockout mechanisms to prevent brute-force attacks.
- Follow best practices for password hashing and storage.
- Keep the microservice and its dependencies up to date with the latest security patches.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, please submit a pull request.

## License

[MIT License](LICENSE)

---

Feel free to customize this template according to the specific details of your authentication microservice. Include more sections if needed, such as a Troubleshooting section, API Examples, or additional Security measures. Providing comprehensive and clear documentation will help users and developers understand and use your microservice effectively.
