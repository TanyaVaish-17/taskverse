import api from './api';

export const taskService = {
  getAll: () => api.get('/tasks').then((res) => res.data),

  getOne: (id) => api.get(`/tasks/${id}`).then((res) => res.data),

  create: (taskData) => api.post('/tasks', taskData).then((res) => res.data),

  update: (id, taskData) => api.put(`/tasks/${id}`, taskData).then((res) => res.data),

  remove: (id) => api.delete(`/tasks/${id}`).then((res) => res.data),

  reorder: (tasks) => api.patch('/tasks/reorder', { tasks }).then((res) => res.data),

  getAnalytics: () => api.get('/tasks/analytics').then((res) => res.data),
  
};