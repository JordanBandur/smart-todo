const pool = require('./connection'); // Make sure this path is correct

const getTasks = () => {
  return pool.query('SELECT * FROM todos;')
    .then(res => res.rows);
};


const addTask = async (title, categoryId, userId) => {
  const sql = 'INSERT INTO todos (title, category_id, user_id) VALUES ($1, $2, $3) RETURNING *;';
  try {
      const { rows } = await pool.query(sql, [title, categoryId, userId]);
      return rows[0];
  } catch (err) {
      console.error('Error adding task:', err);
      throw err;
  }
};


const updateTask = async (taskId, title, categoryId, userId) => {
  const sql = 'UPDATE todos SET title = $1, category_id = $2, user_id = $3, updated_at = NOW() WHERE id = $4 RETURNING *;';
  try {
      const { rows } = await pool.query(sql, [title, categoryId, userId, taskId]);
      return rows[0];
  } catch (err) {
      console.error('Error updating task:', err);
      throw err;
  }
};

const deleteTask = async (taskId) => {
  const sql = 'DELETE FROM todos WHERE id = $1 RETURNING *;';
  try {
      const { rows } = await pool.query(sql, [taskId]);
      return rows[0];  // returns the deleted task, or undefined if no task was deleted
  } catch (err) {
      console.error('Error deleting task:', err);
      throw err;
  }
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
