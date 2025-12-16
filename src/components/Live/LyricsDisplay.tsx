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

  // Calculate dynamic font size based on content length
  const getResponsiveFontSize = () => {
    const length = part.lyrics.length;
    const lines = part.lyrics.split('\n').length;

    // Base sizes for different breakpoints
    if (length < 50) {
      // Very short text - larger
      return 'text-5xl md:text-6xl lg:text-7xl';
    } else if (length < 100) {
      // Short text
      return 'text-4xl md:text-5xl lg:text-6xl';
    } else if (length < 200) {
      // Medium text
      return 'text-3xl md:text-4xl lg:text-5xl';
    } else if (length < 300) {
      // Long text
      return 'text-2xl md:text-3xl lg:text-4xl';
    } else {
      // Very long text - smaller
      return 'text-xl md:text-2xl lg:text-3xl';
    }
  };

  // Calculate line height based on number of lines
  const getLineHeight = () => {
    const lines = part.lyrics.split('\n').length;
    if (lines <= 2) return '1.4';
    if (lines <= 4) return '1.5';
    return '1.6';
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen p-16">
      {/* Song Title (top) */}
      <div className="text-white/60 text-title-3 font-medium">
        {songTitle}
      </div>

      {/* Lyrics (center) */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="max-w-5xl w-full text-center animate-fade-in px-8">
          <div
            className={`text-white ${getResponsiveFontSize()} font-semibold whitespace-pre-wrap drop-shadow-lg transition-all duration-300`}
            style={{ lineHeight: getLineHeight() }}
          >
            {part.lyrics}
          </div>
        </div>
      </div>

      {/* Part Label (bottom) */}
      <div className="text-white/70 text-title-2 font-medium tracking-wide">
        {getPartLabel(part)}
      </div>
    </div>
  );
}
