/* eslint-disable camelcase */
const pool = require('pg');
//function for creating task
const addTask = async(info) => {
  const queryString = `INSERT INTO todos (user_id, title, category_id)
                        VALUES($1, $2, $3)
                        RETURNING *;`;
  const {title, user_id, category_id} = info;
  try {
    const result = await pool.query(queryString, [user_id, title, category_id]);
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
const getTaskById = async(id) =>{
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

module.exports = {addTask, getUserByEmail, getTaskById, getUserById};
