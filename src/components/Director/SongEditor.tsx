import { useState, useEffect, useRef } from 'react';
import { Song } from '../../types/song';

interface SongEditorProps {
  song: Song | null;
  onSave: (markdown: string, songId?: string) => void;
  onClose: () => void;
}

export default function SongEditor({ song, onSave, onClose }: SongEditorProps) {
  const [markdown, setMarkdown] = useState(
    song?.rawMarkdown || '# New Song\n\n## Verse 1\nLyrics here...\n\n## Chorus\nLyrics here...\n'
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (song) {
      setMarkdown(song.rawMarkdown);
    } else {
      setMarkdown('# New Song\n\n## Verse 1\nLyrics here...\n\n## Chorus\nLyrics here...\n');
    }
  }, [song]);

  const handleSave = () => {
    onSave(markdown, song?.id);
    onClose();
  };

  const getNextVerseNumber = (): number => {
    const verseMatches = markdown.match(/## Verse (\d+)/g);
    if (!verseMatches || verseMatches.length === 0) {
      return 1;
    }

    const numbers = verseMatches.map(match => {
      const num = match.match(/\d+/);
      return num ? parseInt(num[0], 10) : 0;
    });

    return Math.max(...numbers) + 1;
  };

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newMarkdown = markdown.substring(0, start) + text + markdown.substring(end);

    setMarkdown(newMarkdown);

    // Set cursor position after inserted text
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + text.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleInsertVerse = () => {
    const verseNum = getNextVerseNumber();
    insertAtCursor(`\n\n## Verse ${verseNum}\n`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[80vh] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {song ? 'Edit Song' : 'Create New Song'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-auto mb-4">
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-full min-h-[400px] p-3 border border-gray-300 rounded font-mono text-sm"
            placeholder="Enter song in markdown format..."
          />
        </div>

        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm font-semibold text-blue-900 mb-2">
            📝 Reserved Words (click to insert at cursor):
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={handleInsertVerse}
              className="px-2 py-1 bg-white border border-blue-300 rounded hover:bg-blue-100 text-left"
            >
              + Verse (auto-numbered)
            </button>
            <button
              type="button"
              onClick={() => insertAtCursor('\n\n## Chorus\n')}
              className="px-2 py-1 bg-white border border-blue-300 rounded hover:bg-blue-100"
            >
              + Chorus
            </button>
            <button
              type="button"
              onClick={() => insertAtCursor('\n\n## Pre-Chorus\n')}
              className="px-2 py-1 bg-white border border-blue-300 rounded hover:bg-blue-100"
            >
              + Pre-Chorus
            </button>
            <button
              type="button"
              onClick={() => insertAtCursor('\n\n## Bridge\n')}
              className="px-2 py-1 bg-white border border-blue-300 rounded hover:bg-blue-100"
            >
              + Bridge
            </button>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            💡 Tip: Use <code className="bg-white px-1 rounded">#</code> for song title. Click buttons to insert at cursor position.
          </p>
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
