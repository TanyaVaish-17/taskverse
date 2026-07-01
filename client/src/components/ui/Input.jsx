import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-medium text-stone-400 mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-3 py-2 bg-base-900 border rounded-lg text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-2 focus:ring-accent-500/50 transition-colors ${
          error ? 'border-red-800' : 'border-base-700'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;