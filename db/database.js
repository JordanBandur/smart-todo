const pool = require('./connection'); // Make sure this path is correct

const getTasks = () => {
  return pool.query('SELECT * FROM todos;')
    .then(res => res.rows);
};


const addTask = (title, categoryId) => {
  const sql = 'INSERT INTO todos (title, category_id) VALUES ($1, $2) RETURNING *;';
  return pool.query(sql, [title, categoryId])
    .then(res => res.rows[0]);
};

const updateTask = (taskId, title, categoryId) => {
  const sql = 'UPDATE todos SET title = $1, category_id = $2 WHERE id = $3 RETURNING *;';
  return pool.query(sql, [title, categoryId, taskId])
    .then(res => res.rows[0]);
};

const deleteTask = (taskId) => {
  const sql = 'DELETE FROM todos WHERE id = $1;';
  return pool.query(sql, [taskId]);
};

// Categories
const getCategories = () => {
  return pool.query('SELECT * FROM categories;')
    .then(res => res.rows);
};

// Users
const getUserProfile = (userId) => {
  const sql = 'SELECT * FROM users WHERE id = $1;';
  return pool.query(sql, [userId])
    .then(res => res.rows[0]);
};

const updateUserProfile = (userId, name, email) => {
  const sql = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *;';
  return pool.query(sql, [name, email, userId])
    .then(res => res.rows[0]);
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  getCategories,
  getUserProfile,
  updateUserProfile
};
