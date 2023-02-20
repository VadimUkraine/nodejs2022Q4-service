# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker [Download & Install Docker](https://docs.docker.com/engine/install/).

## Downloading

```
git clone https://github.com/VadimUkraine/nodejs2022Q4-service.git

cd nodejs2022Q4-service

git checkout database
```

## ENV file

You need to create `.env` file in root directory of the project.

This can be done from the template:

```
cp .env.example .env
```

## Run app

### Install Docker

Go to the official docs for install [Docker](https://docs.docker.com/engine/install/)

### Build images 

Make sure docker service is running

```
docker-compose build
```

#### Run app

```
docker-compose up
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
