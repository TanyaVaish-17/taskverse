import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FiCalendar, FiEdit2, FiTrash2 } from 'react-icons/fi';
import Badge from '../ui/Badge';

function TaskCard({ task, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="group bg-base-900 border border-base-700 rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-base-600 transition-colors"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-stone-200 font-medium leading-snug">{task.title}</h4>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(task); }}
            className="p-1 text-stone-500 hover:text-accent-500 transition-colors"
          >
            <FiEdit2 size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(task._id); }}
            className="p-1 text-stone-500 hover:text-red-400 transition-colors"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-stone-500 mb-3 line-clamp-2">{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <Badge priority={task.priority} />
        {task.dueDate && (
          <span className={`flex items-center gap-1 text-xs ${isOverdue ? 'text-red-400' : 'text-stone-500'}`}>
            <FiCalendar size={12} />
            {new Date(task.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
        )}
      </div>
    </div>
  );
}

export default TaskCard;