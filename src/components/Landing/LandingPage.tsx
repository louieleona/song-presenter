import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-luxury-50 via-white to-luxury-100 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full">
        {/* Header */}
        <div className="text-center mb-18 animate-fade-in-up">
          <h1 className="text-display font-bold text-luxury-900 mb-4 tracking-tight">
            Song Presenter
          </h1>
          <p className="text-body-large text-luxury-600 max-w-2xl mx-auto">
            Professional lyrics presentation system with dual-screen support and elegant animations
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-18">
          {/* Director Card */}
          <button
            onClick={() => navigate('/director')}
            className="group relative bg-white rounded-3xl p-10 transition-all duration-300 shadow-soft-lg hover:shadow-soft-2xl active:scale-[0.98] text-left overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-accent-blue/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-title-1 text-luxury-900 mb-2">Director</h2>
              <p className="text-callout text-luxury-600 mb-6">
                Control and manage your song presentations with precision
              </p>
              <ul className="space-y-2 text-caption text-luxury-500">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent-blue" />
                  Create and edit songs
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent-blue" />
                  Control live display
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent-blue" />
                  Manage collections
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent-blue" />
                  Customize animations
                </li>
              </ul>
            </div>
          </button>

          {/* Live Display Card */}
          <button
            onClick={() => navigate('/live')}
            className="group relative bg-white rounded-3xl p-10 transition-all duration-300 shadow-soft-lg hover:shadow-soft-2xl active:scale-[0.98] text-left overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-accent-purple/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-7 h-7 text-accent-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-title-1 text-luxury-900 mb-2">Live Display</h2>
              <p className="text-callout text-luxury-600 mb-6">
                Full-screen presentation view with beautiful animations
              </p>
              <ul className="space-y-2 text-caption text-luxury-500">
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent-purple" />
                  Full-screen lyrics display
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent-purple" />
                  Animated backgrounds
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent-purple" />
                  Real-time synchronization
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-accent-purple" />
                  Dual-screen support
                </li>
              </ul>
            </div>
          </button>
        </div>

        {/* Features Grid */}
        <div className="glass-subtle rounded-3xl p-8 mb-12 border border-luxury-200/50">
          <h3 className="text-title-3 text-luxury-800 mb-6 text-center">Features</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-pink/20 to-accent-orange/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">✨</span>
              </div>
              <p className="text-caption text-luxury-700">6 Gradient Themes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-blue/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎨</span>
              </div>
              <p className="text-caption text-luxury-700">Custom Animations</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-green/20 to-accent-teal/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💾</span>
              </div>
              <p className="text-caption text-luxury-700">Auto-Save</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-blue/20 to-accent-purple/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📥</span>
              </div>
              <p className="text-caption text-luxury-700">Import/Export</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <p className="text-caption text-luxury-500">Built with React, TypeScript, and Tailwind CSS</p>
          <div className="flex items-center justify-center gap-8">
            <a
              href="https://github.com/louieleona/song-presenter"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-callout text-luxury-600 hover:text-accent-blue transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
              </svg>
              <span>GitHub</span>
            </a>
            <a
              href="https://buymeacoffee.com/lleona"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-callout text-luxury-600 hover:text-accent-orange transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z"/>
              </svg>
              <span>Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
