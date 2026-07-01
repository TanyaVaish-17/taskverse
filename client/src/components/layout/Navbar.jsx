import { FiCommand } from 'react-icons/fi';

function Navbar({ onOpenCommandPalette }) {
  return (
    <nav className="border-b border-base-800 bg-base-950/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-serif text-stone-100">
            Task<span className="text-accent-500">Verse</span>
          </h1>
        </div>

        <button
          onClick={onOpenCommandPalette}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-base-700 text-stone-400 hover:text-stone-200 hover:border-base-600 transition-colors text-sm"
        >
          <FiCommand size={14} />
          <span>Quick add</span>
          <kbd className="ml-1 px-1.5 py-0.5 bg-base-800 rounded text-xs">⌘K</kbd>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;