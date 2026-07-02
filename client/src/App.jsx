import { useState, useEffect, useMemo } from 'react';
import Layout from './components/layout/Layout';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Board from './components/tasks/Board';
import TaskForm from './components/tasks/TaskForm';
import CommandPalette from './components/tasks/CommandPalette';
import AnalyticsStrip from './components/tasks/AnalyticsStrip';
import Modal from './components/ui/Modal';
import Button from './components/ui/Button';
import { useTasks } from './hooks/useTasks';
import { useAnalytics } from './hooks/useAnalytics';
import { filterTasks, sortTasks, getAllTags } from './utils/taskUtils';
import { FiPlus, FiFilter } from 'react-icons/fi';

function App() {
  const { tasks, loading, error, addTask, editTask, removeTask, reorderTasks } = useTasks();
  const { analytics, loading: analyticsLoading } = useAnalytics(tasks.length);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [prefillTitle, setPrefillTitle] = useState('');
  const [filters, setFilters] = useState({ priority: 'all', tags: [], dueDate: 'all' });
  const [sortBy, setSortBy] = useState('order');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // global shortcut for the command palette
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const availableTags = useMemo(() => getAllTags(tasks), [tasks]);

  const visibleTasks = useMemo(
    () => sortTasks(filterTasks(tasks, filters), sortBy),
    [tasks, filters, sortBy]
  );

  // counts shown next to each priority option in the sidebar — respects tag/due date filters
  // but ignores the priority filter itself so all counts stay visible at once
  const priorityCounts = useMemo(() => {
    const filtered = filterTasks(tasks, { ...filters, priority: 'all' });
    return {
      all: filtered.length,
      high: filtered.filter((t) => t.priority === 'high').length,
      medium: filtered.filter((t) => t.priority === 'medium').length,
      low: filtered.filter((t) => t.priority === 'low').length,
    };
  }, [tasks, filters]);

  const openCreateModal = (title = '') => {
    setEditingTask(null);
    setPrefillTitle(title);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleFormSubmit = async (data) => {
    if (editingTask) {
      await editTask(editingTask._id, data);
    } else {
      await addTask(data);
    }
    setModalOpen(false);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeTask = tasks.find((t) => t._id === active.id);
    if (!activeTask) return;

    const overStatus = ['todo', 'in-progress', 'done'].includes(over.id)
      ? over.id
      : tasks.find((t) => t._id === over.id)?.status;

    if (!overStatus || activeTask.status === overStatus) return;

    const updated = tasks.map((t) =>
      t._id === active.id ? { ...t, status: overStatus } : t
    );
    reorderTasks(updated);
  };

  return (
    <Layout>
      <Navbar
      onOpenCommandPalette={() => setPaletteOpen(true)}
      isSidebarCollapsed={sidebarCollapsed}
      />

      <div className="flex">
        <Sidebar
          filters={filters}
          onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
          onClearFilters={() => setFilters({ priority: 'all', tags: [], dueDate: 'all' })}
          availableTags={availableTags}
          priorityCounts={priorityCounts}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
          isMobileOpen={mobileFilterOpen}
          onMobileClose={() => setMobileFilterOpen(false)}
        />

        <main className="flex-1 min-w-0 px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-3xl font-serif text-stone-100">Your board</h2>
                <p className="text-stone-500 text-sm mt-1">
                  {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="md:hidden p-2 rounded-lg border border-base-700 text-stone-400 hover:text-stone-200 transition-colors"
                >
                  <FiFilter size={16} />
                </button>
                <Button onClick={() => openCreateModal()} className="flex items-center gap-2">
                  <FiPlus size={16} />
                  New task
                </Button>
              </div>
            </div>

            <AnalyticsStrip analytics={analytics} loading={analyticsLoading} />
          </div>

          {loading && <p className="text-stone-500">Loading tasks...</p>}
          {error && <p className="text-red-400">{error}</p>}

          {!loading && !error && (
            <Board
              tasks={visibleTasks}
              onEdit={openEditModal}
              onDelete={removeTask}
              onDragEnd={handleDragEnd}
            />
          )}
        </main>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTask ? 'Edit task' : 'New task'}
      >
        <TaskForm
          task={editingTask}
          prefillTitle={prefillTitle}
          onSubmit={handleFormSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>

      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        tasks={tasks}
        onCreateNew={openCreateModal}
        onSelectTask={openEditModal}
      />
    </Layout>
  );
}

export default App;