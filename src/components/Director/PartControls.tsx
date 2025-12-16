import { Song } from '../../types/song';
import { getPartLabel } from '../../utils/markdownParser';

interface PartControlsProps {
  song: Song | null;
  songs: Song[];
  currentPartIndex: number;
  onPartSelected: (index: number) => void;
  onSongSelected: (songId: string) => void;
}

export default function PartControls({
  song,
  songs,
  currentPartIndex,
  onPartSelected,
  onSongSelected,
}: PartControlsProps) {
  if (!song) {
    return (
      <div className="text-center py-18">
        <div className="w-16 h-16 rounded-full bg-luxury-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-luxury-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>
        <p className="text-title-3 text-luxury-700 mb-2">No song selected</p>
        <p className="text-callout text-luxury-500">Select a song from the list to control it</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h2 className="text-headline text-luxury-900 mb-2">
          {song.title}
        </h2>
        <p className="text-callout text-luxury-500">
          Click on any part to display it on the live screen
        </p>
      </div>

      {/* Song Parts with Lyrics Preview */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {song.parts.map((part, index) => (
          <button
            key={index}
            onClick={() => onPartSelected(index)}
            className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
              currentPartIndex === index
                ? 'border-accent-blue/30 bg-accent-blue/5 shadow-soft-lg'
                : 'border-luxury-200 bg-white hover:border-luxury-300 hover:shadow-soft active:scale-[0.99]'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`font-semibold text-caption px-4 py-2 rounded-xl transition-all duration-200 ${
                  currentPartIndex === index
                    ? 'bg-accent-blue text-white shadow-soft'
                    : 'bg-luxury-100 text-luxury-700'
                }`}
              >
                {getPartLabel(part)}
              </div>
              {currentPartIndex === index && (
                <span className="text-caption text-accent-blue font-semibold flex items-center gap-2">
                  <span className="inline-block w-2 h-2 bg-accent-blue rounded-full animate-pulse"></span>
                  LIVE
                </span>
              )}
            </div>
            <div
              className={`text-callout leading-relaxed whitespace-pre-wrap ${
                currentPartIndex === index
                  ? 'text-luxury-800 font-medium'
                  : 'text-luxury-600'
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
      <div className="flex gap-3 mt-6 pt-6 border-t border-luxury-200/50">
        <button
          onClick={() => {
            const currentIndex = songs.findIndex(s => s.id === song.id);
            if (currentIndex > 0) {
              onSongSelected(songs[currentIndex - 1].id);
            }
          }}
          disabled={songs.findIndex(s => s.id === song.id) === 0}
          className="flex-1 px-4 py-3 bg-luxury-100 text-luxury-700 rounded-xl hover:bg-luxury-200 disabled:opacity-40 disabled:cursor-not-allowed text-callout font-medium transition-all duration-200 active:scale-95 disabled:active:scale-100"
        >
          ← Previous Song
        </button>
        <button
          onClick={() => {
            const currentIndex = songs.findIndex(s => s.id === song.id);
            if (currentIndex < songs.length - 1) {
              onSongSelected(songs[currentIndex + 1].id);
            }
          }}
          disabled={songs.findIndex(s => s.id === song.id) === songs.length - 1}
          className="flex-1 px-4 py-3 bg-luxury-100 text-luxury-700 rounded-xl hover:bg-luxury-200 disabled:opacity-40 disabled:cursor-not-allowed text-callout font-medium transition-all duration-200 active:scale-95 disabled:active:scale-100"
        >
          Next Song →
        </button>
      </div>
    </div>
  );
}
