/* eslint-disable camelcase */
const express = require('express');
const  router  = express.Router();
const {addTask, getUserById, getTaskById} = require('../helpers/database');

router.get('/', async(req, res) => {
  const user = getUserById(req.session.user_id);
  const tasks = getTaskById(req.session.user_id);
  const template = {
    user:user,
    tasks:tasks
  };
  res.render('../views/index.ejs', template);
});
//get the task and user who created it
router.post("/", async(req, res) => {
  // gets the input from client
  const input = {
    title: req.body.title,
    // user_id: req.session.user_id,
  };
  // posts the new task into database
  const newTask = await addTask(input);
  console.log("added new task");
  res.json(newTask);
});
module.exports = router;
