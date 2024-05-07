// PG database client/connection setup
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const saltRounds = 10;

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};


const db = new Pool(dbParams);

// Will hash the passwords in the database
const hashAndUpdatePasswords = async function() {
  const fetchQuery = 'SELECT id, password FROM users';
  const updateQuery = 'UPDATE users SET password = $1 WHERE id = $2';

  try {
    const users = await db.query(fetchQuery);

    for (let user of users.rows) {
      // Ensure the password isn't already hashed (in case this script is run multiple times)
      if (user.password.startsWith('$2b$')) {
        console.log('Skipping already hashed password for user id:', user.id);
        continue;
      }
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      await db.query(updateQuery, [hashedPassword, user.id]);
    }

    console.log('All passwords have been updated successfully.');
  } catch (err) {
    console.error('Error during password hashing and updating:', err);
  }
};

hashAndUpdatePasswords();

// // tests connection
// db.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Connection error', err.stack);
//   } else {
//     console.log('Successful database connection', res.rows[0].now); // Log the current time from DB
//   }
// });

// module.exports = db;
