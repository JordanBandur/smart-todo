// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

app.use(session({
  secret: 'your_secret_key', // Make sure to keep it confidential
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

app.use(express.json());

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const loginRoutes = require('./routes/login');
const accountRoutes = require('./routes/account');
const addTodoRoutes = require('./routes/add-todos');
const todosCompletedRoutes = require('./routes/todos-completed');
const suggestTodoRoutes = require('./routes/suggest-todo');
// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use(loginRoutes);
app.use('/', accountRoutes);
app.use('/todos', addTodoRoutes);
app.use('/todos-completed', todosCompletedRoutes);
app.use('/', suggestTodoRoutes);

app.get('/', (req, res) => {
  res.render('index', { user: req.session.user });
});

app.listen(PORT, () => {
  console.log(`Smart ToDo App listening on port ${PORT}`);
});

