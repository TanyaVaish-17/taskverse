import { FiSearch } from 'react-icons/fi';

function Navbar({ onOpenCommandPalette, isSidebarCollapsed }) {
  return (
    <nav className="border-b border-base-800 bg-base-950/80 backdrop-blur-sm sticky top-0 z-40 flex items-stretch h-[73px]">
      {/* brand box — width locks to the sidebar's width so the divider lines up */}
      <div
        className={`flex items-center shrink-0 border-r border-base-800 px-4 transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? 'md:w-[60px] md:justify-center md:px-0' : 'md:w-[248px] md:px-6'
        }`}
      >
        {isSidebarCollapsed ? (
          <span className="hidden md:block text-xl font-serif text-accent-500">T</span>
        ) : null}
        <h1 className={`text-2xl font-serif text-stone-100 truncate ${isSidebarCollapsed ? 'md:hidden' : ''}`}>
          Task<span className="text-accent-500">Verse</span>
        </h1>
      </div>

      {/* search — opens the existing command palette so ⌘K and this stay in sync */}
      <div className="flex-1 flex items-center px-4 md:px-6">
        <button
          onClick={onOpenCommandPalette}
          className="w-full max-w-xl flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-base-700 bg-base-900/60 backdrop-blur-sm text-stone-500 hover:border-base-600 hover:text-stone-400 transition-colors duration-200"
        >
          <FiSearch size={15} />
          <span className="text-sm flex-1 text-left truncate">Search tasks, tags, or commands...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 bg-base-800 rounded-md text-xs text-stone-500 border border-base-700">
            Ctrl K
          </kbd>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;