# Event Management App

## Overview

This is a React-based Event Management application that allows users to register, sign in, create events, and view their own events. The app features protected routes, socket communication, and state management with Redux.

## Features

- **User Authentication**: Users can register and sign in to access protected features.
- **Protected Routes**: Certain routes are only accessible to authenticated users.
- **Event Management**: Users can create, update, delete, and manage events.
- **Real-Time Communication**: Uses `socket.io` for real-time updates, including attendee updates.
- **State Management**: Implements Redux for managing user state and real-time event updates.
- **Image Uploads**: Uses Cloudinary for handling image uploads.

## Tech Stack

- **Frontend**: React, React Router, Redux
- **Real-time Communication**: socket.io
- **Image Uploads**: Cloudinary

## Installation

1. Clone the repository:
   ```sh
   https://github.com/pushkardeep/Event-Management-System.git
   ```
2. Navigate to the project directory:
   ```sh
   cd client
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Project Structure

```
📂 src
 ├── 📂 components      # Reusable UI components
 ├── 📂 pages           # Application pages
 ├── 📂 services        # API and socket services
 ├── 📂 redux           # Redux state management
 ├── 📜 App.jsx         # Main application component
 ├── 📜 index.jsx       # Entry point
```

## API Endpoints

```javascript
export const endpoints = {
  LOG_IN: "/user/sign_in",
  REGISTER: "/user/register",
  GUEST: "/user/guest_log_in",
  PROFILE: "/user/profile",
  CREATE_EVENT: "/event/create",
  GET_EVENTS: "/event/get_events",
  DELETE_EVENT: "/event/delete",
  GET_USER_EVENTS: "/user/user_events",
};
```

## Event CRUD Operations

- **Create Event**: Users can create events using the `/event/create` endpoint.
- **Read Events**: Users can retrieve a list of events using `/event/get_events`.
- **Update Event**: Users can update their events (endpoint to be defined).
- **Delete Event**: Users can delete events using `/event/delete`.
- **User-Specific Events**: Users can view their own events using `/user/user_events`.

## Usage

1. Run the application using `npm run dev`.
2. Register a new user or sign in with existing credentials.
3. Create and manage events in the dashboard.
4. View real-time updates for attendees using socket.io.
5. Upload images using Cloudinary.

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

```
VITE_BASE_URL=http://localhost:3000
VITE_CLOUD_NAME=da2o22xsg
VITE_IMAGES_UPLOAD_PRESET=ems_img_preset
```

## Contributing

Feel free to contribute by submitting issues or pull requests.

## License

This project is licensed under the MIT License.
