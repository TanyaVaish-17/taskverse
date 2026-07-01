import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';
import toast from 'react-hot-toast';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError('Failed to load tasks. Is the server running?');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData);
      setTasks((prev) => [newTask, ...prev]);
      toast.success('Task created');
      return newTask;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create task');
      throw err;
    }
  };

  const editTask = async (id, taskData) => {
    const prevTasks = tasks;
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, ...taskData } : t)));
    try {
      const updated = await taskService.update(id, taskData);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
      toast.success('Task updated');
    } catch (err) {
      setTasks(prevTasks); 
      toast.error(err.response?.data?.message || 'Failed to update task');
    }
  };

  const removeTask = async (id) => {
    const prevTasks = tasks;
    setTasks((prev) => prev.filter((t) => t._id !== id));
    try {
      await taskService.remove(id);
      toast.success('Task deleted');
    } catch (err) {
      setTasks(prevTasks); 
      toast.error('Failed to delete task');
    }
  };

  const reorderTasks = async (updatedTasks) => {
    const prevTasks = tasks;
    setTasks(updatedTasks); 
    try {
      await taskService.reorder(
        updatedTasks.map((t) => ({ id: t._id, status: t.status, order: t.order }))
      );
    } catch (err) {
      setTasks(prevTasks);
      toast.error('Failed to reorder tasks');
    }
  };

  return { tasks, loading, error, addTask, editTask, removeTask, reorderTasks, refetch: fetchTasks };
}