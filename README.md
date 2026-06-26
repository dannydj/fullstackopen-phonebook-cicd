# Full Stack Open - Phonebook CI/CD

Full stack Phonebook application from Full Stack Open Parts 2 and 3, adapted for the Continuous Integration / Continuous Deployment exercises from Part 11.

The project contains both the backend and frontend in the same repository.

## Project structure

```txt
fullstackopen-phonebook-cicd/
  frontend/
    src/
    package.json
    vite.config.js
  models/
    person.js
  requests/
    persons.rest
  tests/
    health.test.js
  app.js
  index.js
  build_step.sh
  eslint.config.mjs
  package.json
  README.md
```

## Technologies used

### Backend

* Node.js
* Express
* MongoDB
* Mongoose
* CORS
* dotenv

### Frontend

* React
* Vite
* Axios

### CI/CD

* GitHub Actions
* Render
* Health check endpoint
* Automated deployment pipeline

## Available endpoints

### Health check

```http
GET /health
```

Expected response:

```txt
ok
```

### Version

```http
GET /version
```

### Get all persons

```http
GET /api/persons
```

### Get application info

```http
GET /info
```

### Get one person by id

```http
GET /api/persons/:id
```

### Create a new person

```http
POST /api/persons
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "number": "39-44-5323523"
}
```

### Update an existing person

```http
PUT /api/persons/:id
Content-Type: application/json

{
  "name": "Ada Lovelace",
  "number": "39-44-5323524"
}
```

### Delete a person

```http
DELETE /api/persons/:id
```

## Running the project locally

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd frontend
npm install
cd ..
```

Start the backend in development mode:

```bash
npm run dev
```

Build the frontend and copy it to the backend `dist` directory:

```bash
npm run build
```

Start the production version locally:

```bash
npm run start:prod
```

By default, the backend runs on:

```http
http://localhost:3001
```

## Environment variables

Create a `.env` file in the root of the project:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/phonebookApp?retryWrites=true&w=majority
PORT=3001
```

The `.env` file must not be committed to Git or GitHub.

## Testing

Run tests:

```bash
npm test
```

Run lint:

```bash
npm run lint
```

## Deployment

Deployed application:

```txt
https://fullstackopen-phonebook-cicd.onrender.com
```

The deployment is handled through Render and GitHub Actions.

## CI/CD pipeline

The GitHub Actions pipeline runs:

1. Install dependencies
2. Lint
3. Tests
4. Frontend production build
5. Deployment trigger to Render

## Course section reference

This project is based on:

* Full Stack Open - Part 2: Communicating with server
* Full Stack Open - Part 3: Programming a server with NodeJS and Express
* Full Stack Open - Part 11: Continuous Integration / Continuous Deployment

## Branch protection

The main branch is protected and requires a pull request review before merging.
