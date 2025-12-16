import { useState } from 'react';
import { Song, Session, AnimationSettings } from '../../types/song';
import { parseSongMarkdown } from '../../utils/markdownParser';
import { exportAsJSON, importFromJSON } from '../../utils/exportSession';
import { useBroadcastSync } from '../../hooks/useBroadcastSync';
import Navigation from '../Shared/Navigation';
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

  const handleSetAnimationSettings = (songId: string, animationSettings: AnimationSettings) => {
    const updatedSongs = session.songs.map((s) =>
      s.id === songId ? { ...s, animationSettings } : s
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
    <div className="h-screen flex flex-col bg-luxury-50">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Song List */}
        <aside className="w-88 bg-white border-r border-luxury-200/50 p-6 flex flex-col">
          <SongList
            songs={session.songs}
            currentSongId={session.currentSongId}
            onSelectSong={handleSelectSong}
            onDeleteSong={handleDeleteSong}
            onEditSong={setEditingSong}
            onSetAnimationSettings={handleSetAnimationSettings}
            onFilesSelected={handleFilesSelected}
            onNewSong={() => setIsCreatingNew(true)}
            onImportCollection={handleImportJSON}
            onExportCollection={() => exportAsJSON(session.songs)}
            onNewSession={handleNewSession}
          />
        </aside>

        {/* Main Area - Part Controls */}
        <main className="flex-1 p-8 overflow-y-auto">
          <PartControls
            song={currentSong}
            songs={session.songs}
            currentPartIndex={session.currentPartIndex}
            onPartSelected={handlePartSelected}
            onSongSelected={handleSelectSong}
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
