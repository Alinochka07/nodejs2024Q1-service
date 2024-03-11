# Home Library Service

### !Important note:

- choose Authorization -> Bearer Token (e.g. on Postman)
- Content-Type of Headers should be -> application/json format

## To run the Get method:

- Simply run this endpoint to get all users (initially, it has no users): http://localhost:4000/user

## To run the POST method:

example:
{
"login": "User1",
"password": "123456"
}

## To get only one user by ID with GET:

- Add uuid to this endpoint: http://localhost:4000/user/{uuid}

## To update user with PUT method:

- Add uuid to this endpoint: http://localhost:4000/user/{uuid}
- Body should be:
  {
  "oldPassword": "OlPasswordValue",
  "newPassword": "NewPasswordValue"
  }

## To delete user:

- Simply use this endpoint: http://localhost:4000/user/{uuid}

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
