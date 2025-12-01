import { SongPart } from '../../types/song';
import { getPartLabel } from '../../utils/markdownParser';

interface LyricsDisplayProps {
  part: SongPart | null;
  songTitle: string;
}

export default function LyricsDisplay({ part, songTitle }: LyricsDisplayProps) {
  if (!part) {
    return null;
  }

  return (
    <div className="flex items-center justify-center h-screen px-8">
      <div className="max-w-4xl w-full text-center animate-fade-in">
        {/* Part Label */}
        <div className="text-white opacity-60 text-xl mb-6">
          {getPartLabel(part)}
        </div>

        {/* Lyrics */}
        <div className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-relaxed whitespace-pre-wrap">
          {part.lyrics}
        </div>

        {/* Song Title (subtle) */}
        <div className="text-white opacity-40 text-sm mt-8">
          {songTitle}
        </div>
      </div>
    </div>
  );
}
