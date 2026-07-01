const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching tasks', error: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching task', error: error.message });
  }
};

// @desc    Create a task
// @route   POST /api/tasks
exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error creating task', error: error.message });
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error updating task', error: error.message });
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting task', error: error.message });
  }
};

// @desc    Reorder tasks (for drag-and-drop persistence)
// @route   PATCH /api/tasks/reorder
exports.reorderTasks = async (req, res) => {
  try {
    const { tasks } = req.body; // array of { id, status, order }
    const bulkOps = tasks.map((t) => ({
      updateOne: {
        filter: { _id: t.id },
        update: { status: t.status, order: t.order },
      },
    }));
    await Task.bulkWrite(bulkOps);
    res.status(200).json({ message: 'Tasks reordered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error reordering tasks', error: error.message });
  }
};