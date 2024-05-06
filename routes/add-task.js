/* eslint-disable camelcase */
const express = require('express');
const  router  = express.Router();
const {addToDo, getUserById, getTaskById} = require('../helpers/database');

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
    title: req.body['new-todo'],
    user_id: req.session.user_id,
  };
  console.log(input);
  // posts the new task into database
  const newTask = await addToDo(input);
  console.log("added new task");
  res.json(newTask);
});
module.exports = router;
