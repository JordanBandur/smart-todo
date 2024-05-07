const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');

const router = express.Router();
const saltRounds = 10; // Number of salt rounds for bcrypt hashing

// Route to handle account actions
router.post('/account-action', async (req, res) => {
  const { username, password, action } = req.body;
  const user = req.session.user; // Retrieve user from session
  const userId = user && user.id; // Safely access user ID if user is logged in
  const currentUsername = user && user.username; // Safely access current username if user is logged in

  // Ensure there is a logged-in user before proceeding
  if (!userId) {
    return res.status(403).send('Unauthorized to update this user.');
  }

  try {
    switch (action) {
      case 'update': {
        // Hash new password for update
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        // Use provided username or fallback to current session username if input is empty
        const finalUsername = username.trim() || currentUsername;
        const updateQuery = 'UPDATE users SET username = $1, password = $2 WHERE id = $3';

        await db.query(updateQuery, [finalUsername, hashedPassword, userId]);

        // Update session username if it has been changed
        if (finalUsername !== currentUsername) {
          req.session.user.username = finalUsername;
        }

        res.redirect('/');
        break;
      }
      case 'logout': {
        // Session destruction and handle errors
        req.session.destroy(err => {
          if (err) {
            console.error('Failed to log out:', err);
            return res.status(500).send('Logout failed.');
          }
          res.redirect('/');
        });
        break;
      }
      default:
        res.status(400).send('Invalid action.');
        break;
    }
  } catch (error) {
    console.error('Failed to update account:', error);
    res.status(500).send('Failed to update account.');
  }
});

module.exports = router;
