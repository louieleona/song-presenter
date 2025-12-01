import { Song } from '../../types/song';
import { getPartLabel } from '../../utils/markdownParser';

interface PartControlsProps {
  song: Song | null;
  currentPartIndex: number;
  onPartSelected: (index: number) => void;
}

export default function PartControls({
  song,
  currentPartIndex,
  onPartSelected,
}: PartControlsProps) {
  if (!song) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>No song selected</p>
        <p className="text-sm mt-2">Select a song from the list to control it</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          {song.title}
        </h2>
        <p className="text-sm text-gray-500">
          Click on any part to display it on the live screen
        </p>
      </div>

      {/* Song Parts with Lyrics Preview */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {song.parts.map((part, index) => (
          <button
            key={index}
            onClick={() => onPartSelected(index)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              currentPartIndex === index
                ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              <div
                className={`font-bold text-sm px-3 py-1 rounded-full ${
                  currentPartIndex === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {getPartLabel(part)}
              </div>
              {currentPartIndex === index && (
                <span className="text-xs text-blue-600 font-semibold flex items-center gap-1">
                  <span className="inline-block w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
                  LIVE
                </span>
              )}
            </div>
            <div
              className={`text-sm leading-relaxed whitespace-pre-wrap ${
                currentPartIndex === index
                  ? 'text-gray-800 font-medium'
                  : 'text-gray-600'
              }`}
              style={{
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {part.lyrics}
            </div>
          </button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={() => onPartSelected(Math.max(0, currentPartIndex - 1))}
          disabled={currentPartIndex === 0}
          className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          ← Previous
        </button>
        <button
          onClick={() =>
            onPartSelected(Math.min(song.parts.length - 1, currentPartIndex + 1))
          }
          disabled={currentPartIndex === song.parts.length - 1}
          className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
