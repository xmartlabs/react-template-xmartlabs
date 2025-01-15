## Dummy backend

## Setup

In the backend-dummy folder run the following commands:

Install the required packages:

```shell
npm install
```

## Starting the backend

```shell
npm start
```

## Endpoints

- [POST] /users/login

  **Description**

  Validates the provided email and password. If successful, it sets a cookie with the user's session ID.

  **Responses**

  200 OK: Login successful. The user's session cookie is set.
  400 Bad Request: The request body is missing required fields (email or password).
  401 Unauthorized: The provided email or password does not match any existing user.
