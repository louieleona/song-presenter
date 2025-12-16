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
    <div className="glass-subtle border border-luxury-200/50 rounded-2xl p-3 mt-3">
     
      <div className="space-y-3">

        {/* Background Color */}
        <div>
          <label className="block text-[10px] text-luxury-600 mb-1.5 font-medium">
            Background Theme
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {(['blue', 'purple', 'green', 'orange', 'pink', 'cyan'] as GradientTheme[]).map((theme) => (
              <button
                key={theme}
                type="button"
                onClick={() => handleChange('backgroundColor', theme)}
                className={`flex items-center justify-center gap-1.5 px-2 py-1.5 text-[10px] rounded-lg border transition-all duration-200 ${
                  mergedSettings.backgroundColor === theme
                    ? 'border-accent-blue/30 bg-accent-blue/5 shadow-soft'
                    : 'border-luxury-200 hover:border-luxury-300 bg-white active:scale-95'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0 shadow-inner"
                  style={{
                    background: theme === 'blue' ? '#1e3a8a' :
                               theme === 'purple' ? '#581c87' :
                               theme === 'green' ? '#14532d' :
                               theme === 'orange' ? '#7c2d12' :
                               theme === 'pink' ? '#831843' :
                               '#164e63'
                  }}
                />
                <span className="capitalize text-[10px] font-medium text-luxury-700 leading-none">{theme}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Particle Count */}
        <div>
          <label className="block text-[10px] text-luxury-600 mb-1 font-medium">
            Particle Count: <span className="text-luxury-800">{mergedSettings.particleCount}</span>
          </label>
          <input
            type="range"
            min="10"
            max="150"
            value={mergedSettings.particleCount}
            onChange={(e) => handleChange('particleCount', parseInt(e.target.value))}
            className="w-full h-1.5 bg-luxury-200 rounded-lg appearance-none cursor-pointer accent-accent-blue"
          />
        </div>

        {/* Particle Size */}
        <div>
          <label className="block text-[10px] text-luxury-600 mb-1 font-medium">
            Particle Size: <span className="text-luxury-800">{mergedSettings.particleSize}px</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={mergedSettings.particleSize}
            onChange={(e) => handleChange('particleSize', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-luxury-200 rounded-lg appearance-none cursor-pointer accent-accent-blue"
          />
        </div>

        {/* Speed */}
        <div>
          <label className="block text-[10px] text-luxury-600 mb-1 font-medium">
            Animation Speed: <span className="text-luxury-800">{mergedSettings.speed}</span>
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={mergedSettings.speed}
            onChange={(e) => handleChange('speed', parseInt(e.target.value))}
            className="w-full h-1.5 bg-luxury-200 rounded-lg appearance-none cursor-pointer accent-accent-blue"
          />
        </div>

        {/* Particle Color */}
        <div>
          <label className="block text-[10px] text-luxury-600 mb-1.5 font-medium">
            Particle Color
          </label>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <input
                type="color"
                value={mergedSettings.particleColor}
                onChange={(e) => handleChange('particleColor', e.target.value)}
                className="w-5 h-5 rounded-full cursor-pointer border-2 border-luxury-200"
                style={{
                  padding: 0,
                  appearance: 'none',
                  WebkitAppearance: 'none',
                }}
              />
              <div
                className="absolute inset-0 rounded-full pointer-events-none shadow-inner"
                style={{
                  background: mergedSettings.particleColor,
                  border: '2px solid rgba(0,0,0,0.1)'
                }}
              />
            </div>
            <input
              type="text"
              value={mergedSettings.particleColor}
              onChange={(e) => handleChange('particleColor', e.target.value)}
              className="flex-1 px-2 py-1.5 text-[10px] border border-luxury-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-accent-blue/20 focus:border-accent-blue transition-all font-mono"
              placeholder="#ffffff"
            />
          </div>
        </div>

        {/* Particle Blur */}
        <div>
          <label className="block text-[10px] text-luxury-600 mb-1 font-medium">
            Particle Blur: <span className="text-luxury-800">{mergedSettings.particleBlur}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="20"
            step="0.5"
            value={mergedSettings.particleBlur}
            onChange={(e) => handleChange('particleBlur', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-luxury-200 rounded-lg appearance-none cursor-pointer accent-accent-blue"
          />
        </div>
      </div>
    </div>
  );
}
