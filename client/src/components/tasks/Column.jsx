import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';

const columnConfig = {
  todo: { label: 'To Do', dot: 'bg-stone-500' },
  'in-progress': { label: 'In Progress', dot: 'bg-accent-500' },
  done: { label: 'Done', dot: 'bg-priority-low' },
};

function Column({ status, tasks, onEdit, onDelete }) {
  const { setNodeRef } = useDroppable({ id: status });
  const config = columnConfig[status];

  return (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center gap-2 mb-4">
        <span className={`w-2 h-2 rounded-full ${config.dot}`} />
        <h3 className="text-sm font-medium text-stone-300 uppercase tracking-wide">{config.label}</h3>
        <span className="text-xs text-stone-600">{tasks.length}</span>
      </div>

      <div ref={setNodeRef} className="space-y-3 min-h-[65vh]">
        <SortableContext items={tasks.map((t) => t._id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </SortableContext>

        {tasks.length === 0 && (
          <div className="border border-dashed border-base-800 rounded-xl py-8 text-center text-stone-700 text-sm">
            No tasks here
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;