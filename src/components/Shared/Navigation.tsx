import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  const isDirector = location.pathname === '/director';
  const isLive = location.pathname === '/live';

  return (
    <nav className="glass border-b border-luxury-200/50 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Link to="/" className="text-title-3 text-luxury-900 hover:text-accent-blue transition-colors duration-200">
            Song Presenter
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/director"
            className={`px-5 py-2 rounded-xl text-callout font-medium transition-all duration-200 ${
              isDirector
                ? 'bg-accent-blue text-white shadow-soft'
                : 'text-luxury-700 hover:bg-luxury-100 active:scale-95'
            }`}
          >
            Director
          </Link>
          <Link
            to="/live"
            className={`px-5 py-2 rounded-xl text-callout font-medium transition-all duration-200 ${
              isLive
                ? 'bg-accent-purple text-white shadow-soft'
                : 'text-luxury-700 hover:bg-luxury-100 active:scale-95'
            }`}
          >
            Live
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 text-caption text-luxury-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Open Live in a separate window</span>
        </div>
      </div>
    </nav>
  );
}
