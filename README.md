## Installation

```bash
$ yarn
$ yarn start
```

## Endpoints

`POST /auth/signup`: registers user

```
@param username: string | must be unique
@param password: string
```

`POST /messages/:username`: sends a message from a signed in user to the user with `:username`

```
@param text: string
```

`GET /messages`: returns all messages sent to the currently signed in user grouped by sender
