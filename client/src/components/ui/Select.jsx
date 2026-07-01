import { forwardRef } from 'react';

const Select = forwardRef(({ label, error, children, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <select
        ref={ref}
        className={`w-full px-3 py-2 bg-base-900 border rounded-lg text-stone-200 focus:outline-none focus:ring-2 focus:ring-accent-500/50 transition-colors ${
          error ? 'border-red-800' : 'border-base-700'
        } ${className}`}
        {...props}
      >
        {children}
      </select>
    </div>
  );
});

Select.displayName = 'Select';
export default Select;