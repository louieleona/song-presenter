import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">
            Song Presenter
          </h1>
          <p className="text-xl text-blue-100">
            Modern lyrics presentation system with dual-screen support
          </p>
        </div>

        {/* Main Buttons */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Director Button */}
          <button
            onClick={() => navigate('/director')}
            className="group bg-white hover:bg-gray-50 rounded-2xl p-8 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <div className="text-6xl mb-4">🎬</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Director</h2>
            <p className="text-gray-600 mb-4">
              Control and manage your song presentation
            </p>
            <ul className="text-sm text-gray-500 text-left space-y-2">
              <li>• Create and edit songs</li>
              <li>• Control live display</li>
              <li>• Manage collections</li>
              <li>• Customize animations</li>
            </ul>
          </button>

          {/* Live Button */}
          <button
            onClick={() => navigate('/live')}
            className="group bg-white hover:bg-gray-50 rounded-2xl p-8 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <div className="text-6xl mb-4">📺</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Live Display</h2>
            <p className="text-gray-600 mb-4">
              Full-screen presentation view for audience
            </p>
            <ul className="text-sm text-gray-500 text-left space-y-2">
              <li>• Full-screen lyrics display</li>
              <li>• Animated backgrounds</li>
              <li>• Real-time sync</li>
              <li>• Dual-screen support</li>
            </ul>
          </button>
        </div>

        {/* Features */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-blue-50 text-sm">
            <div>✨ 6 Gradient Themes</div>
            <div>🎨 Custom Animations</div>
            <div>💾 Auto-Save</div>
            <div>📥 Import/Export</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-blue-100 text-sm space-y-3">
          <p className="mb-2">Built with React, TypeScript, and Tailwind CSS</p>
          <div className="flex items-center justify-center gap-6">
            <a
              href="https://github.com/louieleona/song-presenter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
            >
              <span>⭐</span>
              <span>GitHub</span>
            </a>
            <a
              href="https://buymeacoffee.com/lleona"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
            >
              <span>☕</span>
              <span>Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
