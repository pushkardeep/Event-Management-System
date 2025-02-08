# Event Management Server

## Overview
This is the backend server for the Event Management application. It is built using Express.js and provides API endpoints for user authentication, event management, and real-time updates.

## Features
- **User Authentication**: Register, sign in, and guest login support.
- **Event Management**: Create, read, and delete events.
- **Protected Routes**: Uses middleware to secure routes.
- **Real-Time Communication**: Utilizes socket.io for real-time updates.
- **Cross-Origin Resource Sharing (CORS)**: Configured to allow requests from the client application.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: socket.io
- **Security**: JWT Authentication, CORS

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/event-management-server.git
   ```
2. Navigate to the project directory:
   ```sh
   cd event-management-server
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoints
### User Routes (`/user`)
- **Register**: `POST /register`
- **Sign In**: `POST /sign_in`
- **Guest Login**: `POST /guest_log_in`
- **Get Profile**: `GET /profile` (protected)
- **Get User Events**: `GET /user_events` (protected)

### Event Routes (`/event`)
- **Get Events**: `GET /get_events` (protected)
- **Create Event**: `POST /create` (protected)
- **Delete Event**: `DELETE /delete/:eventId` (protected)

## WebSockets
This server uses `socket.io` to enable real-time communication.

- **Socket Configuration**: Defined in `configurations/socket.config.js`.
- **Real-Time Features**:
  - Updates on attendee status.
  - Instant notifications for event actions.
- **Usage**:
  - The server listens for client connections and emits event updates.
  - Ensure the client connects to the correct `SOCKET_URL`.

## Middleware
- **isLoggedIn**: Ensures only authenticated users can access protected routes.

## Environment Variables
Create a `.env` file in the root directory and add the following variables:
```
JWT_SECRET=event_management_system
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/event_management_system
CLIENT_URI=http://localhost:5173
```

## Usage
1. Start the server using `npm start`.
2. Use Postman or a frontend client to interact with the API.
3. Manage users and events with CRUD operations.
4. View real-time updates using socket.io.

## Contributing
Feel free to contribute by submitting issues or pull requests.

## License
This project is licensed under the MIT License.

