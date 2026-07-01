import { useState } from 'react';
import Layout from './components/layout/Layout';
import Navbar from './components/layout/Navbar';
import Board from './components/tasks/Board';
import TaskForm from './components/tasks/TaskForm';
import Modal from './components/ui/Modal';
import Button from './components/ui/Button';
import { useTasks } from './hooks/useTasks';
import { FiPlus } from 'react-icons/fi';

function App() {
  const { tasks, loading, error, addTask, editTask, removeTask, reorderTasks } = useTasks();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const openCreateModal = () => {
    setEditingTask(null);
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
      <Navbar onOpenCommandPalette={openCreateModal} />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-serif text-stone-100">Your board</h2>
            <p className="text-stone-500 text-sm mt-1">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
            </p>
          </div>
          <Button onClick={openCreateModal} className="flex items-center gap-2">
            <FiPlus size={16} />
            New task
          </Button>
        </div>

        {loading && <p className="text-stone-500">Loading tasks...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <Board
            tasks={tasks}
            onEdit={openEditModal}
            onDelete={removeTask}
            onDragEnd={handleDragEnd}
          />
        )}
      </main>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingTask ? 'Edit task' : 'New task'}
      >
        <TaskForm
          task={editingTask}
          onSubmit={handleFormSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </Layout>
  );
}

export default App;