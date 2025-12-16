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
    <div className="fixed inset-0 bg-luxury-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-6 animate-scale-in">
      <div className="bg-white rounded-3xl p-8 w-full max-w-4xl max-h-[85vh] flex flex-col shadow-soft-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-title-1 text-luxury-900">
            {song ? 'Edit Song' : 'Create New Song'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl text-luxury-400 hover:text-luxury-600 hover:bg-luxury-100 flex items-center justify-center transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-auto mb-6">
          <textarea
            ref={textareaRef}
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-full min-h-[400px] p-4 border border-luxury-200 rounded-2xl font-mono text-callout text-luxury-800 focus:outline-none focus:ring-2 focus:ring-accent-blue/20 focus:border-accent-blue transition-all resize-none"
            placeholder="Enter song in markdown format..."
          />
        </div>

        <div className="mb-6 p-5 glass-subtle rounded-2xl border border-luxury-200/50">
          <div className="text-caption font-semibold text-luxury-800 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-accent-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Quick Insert (click to insert at cursor):
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={handleInsertVerse}
              className="px-3 py-2 bg-white border border-luxury-200 rounded-xl hover:bg-luxury-50 hover:border-accent-blue text-caption text-luxury-700 font-medium transition-all duration-200 text-left active:scale-95"
            >
              + Verse (auto)
            </button>
            <button
              type="button"
              onClick={() => insertAtCursor('\n\n## Chorus\n')}
              className="px-3 py-2 bg-white border border-luxury-200 rounded-xl hover:bg-luxury-50 hover:border-accent-blue text-caption text-luxury-700 font-medium transition-all duration-200 active:scale-95"
            >
              + Chorus
            </button>
            <button
              type="button"
              onClick={() => insertAtCursor('\n\n## Pre-Chorus\n')}
              className="px-3 py-2 bg-white border border-luxury-200 rounded-xl hover:bg-luxury-50 hover:border-accent-blue text-caption text-luxury-700 font-medium transition-all duration-200 active:scale-95"
            >
              + Pre-Chorus
            </button>
            <button
              type="button"
              onClick={() => insertAtCursor('\n\n## Bridge\n')}
              className="px-3 py-2 bg-white border border-luxury-200 rounded-xl hover:bg-luxury-50 hover:border-accent-blue text-caption text-luxury-700 font-medium transition-all duration-200 active:scale-95"
            >
              + Bridge
            </button>
          </div>
          <p className="text-caption text-luxury-500 mt-3 flex items-start gap-2">
            <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>Use <code className="bg-luxury-100 px-1.5 py-0.5 rounded text-caption font-mono">#</code> for song title. Click buttons to insert at cursor position.</span>
          </p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-luxury-100 text-luxury-700 rounded-xl hover:bg-luxury-200 text-callout font-medium transition-all duration-200 active:scale-95"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-accent-blue text-white rounded-xl hover:bg-accent-blue/90 shadow-soft text-callout font-medium transition-all duration-200 active:scale-95"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
