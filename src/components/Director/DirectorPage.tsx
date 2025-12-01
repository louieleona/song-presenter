import { useState } from 'react';
import { Song, Session, GradientTheme } from '../../types/song';
import { parseSongMarkdown } from '../../utils/markdownParser';
import { exportAsJSON, importFromJSON } from '../../utils/exportSession';
import { useBroadcastSync } from '../../hooks/useBroadcastSync';
import Navigation from '../Shared/Navigation';
import UploadZone from './UploadZone';
import SongList from './SongList';
import SongEditor from './SongEditor';
import PartControls from './PartControls';

interface DirectorPageProps {
  session: Session;
  onSessionChange: (session: Session) => void;
}

export default function DirectorPage({ session, onSessionChange }: DirectorPageProps) {
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const { sendMessage } = useBroadcastSync(() => {
    // Director doesn't need to listen to messages
  });

  const updateSession = (newSession: Session) => {
    onSessionChange(newSession);
    sendMessage({ type: 'SESSION_UPDATED', session: newSession });
  };

  const handleFilesSelected = async (files: FileList) => {
    const newSongs: Song[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.name.endsWith('.json')) {
        // Handle JSON file (collection)
        try {
          const songs = await importFromJSON(file);
          newSongs.push(...songs);
        } catch (error) {
          alert(`Failed to import ${file.name}: ${error}`);
        }
      } else if (file.name.endsWith('.md') || file.name.endsWith('.markdown')) {
        // Handle markdown file (single song)
        const content = await file.text();
        const song = parseSongMarkdown(content, crypto.randomUUID());
        newSongs.push(song);
      }
    }

    const updatedSession = {
      ...session,
      songs: [...session.songs, ...newSongs],
    };
    updateSession(updatedSession);
  };

  const handleSelectSong = (songId: string) => {
    const updatedSession = {
      ...session,
      currentSongId: songId,
      currentPartIndex: 0,
    };
    updateSession(updatedSession);
    // updateSession already sends SESSION_UPDATED, so no need for additional messages
  };

  const handleDeleteSong = (songId: string) => {
    const updatedSongs = session.songs.filter((s) => s.id !== songId);
    const updatedSession = {
      ...session,
      songs: updatedSongs,
      currentSongId: session.currentSongId === songId ? null : session.currentSongId,
    };
    updateSession(updatedSession);
  };

  const handleSaveSong = (markdown: string, songId?: string) => {
    if (songId) {
      // Edit existing song
      const updatedSongs = session.songs.map((s) =>
        s.id === songId
          ? parseSongMarkdown(markdown, s.id)
          : s
      );
      updateSession({ ...session, songs: updatedSongs });
    } else {
      // Create new song
      const newSong = parseSongMarkdown(markdown, crypto.randomUUID());
      updateSession({
        ...session,
        songs: [...session.songs, newSong],
      });
    }
  };

  const handleSetTempo = (songId: string, tempo: 'slow' | 'fast') => {
    const updatedSongs = session.songs.map((s) =>
      s.id === songId ? { ...s, tempo } : s
    );
    updateSession({ ...session, songs: updatedSongs });
  };

  const handleSetGradient = (songId: string, gradient: GradientTheme) => {
    const updatedSongs = session.songs.map((s) =>
      s.id === songId ? { ...s, gradient } : s
    );
    updateSession({ ...session, songs: updatedSongs });
  };

  const handlePartSelected = (index: number) => {
    const updatedSession = {
      ...session,
      currentPartIndex: index,
    };
    updateSession(updatedSession);
    // updateSession already sends SESSION_UPDATED, so no need for additional messages
  };

  const handleNewSession = () => {
    if (confirm('This will clear all songs. Continue?')) {
      updateSession({ songs: [], currentSongId: null, currentPartIndex: 0 });
    }
  };

  const handleImportJSON = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          const songs = await importFromJSON(file);
          updateSession({ ...session, songs });
        } catch (error) {
          alert('Failed to import JSON file');
        }
      }
    };
    input.click();
  };

  const currentSong = session.songs.find((s) => s.id === session.currentSongId) || null;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Song Presenter - Director</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setIsCreatingNew(true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              + New Song
            </button>
            <button
              onClick={handleImportJSON}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Import Collection
            </button>
            <button
              onClick={() => exportAsJSON(session.songs)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Export Collection
            </button>
            <button
              onClick={handleNewSession}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              New Session
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Song List */}
        <aside className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <div className="mb-4">
            <UploadZone onFilesSelected={handleFilesSelected} />
          </div>
          <SongList
            songs={session.songs}
            currentSongId={session.currentSongId}
            onSelectSong={handleSelectSong}
            onDeleteSong={handleDeleteSong}
            onEditSong={setEditingSong}
            onSetTempo={handleSetTempo}
            onSetGradient={handleSetGradient}
          />
        </aside>

        {/* Main Area - Part Controls */}
        <main className="flex-1 p-6 overflow-y-auto">
          <PartControls
            song={currentSong}
            currentPartIndex={session.currentPartIndex}
            onPartSelected={handlePartSelected}
          />
        </main>
      </div>

      {/* Song Editor Modal */}
      {(editingSong || isCreatingNew) && (
        <SongEditor
          song={editingSong}
          onSave={handleSaveSong}
          onClose={() => {
            setEditingSong(null);
            setIsCreatingNew(false);
          }}
        />
      )}
    </div>
  );
}
