# User Authentication System

The User Authentication System is a secure and reliable mechanism designed to verify user identities and control access to protected resources. It provides a robust solution for authenticating users and ensuring that only authorized individuals can access the system, application, or website.

## Features

- **User Authentication:** Sign up and log in securely to the User Authentication System.
- **Token-Based Authentication:** Use tokens for authentication and session management.
- **User Identification:** Register and authenticate users using their email addresses.
- **Access Control:** Grant authorized access to protected resources based on user authentication.
- **Secure Communication:** Implement secure communication protocols (e.g., HTTPS) to protect user credentials and sensitive data.
- **OAuth2 Integration:** Allow users to sign in using their Google accounts via OAuth2 authentication.

## Tech Stack

- JavaScript: Programming language used for server-side and client-side development.
- Node.js: JavaScript runtime for server-side application development.
- Express: Web application framework for building robust and scalable apps.
- MongoDB: NoSQL document database for flexible and scalable data storage.
- Mongoose: Object Data Modeling (ODM) library for MongoDB and Node.js.
- EJS: Templating engine for generating dynamic HTML content.
- Bootstrap: A versatile front-end framework for building responsive and sleek web applications.
- Googleapis: Package for integrating with Google services, including OAuth2.

## Getting Started

1.  Clone the repository:

    `git clone https://github.com/Amaan-Uddin/User-Authentication-System.git`

2.  Install dependencies:

    `cd User-Authentication-System`

    `npm install`

3.  Set up the MongoDB connection:

    - Ensure you have MongoDB installed and running.
    - Update the MongoDB connection URL in the project's configuration file.

4.  Configure JWT tokens:

    - Generate an access token secret and refresh token secret.
    - Update the JWT configuration in the project's configuration file, including the secret keys.

5.  Set up OAuth2 with Google:

    - Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
    - Enable the "Google+ API" and "Gmail API" for your project.
    - Navigate to the "Credentials" section in the Google Cloud Console for your project.
    - Click on "Create Credentials" and select "OAuth client ID."
    - Choose "Web application" as the application type
    - Set the "Authorized redirect URIs" to your callback URL for OAuth2 authentication
    - Click "Create" to generate the OAuth2 client ID and client secret.

6.  Configure the OAuth2 client in your project:

    - Create an OAuth2 client with your client ID, client secret, and redirect URI:

      `const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URI'
);`

7.  Start the server:

    `npm start`

8.  Open your web browser and visit [http://localhost:3000](http://localhost:3000/) to access the User Authentication System.

## Note:

Before running the code on your local machine, set up an `.env` file with the required configurations:

- `DATABASE_URI`: The URI or path to your MongoDB database.
- `ACCESS_TOKEN_SECRET`: The secret key used for generating access tokens.
- `REFRESH_TOKEN_SECRET`: The secret key used for generating refresh tokens.
- `REMEMBER_TOKEN_SECRET`: The secret key used for generating remember tokens (i.e. Remember Me Tokens).
- `GOOGLE_CLIENT_ID`: The client ID obtained from the Google Cloud Console for OAuth2 authentication.
- `GOOGLE_CLIENT_SECRET`: The client secret obtained from the Google Cloud Console for OAuth2 authentication.
- `GOOGLE_REDIRECT_URI`: The redirect URI for OAuth2 authentication (e.g., [https://developers.google.com/oauthplayground](https://developers.google.com/oauthplayground)).

## Contributing

Contributions are welcome! If you find any issues or want to enhance the User Authentication System, feel free to submit a pull request. Please follow the existing code style and guidelines.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Amaan-Uddin/User-Authentication-System/blob/main/LICENSE) file for details.

## Acknowledgments

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/)
- [Bootstrap](https://getbootstrap.com/)
- [Googleapis](https://www.npmjs.com/package/googleapis)

Thank you for using the User Authentication System! If you have any questions or need assistance, please feel free to reach out.
