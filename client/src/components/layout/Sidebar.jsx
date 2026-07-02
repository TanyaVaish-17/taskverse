import { FiChevronLeft, FiChevronRight, FiFlag, FiTag, FiCalendar, FiX } from 'react-icons/fi';

const priorities = [
  { value: 'all', label: 'All' },
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const dueDateOptions = [
  { value: 'all', label: 'Any time' },
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'week', label: 'This week' },
  { value: 'month', label: 'This month' },
  { value: 'overdue', label: 'Overdue' },
];

function Sidebar({
  filters,
  onFilterChange,
  onClearFilters,
  availableTags,
  priorityCounts,
  isCollapsed,
  onToggleCollapse,
  isMobileOpen,
  onMobileClose,
}) {
  const toggleTag = (tag) => {
    const next = filters.tags.includes(tag)
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];
    onFilterChange('tags', next);
  };

  const hasActiveFilters =
    filters.priority !== 'all' || filters.tags.length > 0 || filters.dueDate !== 'all';

  return (
    <>
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={onMobileClose} />
      )}

      <aside
        className={`
          bg-base-900 border-r border-base-800 flex flex-col
          transition-[width] duration-300 ease-in-out
          fixed md:sticky top-0 md:top-[73px] left-0
          h-screen md:h-[calc(100vh-73px)]
          z-50 md:z-30
          ${isCollapsed ? 'md:w-[60px]' : 'md:w-[248px]'}
          w-[248px]
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* header row — title and collapse toggle sit on the same line */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-base-800 shrink-0">
          {!isCollapsed && (
            <span className="text-xs font-medium text-stone-400 uppercase tracking-wider">
              Filters
            </span>
          )}
          <button
            onClick={onToggleCollapse}
            title={isCollapsed ? 'Expand filters' : 'Collapse filters'}
            className={`hidden md:flex p-1.5 rounded-lg text-stone-500 hover:text-stone-200 hover:bg-base-800 transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
          >
            {isCollapsed ? <FiChevronRight size={15} /> : <FiChevronLeft size={15} />}
          </button>
          <button
            onClick={onMobileClose}
            className="md:hidden p-1.5 rounded-lg text-stone-500 hover:text-stone-200 hover:bg-base-800 transition-colors"
          >
            <FiX size={15} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin py-2">
          {/* priority */}
          <div className="px-3 py-3">
            <div className={`flex items-center gap-2 text-stone-500 mb-1.5 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
              <FiTag size={0} className="hidden" />
              <FiFlag size={13} title="Priority" />
              {!isCollapsed && <span className="text-[11px] uppercase tracking-wider">Priority</span>}
            </div>
            <div className="space-y-0.5">
              {priorities.map((p) => {
                const isActive = filters.priority === p.value;
                return (
                  <button
                    key={p.value}
                    onClick={() => onFilterChange('priority', p.value)}
                    title={isCollapsed ? p.label : undefined}
                    className={`w-full flex items-center rounded-lg text-sm transition-colors duration-200 ${
                      isCollapsed ? 'justify-center py-2' : 'justify-between px-2.5 py-1.5'
                    } ${
                      isActive
                        ? 'bg-accent-500/10 text-accent-500 font-medium border-l-2 border-accent-500'
                        : 'text-stone-400 hover:bg-base-800/70 border-l-2 border-transparent'
                    }`}
                  >
                    {isCollapsed ? (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: isActive ? '#ff7a45' : '#4a433c' }} />
                    ) : (
                      <>
                        <span>{p.label}</span>
                        <span className="text-xs text-stone-600">
                          {priorityCounts[p.value] ?? 0}
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-base-800" />

          {/* tags */}
          <div className="px-3 py-3">
            <div className={`flex items-center gap-2 text-stone-500 mb-1.5 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
              <FiTag size={13} title="Tags" />
              {!isCollapsed && <span className="text-[11px] uppercase tracking-wider">Tags</span>}
            </div>
            {!isCollapsed && (
              <div className="flex flex-wrap gap-1.5 px-2">
                {availableTags.length === 0 && (
                  <span className="text-xs text-stone-600">No tags yet</span>
                )}
                {availableTags.map((tag) => {
                  const isActive = filters.tags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-2.5 py-1 rounded-full text-xs border transition-colors duration-200 ${
                        isActive
                          ? 'bg-accent-500/15 border-accent-500/40 text-accent-500 font-medium'
                          : 'border-base-700 text-stone-500 hover:border-base-600 hover:text-stone-300'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="border-t border-base-800" />

          {/* due date */}
          <div className="px-3 py-3">
            <div className={`flex items-center gap-2 text-stone-500 mb-1.5 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
              <FiCalendar size={13} title="Due date" />
              {!isCollapsed && <span className="text-[11px] uppercase tracking-wider">Due date</span>}
            </div>
            <div className="space-y-0.5">
              {dueDateOptions.map((d) => {
                const isActive = filters.dueDate === d.value;
                return (
                  <button
                    key={d.value}
                    onClick={() => onFilterChange('dueDate', d.value)}
                    title={isCollapsed ? d.label : undefined}
                    className={`w-full flex items-center rounded-lg text-sm transition-colors duration-200 ${
                      isCollapsed ? 'justify-center py-2' : 'px-2.5 py-1.5'
                    } ${
                      isActive
                        ? 'bg-accent-500/10 text-accent-500 font-medium border-l-2 border-accent-500'
                        : 'text-stone-400 hover:bg-base-800/70 border-l-2 border-transparent'
                    }`}
                  >
                    {isCollapsed ? (
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: isActive ? '#ff7a45' : '#4a433c' }} />
                    ) : (
                      d.label
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {!isCollapsed && hasActiveFilters && (
          <div className="p-3 border-t border-base-800 shrink-0">
            <button
              onClick={onClearFilters}
              className="w-full px-3 py-2 rounded-lg text-sm text-stone-400 border border-base-700 hover:border-red-900 hover:text-red-400 transition-colors duration-200"
            >
              Clear filters
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

export default Sidebar;