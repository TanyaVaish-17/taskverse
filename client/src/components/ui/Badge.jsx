const priorityStyles = {
    low: 'bg-priority-low/15 text-priority-low border-priority-low/30',
    medium: 'bg-priority-medium/15 text-priority-medium border-priority-medium/30',
    high: 'bg-priority-high/15 text-priority-high border-priority-high/30',
  };
  
  function Badge({ priority }) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${priorityStyles[priority]}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        {priority}
      </span>
    );
  }
  
  export default Badge;