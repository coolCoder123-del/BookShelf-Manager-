## Step 1: Initialize the Backend

Navigate to the `backend` folder and initialize a new Node.js project:

```sh
cd backend
npm init -y
```

This will generate a `package.json` file in the `backend` folder. Open this file and add the line `"type": "module",` next to `"description": ""`.

Next, install Express.js and Nodemon:

```sh
npm i express nodemon
```

This will add `express` and `nodemon` packages to your project.

## Step 2: Configure Scripts in `package.json`

Add the following scripts to your `package.json` file under the `"scripts"` section:

```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```

## Step 3: Create Essential Files

### `index.js`

Create a new file named `index.js` in the `backend` folder. This will be the entry point of your backend application.

### `config.js`

Create another file named `config.js` in the `backend` folder. Add the following line to this file to define the port number:

```js
export const PORT = 5555;
```

## Step 4: Set Up Express Server

In `index.js`, create an Express application and set it to listen on the defined port:

```js
import express from 'express';
import { PORT } from './config.js';

const app = express();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Step 5: Add HTTP Routes

Add a simple route to handle GET requests in `index.js`:

```js
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
```

## Step 6: Connect to MongoDB

Create an online MongoDB database from [MongoDB Atlas](https://cloud.mongodb.com). Connect to it using Mongoose. First, install Mongoose:

```sh
npm i mongoose
```

Then, in `index.js`, connect to the MongoDB database:

```js
import mongoose from 'mongoose';

const MONGODB_URL = 'your_mongodb_connection_string_here';

mongoose.connect(MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });
```

## Step 7: Create Database Model

Create a folder named `models` inside the `backend` folder. Then, create a new `.js` file inside `/backend/models/` to define your database model. Use Mongoose's `Schema` and `model` to create a schema and model.

For example, create a file named `User.js` in the `models` folder:

```js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

export default User;
```

Finally, connect the app with the MongoDB database using `mongoose.connect()` as shown in Step 6.

Your backend setup is now complete!