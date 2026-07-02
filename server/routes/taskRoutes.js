const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  reorderTasks,
  getAnalytics,
} = require('../controllers/taskController');

router.get('/analytics', getAnalytics); 
router.route('/').get(getTasks).post(createTask);
router.patch('/reorder', reorderTasks);
router.route('/:id').get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;