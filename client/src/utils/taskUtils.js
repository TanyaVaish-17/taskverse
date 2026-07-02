const priorityWeight = { high: 3, medium: 2, low: 1 };

export function filterTasks(tasks, filters) {
  return tasks.filter((task) => {
    const priorityMatch = filters.priority === 'all' || task.priority === filters.priority;
    const tagMatch = filters.tags.length === 0 || filters.tags.every((tag) => task.tags?.includes(tag));
    const dueDateMatch = matchesDueDateFilter(task, filters.dueDate);
    return priorityMatch && tagMatch && dueDateMatch;
  });
}

function matchesDueDateFilter(task, filter) {
  if (filter === 'all') return true;
  if (!task.dueDate) return false;

  const due = new Date(task.dueDate);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
  const startOfDayAfter = new Date(startOfTomorrow);
  startOfDayAfter.setDate(startOfDayAfter.getDate() + 1);

  switch (filter) {
    case 'today':
      return due >= startOfToday && due < startOfTomorrow;
    case 'tomorrow':
      return due >= startOfTomorrow && due < startOfDayAfter;
    case 'week': {
      const endOfWeek = new Date(startOfToday);
      endOfWeek.setDate(endOfWeek.getDate() + (7 - endOfWeek.getDay()));
      return due >= startOfToday && due < endOfWeek;
    }
    case 'month': {
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      return due >= startOfToday && due < endOfMonth;
    }
    case 'overdue':
      return due < startOfToday;
    default:
      return true;
  }
}

export function sortTasks(tasks, sortBy) {
  const sorted = [...tasks];

  switch (sortBy) {
    case 'dueDate':
      return sorted.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    case 'priority':
      return sorted.sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);
    case 'createdAt':
      return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    default:
      return sorted.sort((a, b) => a.order - b.order);
  }
}

export function getAllTags(tasks) {
  const tagSet = new Set();
  tasks.forEach((task) => task.tags?.forEach((tag) => tagSet.add(tag)));
  return [...tagSet];
}