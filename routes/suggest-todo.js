const express = require('express');
const router = express.Router();
const { suggestTodo } = require('../helpers/suggestTodo');

router.post('/suggest-todo', async (req, res) => {
  try {
    const suggestion = await suggestTodo();
    res.json({ success: true, suggestion });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
