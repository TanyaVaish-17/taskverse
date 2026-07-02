import { DndContext, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import Column from './Column';

const columns = ['todo', 'in-progress', 'done'];

function Board({ tasks, onEdit, onDelete, onDragEnd }) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const tasksByStatus = (status) => tasks.filter((t) => t.status === status);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd}>
      <div className="flex gap-8 overflow-x-auto pb-4">
        {columns.map((status) => (
          <Column
            key={status}
            status={status}
            tasks={tasksByStatus(status)}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </DndContext>
  );
}

export default Board;