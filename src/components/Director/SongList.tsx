import { Song, GradientTheme } from '../../types/song';
import { exportAsMarkdown } from '../../utils/exportSession';

interface SongListProps {
  songs: Song[];
  currentSongId: string | null;
  onSelectSong: (songId: string) => void;
  onDeleteSong: (songId: string) => void;
  onEditSong: (song: Song) => void;
  onSetTempo: (songId: string, tempo: 'slow' | 'fast') => void;
  onSetGradient: (songId: string, gradient: GradientTheme) => void;
}

export default function SongList({
  songs,
  currentSongId,
  onSelectSong,
  onDeleteSong,
  onEditSong,
  onSetTempo,
  onSetGradient,
}: SongListProps) {
  const gradientColors: Record<GradientTheme, string> = {
    blue: 'from-blue-900 via-blue-700',
    purple: 'from-purple-900 via-purple-700',
    green: 'from-green-900 via-green-700',
    orange: 'from-orange-900 via-orange-700',
    pink: 'from-pink-900 via-pink-700',
    cyan: 'from-cyan-900 via-cyan-700',
  };

  return (
    <div className="space-y-2">
      {songs.map((song) => (
        <div
          key={song.id}
          className={`p-3 rounded-lg border ${
            currentSongId === song.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-gray-800">{song.title}</h3>
            <button
              onClick={() => onDeleteSong(song.id)}
              className="text-red-500 hover:text-red-700 text-sm"
              title="Delete song"
            >
              ✕
            </button>
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <button
              onClick={() => onSelectSong(song.id)}
              className={`px-3 py-1 text-sm rounded ${
                currentSongId === song.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {currentSongId === song.id ? 'Live' : 'Set Live'}
            </button>

            <select
              value={song.tempo}
              onChange={(e) => onSetTempo(song.id, e.target.value as 'slow' | 'fast')}
              className="px-2 py-1 text-sm border border-gray-300 rounded"
            >
              <option value="slow">🐌 Slow</option>
              <option value="fast">⚡ Fast</option>
            </select>

            <select
              value={song.gradient || 'blue'}
              onChange={(e) => onSetGradient(song.id, e.target.value as GradientTheme)}
              className="px-2 py-1 text-sm border border-gray-300 rounded"
              title="Background gradient"
            >
              <option value="blue">🔵 Blue</option>
              <option value="purple">🟣 Purple</option>
              <option value="green">🟢 Green</option>
              <option value="orange">🟠 Orange</option>
              <option value="pink">🩷 Pink</option>
              <option value="cyan">🔷 Cyan</option>
            </select>

            <button
              onClick={() => onEditSong(song)}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Edit
            </button>

            <button
              onClick={() => exportAsMarkdown(song)}
              className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
              title="Export song as MD"
            >
              Export MD
            </button>
          </div>

          {/* Gradient Preview */}
          <div className="mt-2">
            <div
              className={`h-2 rounded bg-gradient-to-r ${gradientColors[song.gradient || 'blue']} to-black`}
            ></div>
          </div>
        </div>
      ))}

      {songs.length === 0 && (
        <p className="text-gray-400 text-center py-8">
          No songs yet. Upload or create one!
        </p>
      )}
    </div>
  );
}
