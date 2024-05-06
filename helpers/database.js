/* eslint-disable camelcase */
const { Pool } = require('pg');

const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "lightbnb",
});

//function for creating task
<<<<<<< HEAD
const addTask = async(info) => {
  const queryString = `
  INSERT INTO todos (title,)
  VALUES($1)
  RETURNING *;`;
  const {title} = info;
=======
const addToDo = async(info) => {
  const queryString = `INSERT INTO todos (user_id, title, category_id)
                        VALUES($1, $2, $3)
                        RETURNING *;`;
  const {title, user_id, category_id} = info;
>>>>>>> 5f6ebc50400f9ccf39eee745be53a26d914f7eb8
  try {
    const result = await pool
      .query(queryString, [title]);
    return result.rows[0];
  } catch (err) {
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
const getToDoById = async(id) =>{
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

module.exports = {addToDo, getUserByEmail, getToDoById, getUserById};
