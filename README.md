# Getting Started with React, node and graphQl

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and it's mock server was created with node.js, mongodb and GraphQL.

# Available Scripts (Server)

First we need to navigate to server folder.

### `npm install`

It will install all the dependencies and dev dependencies.

### `npm run dev`

It will run locally with typescript.
Also mongodb community edition has to be locally installed or if you don't want that just use `mongodb+srv://adiat-hasan:qweqwe@cluster0.blejq.mongodb.net/auth?retryWrites=true&w=majority` in your .env file with the key `MONGO_URI_KEY`.

### `npm run build`

It will build your file to js from - tsc compiler.

### `npm start`

It will start the build version. Production ready.

# Available Scripts (Client)

First we need to navigate to client folder.

### `npm install`

It will install all the dependencies and dev dependencies.

Then make sure to add .env.local file and there add a env variable with key - `REACT_APP_GRAPHQL_URI` and value - `http://localhost:5000/`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
