# Home Library Service

### !Important note:

- choose Authorization -> Bearer Token (e.g. on Postman)
- Content-Type of Headers should be -> application/json format

# USER

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

# Album

## To get all albums:

- Follow this endpoint: http://localhost:4000/album

## To get album by ID:

- Endpoint: http://localhost:4000/album/{uuid}

## To create a new album, using POST method:

- Body should be:
  {
  "name": "My Album",
  "year": 2004,
  "artistId": string
  }

## To update specific album, with PUT method:

- Simply follow the same body, as in POST, just changing some values.

# Artist

## To get all artists:

- Follow this endpoint: http://localhost:4000/artist

## To get artist by ID:

- Endpoint: http://localhost:4000/artist/{uuid}

## To create a new artist, using POST method:

- Body should be:
  {
  "name": "Adele",
  "grammy": boolean
  }

## To update specific artist, with PUT method:

- Simply follow the same body, as in POST, just changing some values.

# Track

## To get all tracks:

- Follow this endpoint: http://localhost:4000/track

## To get track by ID:

- Endpoint: http://localhost:4000/track/{uuid}

## To create a new track, using POST method:

- Body should be:
  {
  "name": "My track",
  "artistId": "UUID or null",
  "albumId": "UUID or null",
  "duration": 1444
  }

## To update specific track, with PUT method:

- Simply follow the same body, as in POST, just changing some values.

# Favorites

## To get all favorites:

- Follow this endpoint: http://localhost:4000/favs

## To create a favorite artist / album/ track by ID using POST method:

- Endpoint: http://localhost:4000/favs/{album}/{uuid_of_album}
- Do the same with other entities.

## To delete a favorite entity:

- Endpoint: http://localhost:4000/favs/{album}/{uuid_of_album}

---

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
