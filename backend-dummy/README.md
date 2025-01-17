### Dummy backend

## Setup

In the backend-dummy folder run the following commands:

1. Install the required packages:

```shell
npm install
```

2. Starting the backend

```shell
npm start
```

## How it works?

This backend does not use a real database. However, there is a file named users.json that acts as a database. Refer to this file to see the available users for testing purposes.

## Endpoints

- [POST] users/login

  **Description**

  Validates the provided email and password. If successful, it sets a cookie with the user's session ID.

  **Responses**

  - **200 OK:** Login successful. The user's session cookie is set.
  - **400 Bad Request:** The request body is missing required fields (email or password).
  - **401 Unauthorized:** The provided email or password does not match any existing user.

* [GET] /users/me

  **Description**

  Retrieves information about the authenticated user based on their session cookie.

  **Responses**

  - **200 OK:** Returns the authenticated user's information.
  - **401 Unauthorized:** The user is not authenticated or lacks permission to perform this action.
