/* eslint-disable camelcase */
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

const addTask = async(info) => {
  const { title } = info;

  try {
    // Insert the task into the todos table
    const queryString = `
      INSERT INTO todos (title)
      VALUES ($1)
      RETURNING *;
    `;
    const result = await pool.query(queryString, [title]);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const addToDo = async(info) => {
  const { title, user_id, category } = info;

  try {
    // Query the database to retrieve the category ID based on the category name
    const categoryQuery = await pool.query('SELECT id FROM categories WHERE name = $1', [category]);

    // Check if a category with the specified name was found
    if (categoryQuery.rows.length === 0) {
      // Handle the case where the category was not found (e.g., return a default category or throw an error)
      console.error('Category not found:', category);
      throw new Error('Category not found');
    }

    // Retrieve the category ID
    const category_id = categoryQuery.rows[0].id;

    // Insert the task into the todos table
    const queryString = `INSERT INTO todos (title, user_id, category_id)
                          VALUES ($1, $2, $3)
                          RETURNING *;`;

    const result = await pool.query(queryString, [title, user_id, category_id]);
    return result.rows[0];
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};


const getUserByEmail = async(email) => {
  const queryString = `
    SELECT *
    FROM users
    WHERE email = $1
  `;
  const queryParams = [email];

  try {
    const res = await pool.query(queryString, queryParams);
    return res.rows[0] || null;
  } catch (err) {
    console.error('query error', err.stack);
  }
};

const getToDoById = async(id) => {
  const queryString = 'SELECT * FROM task WHERE id = $1';
  return pool
    .query(queryString, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      } else {
        return result.rows[0];
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const getUserById = async(id) => {
  const queryString = 'SELECT * FROM users WHERE id = $1';
  return pool
    .query(queryString, [id])
    .then((result) => {
      if (result.rows.length === 0) {
        return null;
      } else {
        return result.rows[0];
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = { addTask, addToDo, getUserByEmail, getToDoById, getUserById };
