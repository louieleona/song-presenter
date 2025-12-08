import { useCallback } from 'react';
import { Session } from '../../types/song';
import { useBroadcastSync } from '../../hooks/useBroadcastSync';
import AnimatedBackground from './AnimatedBackground';
import LyricsDisplay from './LyricsDisplay';

interface LivePageProps {
  session: Session;
  onSessionChange: (session: Session) => void;
}

export default function LivePage({ session, onSessionChange }: LivePageProps) {
  const handleMessage = useCallback(
    (message: any) => {
      if (message.type === 'SESSION_UPDATED') {
        onSessionChange(message.session);
      } else if (message.type === 'SONG_CHANGED') {
        onSessionChange({
          ...session,
          currentSongId: message.songId,
          currentPartIndex: 0,
        });
      } else if (message.type === 'PART_CHANGED') {
        onSessionChange({
          ...session,
          currentPartIndex: message.partIndex,
        });
      }
    },
    [session, onSessionChange]
  );

  useBroadcastSync(handleMessage);

  const currentSong = session.songs.find((s) => s.id === session.currentSongId);
  const currentPart = currentSong?.parts[session.currentPartIndex] || null;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background layer */}
      <AnimatedBackground
        key={session.currentSongId || 'no-song'}
        tempo={currentSong?.tempo || 'slow'}
        gradient={currentSong?.gradient}
        animationSettings={currentSong?.animationSettings}
      />

      {/* Content layer */}
      <div className="relative z-10">
        <LyricsDisplay
          key={`${session.currentSongId}-${session.currentPartIndex}`}
          part={currentPart}
          songTitle={currentSong?.title || ''}
        />
      </div>
    </div>
  );
}
