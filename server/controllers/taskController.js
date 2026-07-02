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

// @desc    Get task analytics (completed this week, overdue count, etc.)
// @route   GET /api/tasks/analytics
exports.getAnalytics = async (req, res) => {
    try {
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - now.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
  
      const [statusCounts, completedThisWeek, overdueCount, priorityCounts] = await Promise.all([
        // count of tasks per status
        Task.aggregate([
          { $group: { _id: '$status', count: { $sum: 1 } } },
        ]),
  
        // tasks marked done, updated since start of this week
        Task.countDocuments({
          status: 'done',
          updatedAt: { $gte: startOfWeek },
        }),
  
        // tasks with a due date in the past that aren't done
        Task.countDocuments({
          dueDate: { $lt: now, $ne: null },
          status: { $ne: 'done' },
        }),
  
        // count of tasks per priority
        Task.aggregate([
          { $group: { _id: '$priority', count: { $sum: 1 } } },
        ]),
    ]);
  
    // convert aggregate arrays into simple key-value objects
    const statusMap = statusCounts.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {});
    const priorityMap = priorityCounts.reduce((acc, p) => ({ ...acc, [p._id]: p.count }), {});
    const byStatus = {
        todo: statusMap.todo || 0,
        inProgress: statusMap['in-progress'] || 0,
        done: statusMap.done || 0,
    };
    res.status(200).json({
        total: byStatus.todo + byStatus.inProgress + byStatus.done,
        byStatus,
        byPriority: {
            high: priorityMap.high || 0,
            medium: priorityMap.medium || 0,
            low: priorityMap.low || 0,
        },
        completedThisWeek,
        overdueCount,
    });
    } catch (error) {
      res.status(500).json({ message: 'Server error fetching analytics', error: error.message });
    }
};