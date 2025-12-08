import { AnimationSettings, GradientTheme } from '../../types/song';

interface AnimationSettingsPanelProps {
  settings: AnimationSettings;
  onSettingsChange: (settings: AnimationSettings) => void;
}

const defaultSettings: AnimationSettings = {
  effect: 'particles',
  particleCount: 60,
  particleSize: 3,
  speed: 5,
  particleColor: '#ffffff',
  particleBlur: 2,
  backgroundColor: 'blue',
};

export default function AnimationSettingsPanel({
  settings,
  onSettingsChange
}: AnimationSettingsPanelProps) {
  // Merge with defaults to ensure all properties exist
  const mergedSettings = {
    ...defaultSettings,
    ...settings,
  };

  const handleChange = (key: keyof AnimationSettings, value: any) => {
    onSettingsChange({ ...mergedSettings, [key]: value });
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-2 mt-2">
      <h3 className="text-gray-700 mb-2 flex items-center gap-1 text-xs">
        🎨 Animation Settings
      </h3>

      <div className="space-y-2">

        {/* Background Color */}
        <div>
          <label className="block text-xs text-gray-600 mb-0.5">
            Background Theme
          </label>
          <div className="grid grid-cols-3 gap-1">
            {(['blue', 'purple', 'green', 'orange', 'pink', 'cyan'] as GradientTheme[]).map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => handleChange('backgroundColor', theme)}
                className={`flex items-center gap-1.5 px-2 py-1 text-xs rounded border transition-all ${
                  mergedSettings.backgroundColor === theme
                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-200'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    background: theme === 'blue' ? '#1e3a8a' :
                               theme === 'purple' ? '#581c87' :
                               theme === 'green' ? '#14532d' :
                               theme === 'orange' ? '#7c2d12' :
                               theme === 'pink' ? '#831843' :
                               '#164e63'
                  }}
                />
                <span className="capitalize text-[10px]">{theme}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Particle Count */}
        <div>
          <label className="block text-xs text-gray-600 mb-0.5">
            Particle Count: {mergedSettings.particleCount}
          </label>
          <input
            type="range"
            min="10"
            max="150"
            value={mergedSettings.particleCount}
            onChange={(e) => handleChange('particleCount', parseInt(e.target.value))}
            className="w-full h-1"
          />
        </div>

        {/* Particle Size */}
        <div>
          <label className="block text-xs text-gray-600 mb-0.5">
            Particle Size: {mergedSettings.particleSize}px
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={mergedSettings.particleSize}
            onChange={(e) => handleChange('particleSize', parseFloat(e.target.value))}
            className="w-full h-1"
          />
        </div>

        {/* Speed */}
        <div>
          <label className="block text-xs text-gray-600 mb-0.5">
            Animation Speed: {mergedSettings.speed}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={mergedSettings.speed}
            onChange={(e) => handleChange('speed', parseInt(e.target.value))}
            className="w-full h-1"
          />
        </div>

        {/* Particle Color */}
        <div>
          <label className="block text-xs text-gray-600 mb-0.5">
            Particle Color
          </label>
          <div className="flex gap-1">
            <input
              type="color"
              value={mergedSettings.particleColor}
              onChange={(e) => handleChange('particleColor', e.target.value)}
              className="w-12 h-6 rounded cursor-pointer"
            />
            <input
              type="text"
              value={mergedSettings.particleColor}
              onChange={(e) => handleChange('particleColor', e.target.value)}
              className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="#ffffff"
            />
          </div>
        </div>

        {/* Particle Blur */}
        <div>
          <label className="block text-xs text-gray-600 mb-0.5">
            Particle Blur: {mergedSettings.particleBlur}px
          </label>
          <input
            type="range"
            min="0"
            max="20"
            step="0.5"
            value={mergedSettings.particleBlur}
            onChange={(e) => handleChange('particleBlur', parseFloat(e.target.value))}
            className="w-full h-1"
          />
        </div>
      </div>
    </div>
  );
}
