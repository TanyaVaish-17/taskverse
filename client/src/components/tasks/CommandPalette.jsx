import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiSearch } from 'react-icons/fi';

function CommandPalette({ isOpen, onClose, tasks, onCreateNew, onSelectTask }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const matches = query
    ? tasks.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-lg bg-base-900 border border-base-700 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-base-800">
              <FiSearch className="text-stone-500" size={16} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks or create new..."
                className="flex-1 bg-transparent text-stone-200 placeholder-stone-600 focus:outline-none text-sm"
              />
              <kbd className="px-1.5 py-0.5 bg-base-800 rounded text-xs text-stone-500">esc</kbd>
            </div>

            <div className="max-h-72 overflow-y-auto scrollbar-thin">
              <button
                onClick={() => { onCreateNew(query); onClose(); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-base-800 transition-colors text-accent-500"
              >
                <FiPlus size={16} />
                <span className="text-sm">
                  {query ? `Create "${query}"` : 'Create new task'}
                </span>
              </button>

              {matches.map((task) => (
                <button
                  key={task._id}
                  onClick={() => { onSelectTask(task); onClose(); }}
                  className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-base-800 transition-colors"
                >
                  <span className="text-sm text-stone-300">{task.title}</span>
                  <span className="text-xs text-stone-600 capitalize">{task.status}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CommandPalette;