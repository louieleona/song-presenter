import { useState } from 'react';
import { Song, GradientTheme, AnimationSettings } from '../../types/song';
import { exportAsMarkdown } from '../../utils/exportSession';
import AnimationSettingsPanel from './AnimationSettingsPanel';
import UploadZone from './UploadZone';

interface SongListProps {
  songs: Song[];
  currentSongId: string | null;
  onSelectSong: (songId: string) => void;
  onDeleteSong: (songId: string) => void;
  onEditSong: (song: Song) => void;
  onSetAnimationSettings: (songId: string, settings: AnimationSettings) => void;
  onFilesSelected: (files: FileList) => void;
  onNewSong: () => void;
  onImportCollection: () => void;
  onExportCollection: () => void;
  onNewSession: () => void;
}

export default function SongList({
  songs,
  currentSongId,
  onSelectSong,
  onDeleteSong,
  onEditSong,
  onSetAnimationSettings,
  onFilesSelected,
  onNewSong,
  onImportCollection,
  onExportCollection,
  onNewSession,
}: SongListProps) {
  const [expandedSongId, setExpandedSongId] = useState<string | null>(null);

  const gradientColors: Record<GradientTheme, string> = {
    blue: 'from-blue-900 via-blue-700',
    purple: 'from-purple-900 via-purple-700',
    green: 'from-green-900 via-green-700',
    orange: 'from-orange-900 via-orange-700',
    pink: 'from-pink-900 via-pink-700',
    cyan: 'from-cyan-900 via-cyan-700',
  };

  const defaultAnimationSettings: AnimationSettings = {
    effect: 'particles',
    particleCount: 60,
    particleSize: 3,
    speed: 5,
    particleColor: '#ffffff',
    particleBlur: 2,
    backgroundColor: 'blue',
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2">
        {songs.length === 0 && (
          <div className="mb-4">
            <UploadZone onFilesSelected={onFilesSelected} />
          </div>
        )}
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
              className="text-gray-400 hover:text-gray-600 text-sm"
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
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {currentSongId === song.id ? 'Live' : 'Set Live'}
            </button>

            <button
              onClick={() => onEditSong(song)}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Edit
            </button>

            <button
              onClick={() => exportAsMarkdown(song)}
              className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              title="Export song as MD"
            >
              Export MD
            </button>
          </div>

          {/* Animation Settings Toggle */}
          <div className="mt-2">
            <button
              onClick={() => setExpandedSongId(expandedSongId === song.id ? null : song.id)}
              className="text-sm text-gray-600 hover:text-gray-800 flex items-center gap-1"
            >
              {expandedSongId === song.id ? '▼' : '▶'} Animation Settings
            </button>
          </div>

          {/* Animation Settings Panel */}
          {expandedSongId === song.id && (
            <AnimationSettingsPanel
              settings={song.animationSettings || defaultAnimationSettings}
              onSettingsChange={(settings) => onSetAnimationSettings(song.id, settings)}
            />
          )}
        </div>
      ))}

        {songs.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">
              No songs yet. Upload or create one!
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left">
              <p className="text-xs text-blue-900 font-medium mb-2">Important Note:</p>
              <p className="text-xs text-blue-800">
                Your collection is automatically saved to browser storage and persists between sessions.
                Use "Export Collection" to download a backup JSON file to your computer.
                Due to browser security, the app cannot directly overwrite files - each export creates a new download.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons - Sticky at bottom */}
      <div className="border-t border-gray-200 pt-2 pb-1 bg-white mt-2">
        <div className="text-center mb-2">
          <span className="text-[10px] text-green-600 font-medium">Auto-saved</span>
        </div>
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={onNewSong}
            className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 text-xs"
          >
            New Song
          </button>
          <button
            onClick={onExportCollection}
            className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 text-xs"
            title="Download collection as JSON file"
          >
            Export Collection
          </button>
          <button
            onClick={onImportCollection}
            className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 text-xs"
            title="Import collection from JSON file"
          >
            Import Collection
          </button>
          <button
            onClick={onNewSession}
            className="px-2 py-1 bg-gray-700 text-white rounded hover:bg-gray-800 text-xs"
            title="Clear all songs"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
