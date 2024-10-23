
# Contact Management System Backend

This is a backend repository for Contact Management System, a web application that allows users to save and manage contact information. This project was created as part of the Hux Ventures Fullstack Developer Assessment.


````markdown
# Hux Assessment Backend

A backend application built with Express and MongoDB for managing user accounts and contacts. It provides user authentication and allows users to create, read, update, and delete their contacts.

## Features

- User registration and login
- JWT-based authentication
- Create, read, update, and delete contacts
- Validation of user inputs using `class-validator`
- CORS enabled for frontend access

## Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- TypeScript
- dotenv for environment variable management
- Jest for testing

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/hux-assessment-backend.git
   cd hux-assessment-backend
   ```
````

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```plaintext
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ALLOWED_ORIGIN=http://your-frontend-origin
   PORT=6000
   ```

4. Build the TypeScript files:
   ```bash
   npm run build
   ```

## Running the Application

To start the server in development mode, use:

```bash
npm run dev
```

For production, build and start the server:

```bash
npm run build
npm start
```

### Seeding the Database

To seed the database with initial data, run:

```bash
npm run seed
```

## API Endpoints

### User Authentication

- **Register**: `POST /api/users/register`
- **Login**: `POST /api/users/login`
- **Logout**: `POST /api/users/logout`

### Contacts

- **Create Contact**: `POST /api/contacts`
- **Get All Contacts**: `GET /api/contacts`
- **Get Contact by ID**: `GET /api/contacts/:id`
- **Update Contact**: `PUT /api/contacts/:id`
- **Delete Contact**: `DELETE /api/contacts/:id`

### Postman Collection

[Postman Collection](https://planetary-meteor-198252.postman.co/workspace/ac04b7de-1fa1-4b01-8806-c0b02fd809de/collection/11121571-bfda249c-af5e-4984-8ce7-6805344124ea?action=share&source=copy-link&creator=39241405)

## Testing

To run tests, use:

```bash
npm test
```

## License

This project is licensed under the MIT License.

```

### Key Changes:
- Ensured code blocks and sections are clearly separated for better readability.
- Added a link for the Postman Collection with a clear label.

Feel free to adjust any part of the README further to suit your needs!
```
