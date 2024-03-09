# manageSession

## 1. Project Structure

```
ManageSession/
├── controllers/
|   ├── index.js
├── middlewares/
|   ├── auth.js
|   ├── hash.js
|   ├── upload.js
├── models/
|   ├── user.js
├── public/
|   ├── images/
|   ├── css/
|   ├── javascripts/
|   ├── uploads/
├── routes/
|   ├── index.js
├── views/
|   ├── partials/
|   ├── homepage.js
|   ├── signup.js
|   ├── signin.js
├── .env
├── .gitignore
├── app.js
├── package-lock.json
├── package.json
├── README.md
```

1. `controllers/`
This directory contains files responsible for handling the logic and functionality of the application.

2. `middlewares/`
Middleware functions are stored here. These functions can be applied to routes to perform tasks like authentication (auth.js), hashing (hash.js), and handling file uploads (upload.js).

3. `models/`
This directory holds the data models for interacting with the database.

4. `public/`
This directory usually contains static assets that can be served directly to the client, such as images, CSS files, and JavaScript files.

5. `routes/`
This directory probably contains JavaScript files defining the routes and corresponding handlers for the application.

6. `views/`
This directory typically contains files responsible for rendering HTML templates and views.

7. `.env`
This file contains ENVIRONMENT VARIABLES such as SECRET KEY, which is meant to be hidden and ignored by `.gitignore`.

8. `.gitignore`
Specifies files and directories to be ignored by Git, preventing them from being tracked.

9. `app.js`
This file is commonly used to store environment variables for the application.

10. `package.json` & `package-lock.json`
Manage dependencies and package versions.

11. `README.md`
A text file containing useful reference information about this project.

## 2. Packages:

1. `bcryptjs`
A library for hashing passwords.

2. `date-fns`
A JavaScript date utility library. It provides functions for working with dates, including formatting and parsing.

2. `dotenv`
A zero-dependency module that loads environment variables from a .env file into process.env. This is useful for managing configuration in your Node.js applications.

3. `ejs`
Embedded JavaScript templating engine for rendering dynamic content on the server side.

4. `express`
A popular web framework for Node.js that simplifies the process of building web applications. 

5. `express-session`
Middleware for handling sessions in Express.js. It provides session management and can store session data, often backed by a database or memory store.

6. `mongodb`
The official MongoDB driver for Node.js. It allows your Node.js application to interact with a MongoDB database.

7. `mongoose`
A higher-level abstraction over the MongoDB driver, providing a more convenient and structured way to work with MongoDB databases in a Node.js environment.

8. `multer`
A middleware for handling file uploads in Express.js. It's often used with forms that include file input fields.

9. `nodemon`
A utility that monitors for changes in your Node.js application and automatically restarts the server when changes are detected. 

## 3. Build

To clone and run this project, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](https://npmjs.com)) installed on your computer.

- Prequisite: VSCode or Other IDE / Editor

- From your CLI, Terminal or SHELL:

```bash
# Clone this repository
$ git clone https://github.com/HaAnh18/manageSession.git

# Install dependencies
$ npm install

# Start with npm
$ npm start

# OR Start with node
$ node app.js
```

## 4. Custom Database

To change the database location, you'll need to go to `.env` file and change the value of variable DATABASE to your own MongoDB link 

![Database](./public/images/database.jpg)

## 5. Screenshots

- Sign up page
![Sign up](./public/images/signup.png)

- Sign in page
![Sign in](./public/images/signin.png)

- Homepage
![Homepage](./public/images/homepage.png)

## License

This software is licensed under the MIT License ©
