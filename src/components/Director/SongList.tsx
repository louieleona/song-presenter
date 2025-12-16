import { useState } from 'react';
import { Song, AnimationSettings } from '../../types/song';
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
      <div className="flex-1 overflow-y-auto space-y-3">
        {songs.length === 0 && (
          <div className="mb-4">
            <UploadZone onFilesSelected={onFilesSelected} />
          </div>
        )}
        {songs.map((song) => (
        <div
          key={song.id}
          className={`p-4 rounded-2xl border transition-all duration-200 ${
            currentSongId === song.id
              ? 'border-accent-blue/30 bg-accent-blue/5 shadow-soft'
              : 'border-luxury-200 bg-white hover:border-luxury-300 hover:shadow-soft'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-title-3 text-luxury-900">{song.title}</h3>
            <button
              onClick={() => onDeleteSong(song.id)}
              className="w-6 h-6 rounded-lg text-luxury-400 hover:text-luxury-600 hover:bg-luxury-100 flex items-center justify-center transition-colors"
              title="Delete song"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex gap-2 items-center flex-wrap">
            <button
              onClick={() => onSelectSong(song.id)}
              className={`px-4 py-2 text-caption font-medium rounded-xl transition-all duration-200 ${
                currentSongId === song.id
                  ? 'bg-accent-blue text-white shadow-soft'
                  : 'bg-luxury-100 text-luxury-700 hover:bg-luxury-200 active:scale-95'
              }`}
            >
              {currentSongId === song.id ? 'Live' : 'Set Live'}
            </button>

            <button
              onClick={() => onEditSong(song)}
              className="px-4 py-2 text-caption font-medium bg-luxury-100 text-luxury-700 rounded-xl hover:bg-luxury-200 active:scale-95 transition-all duration-200"
            >
              Edit
            </button>

            <button
              onClick={() => exportAsMarkdown(song)}
              className="px-4 py-2 text-caption font-medium bg-luxury-100 text-luxury-700 rounded-xl hover:bg-luxury-200 active:scale-95 transition-all duration-200"
              title="Export song as MD"
            >
              Export MD
            </button>
          </div>

          {/* Animation Settings Toggle */}
          <div className="mt-3">
            <button
              onClick={() => setExpandedSongId(expandedSongId === song.id ? null : song.id)}
              className="text-caption text-luxury-600 hover:text-luxury-800 flex items-center gap-2 transition-colors"
            >
              <svg className={`w-3 h-3 transition-transform ${expandedSongId === song.id ? 'rotate-90' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              Animation Settings
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
            <p className="text-body text-luxury-500 mb-4">
              No songs yet. Upload or create one!
            </p>
            <div className="glass-subtle rounded-2xl p-4 text-left border border-luxury-200/50">
              <p className="text-caption text-luxury-800 font-semibold mb-2">Important Note:</p>
              <p className="text-caption text-luxury-600 leading-relaxed">
                Your collection is automatically saved to browser storage and persists between sessions.
                Use "Export Collection" to download a backup JSON file to your computer.
                Due to browser security, the app cannot directly overwrite files - each export creates a new download.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons - Sticky at bottom */}
      <div className="border-t border-luxury-200/50 pt-4 mt-4">
        <div className="text-center mb-3">
          <span className="text-caption text-accent-green font-medium">Auto-saved</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onNewSong}
            className="px-3 py-2 bg-luxury-800 text-white rounded-xl hover:bg-luxury-900 text-caption font-medium transition-all duration-200 active:scale-95"
          >
            New Song
          </button>
          <button
            onClick={onExportCollection}
            className="px-3 py-2 bg-luxury-800 text-white rounded-xl hover:bg-luxury-900 text-caption font-medium transition-all duration-200 active:scale-95"
            title="Download collection as JSON file"
          >
            Export Collection
          </button>
          <button
            onClick={onImportCollection}
            className="px-3 py-2 bg-luxury-800 text-white rounded-xl hover:bg-luxury-900 text-caption font-medium transition-all duration-200 active:scale-95"
            title="Import collection from JSON file"
          >
            Import Collection
          </button>
          <button
            onClick={onNewSession}
            className="px-3 py-2 bg-luxury-800 text-white rounded-xl hover:bg-luxury-900 text-caption font-medium transition-all duration-200 active:scale-95"
            title="Clear all songs"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
