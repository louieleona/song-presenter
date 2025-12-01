import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();
  const isDirector = location.pathname === '/director';
  const isLive = location.pathname === '/live';

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex gap-4 items-center">
        <Link
          to="/director"
          className={`px-4 py-2 rounded ${
            isDirector
              ? 'bg-blue-600'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Director
        </Link>
        <Link
          to="/live"
          className={`px-4 py-2 rounded ${
            isLive
              ? 'bg-blue-600'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Live
        </Link>
        <span className="text-gray-400 text-sm ml-4">
          Tip: Open /live in a separate tab for presentations
        </span>
      </div>
    </nav>
  );
}
