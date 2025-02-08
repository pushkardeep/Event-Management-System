## Modals

### User Modal

The `user.modal.js` file defines the schema for the `User` model using Mongoose. This schema includes the following fields:

- `name`: A string representing the user's name. This field is required.
- `email`: A string representing the user's email. This field is optional for guests.
- `password`: A string representing the user's password. This field is optional for guests.
- `location`: A string representing the user's location. This field is optional for guests.
- `role`: A string representing the user's role, either "real" or "guest". This field has a default value of "real".
- `events`: An array of ObjectIds referencing the `Event` model. This field has a default value of an empty array.
- `attending`: An array of ObjectIds referencing the `Event` model. This field has a default value of an empty array.

The `User` model is created using this schema and exported for use in other parts of the application.

### Event Modal

The `event.modal.js` file defines the schema for the `Event` model using Mongoose. This schema includes the following fields:

- `cover`: A string representing the cover image URL for the event. This field is required.
- `title`: A string representing the title of the event. This field is required.
- `description`: A string representing the description of the event. This field is required.
- `location`: A string representing the location of the event. This field is required.
- `date`: A date representing the date of the event. This field is required.
- `time`: A string representing the time of the event. This field is required.
- `category`: A string representing the category of the event. This field is required and can be one of the following values: "music", "sport", "art", "theater", "cinema", "other".
- `status`: A string representing the status of the event. This field has a default value of "wait" and can be one of the following values: "wait", "live", "canceled".
- `attendees`: A number representing the number of attendees for the event. This field has a default value of 0.
- `owner`: An ObjectId referencing the `User` model. This field is required.

The `Event` model is created using this schema and exported for use in other parts of the application.

## Authentication

### Register

To register a new user, make a POST request to `/user/register` with the following fields in the request body:

- `name`: The name of the user (required)
- `email`: The email address of the user (required)
- `location`: The location of the user (required)
- `password`: The password for the user account (required)

Example request body:

```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "location": "New York",
  "password": "yourpassword"
}
```

#### Responses

- **200 OK**: Registration successful. Returns a JSON object with a success message, user data, and a JWT token.
  ```json
  {
    "success": true,
    "user": {userData},
    "token": "your.jwt.token"
  }
  ```
- **400 Bad Request**: Registration failed due to missing fields, user already exists, or encryption error. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```
- **500 Internal Server Error**: Registration failed due to a server error. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "Internal server error"
  }
  ```

### Sign In

To sign in an existing user, make a POST request to `/user/sign_in` with the following fields in the request body:

- `email`: The email address of the user (required)
- `password`: The password for the user account (required)

Example request body:

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Responses

- **200 OK**: Sign in successful. Returns a JSON object with a success message, user data, and a JWT token.
  ```json
  {
    "success": true,
    "user": {userData},
    "token": "your.jwt.token"
  }
  ```
- **400 Bad Request**: Sign in failed due to missing fields, user not found, invalid credentials, or token generation error. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```
- **500 Internal Server Error**: Sign in failed due to a server error. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "Internal server error"
  }
  ```

### Guest Login

To log in as a guest, make a POST request to `/user/guest_log_in`.

#### Responses

- **200 OK**: Guest login successful. Returns a JSON object with a success message, user data, and a JWT token.
  ```json
  {
    "success": true,
    "user": {userData},
    "token": "your.jwt.token"
  }
  ```
- **400 Bad Request**: Guest login failed due to guest creation error. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```
- **500 Internal Server Error**: Guest login failed due to a server error. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "Internal server error"
  }
  ```

## Event Management

### Create Event

To create a new event, make a POST request to `/event/create` with the following fields in the request body:

- `cover`: The cover image URL for the event (required)
- `title`: The title of the event (required)
- `description`: The description of the event (required)
- `location`: The location of the event (required)
- `date`: The date of the event (required)
- `time`: The time of the event (required)
- `category`: The category of the event (required)

Example request body:

```json
{
  "cover": "http://example.com/cover.jpg",
  "title": "Sample Event",
  "description": "This is a sample event.",
  "location": "New York",
  "date": "2023-12-31",
  "time": "18:00",
  "category": "music"
}
```

#### Responses

- **200 OK**: Event creation successful. Returns a JSON object with a success message and event data.
  ```json
  {
    "success": true,
    "event": {eventData},
    "message": "Event created successfully"
  }
  ```
- **400 Bad Request**: Event creation failed due to missing fields or user not found. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```
- **500 Internal Server Error**: Event creation failed due to a server error. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "Internal server error"
  }
  ```

### Delete Event

To delete an existing event, make a DELETE request to `/event/delete/:eventId` with the following parameter:

- `eventId`: The ID of the event to be deleted (required)

Example request URL:

```
/event/delete/60d21b4667d0d8992e610c85
```

#### Responses

- **200 OK**: Event deletion successful. Returns a JSON object with a success message.
  ```json
  {
    "success": true,
    "message": "Event deleted successfully"
  }
  ```
- **400 Bad Request**: Event deletion failed due to missing event ID, event not found, or user not found. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "Error message"
  }
  ```
- **500 Internal Server Error**: Event deletion failed due to a server error. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "Internal server error"
  }
  ```

### Read Events

To read all events, make a GET request to `/event/get_events`.

#### Responses

- **200 OK**: Events retrieved successfully. Returns a JSON object with a success message and an array of events.
  ```json
  {
    "success": true,
    "events": [{eventData1}, {eventData2}, ...]
  }
  ```
- **400 Bad Request**: Events retrieval failed due to user not found. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "User not found"
  }
  ```
- **500 Internal Server Error**: Events retrieval failed due to a server error. Returns a JSON object with an error message.
  ```json
  {
    "success": false,
    "message": "Internal server error"
  }
  ```
