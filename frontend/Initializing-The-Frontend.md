## Step 1: Initialize the Frontend

Navigate to the `frontend` folder and initialize a new React application using Create React App:

```sh
cd frontend
npx create-react-app .
```

This command will set up a new React application in the `frontend` folder with the default configuration.

## Step 2: Start the React Application

To start the React development server, use the following command:

```sh
npm start
```

This will start the development server and open your React application in the default web browser. The application will be running at `http://localhost:3000`.

## Step 3: Install Required Dependencies

For a typical MERN stack frontend, you may want to install additional libraries such as Axios for HTTP requests and React Router for navigation. Install these dependencies using npm:

```sh
npm i axios react-router-dom
```

## Step 4: Set Up React Router

In your `src` folder, create a new file named `AppRouter.js` to define your application routes:

```js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Page1 from './components/Page1';
import Page2 from './components/Page2';

const AppRouter = () => (
  <Router>
    <Switch>
      <Route path="/page1" exact component={Page1} />
      <Route path="/page2" component={Page1} />
    </Switch>
  </Router>
);

export default AppRouter;
```

Next, update your `App.js` to use `AppRouter`:

```js
import React from 'react';
import AppRouter from './AppRouter';

const App = () => <AppRouter />;

export default App;
```

## Step 5: Create Basic Components

Create a `components` folder inside `src` and add two basic components: `Page1.js` and `Page2.js`.

### `Page1.js`

```js
import React from 'react';

const Page1 = () => {
  return (
    <div>
      <h1>Page1</h1>
      <p>Content for page 1</p>
    </div>
  );
};

export default Page1;
```

### `Page2.js`

```js
import React from 'react';

const Page2 = () => {
  return (
    <div>
      <h1>Page2</h1>
      <p>Body of the Page2</p>
    </div>
  );
};

export default Page2;
```

## Step 6: Make HTTP Requests

You can use Axios to make HTTP requests to your backend API. For example, create a file named `api.js` in the `src` folder to define your API requests:

```js
import axios from 'axios';

const API_URL = 'http://localhost:5555';

export const fetchExampleData = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};
```

Then, you can use this function in your components:

```js
import React, { useEffect, useState } from 'react';
import { fetchExampleData } from './api';

const Page1 = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchExampleData();
        setData(result);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    getData();
  }, []);

  return (
    <div>
      <h1>Page1</h1>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  );
};

export default Page1;
```

Your frontend setup is now complete! You have a basic React application with routing and the ability to make HTTP requests to your backend.