const variants = {
    primary: 'bg-accent-500 hover:bg-accent-600 text-base-950 font-semibold',
    secondary: 'bg-base-800 hover:bg-base-700 text-stone-200 border border-base-600',
    ghost: 'bg-transparent hover:bg-base-800 text-stone-300',
    danger: 'bg-transparent hover:bg-red-950 text-red-400 border border-red-900',
  };
  
  function Button({ children, variant = 'primary', className = '', ...props }) {
    return (
      <button
        className={`px-4 py-2 rounded-lg transition-colors duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  
  export default Button;