const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db/connection');

// Post route for login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Query database for user
    const query = 'SELECT * FROM users WHERE username = $1';
    const { rows } = await db.query(query, [username]);

    if (rows.length > 0) {
      const user = rows[0];

      // Compare hashed password
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        req.session.user = { id: user.id, username: user.username };
        res.redirect('/');
      } else {
        res.send('Username or password incorrect');
      }
    }
  } catch (err) {
    console.error('Database error', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
