import { Song, SongPart, PartType } from '../types/song';

export function parseSongMarkdown(markdown: string, id: string): Song {
  const lines = markdown.split('\n');
  let title = 'Untitled Song';
  const parts: SongPart[] = [];
  let currentPart: { type: PartType; number?: number; lines: string[] } | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check for H1 (song title)
    if (line.startsWith('# ') && title === 'Untitled Song') {
      title = line.substring(2).trim();
      continue;
    }

    // Check for H2 (song parts)
    if (line.startsWith('## ')) {
      // Save previous part if exists
      if (currentPart && currentPart.lines.length > 0) {
        parts.push({
          type: currentPart.type,
          number: currentPart.number,
          lyrics: currentPart.lines.join('\n').trim(),
        });
      }

      // Parse new part
      const partTitle = line.substring(3).trim();
      const parsed = parsePartTitle(partTitle);

      if (parsed) {
        currentPart = {
          type: parsed.type,
          number: parsed.number,
          lines: [],
        };
      }
      continue;
    }

    // Add line to current part
    if (currentPart) {
      currentPart.lines.push(line);
    }
  }

  // Don't forget the last part
  if (currentPart && currentPart.lines.length > 0) {
    parts.push({
      type: currentPart.type,
      number: currentPart.number,
      lyrics: currentPart.lines.join('\n').trim(),
    });
  }

  return {
    id,
    title,
    tempo: 'slow', // Default tempo
    gradient: 'blue', // Default gradient
    parts,
    rawMarkdown: markdown,
  };
}

function parsePartTitle(title: string): { type: PartType; number?: number } | null {
  // Match "Verse 1", "Verse 2", etc.
  const verseMatch = title.match(/^Verse\s+(\d+)$/i);
  if (verseMatch) {
    return {
      type: 'Verse',
      number: parseInt(verseMatch[1], 10),
    };
  }

  // Match exact keywords
  const lowerTitle = title.toLowerCase();

  if (lowerTitle === 'chorus') {
    return { type: 'Chorus' };
  }

  if (lowerTitle === 'pre-chorus') {
    return { type: 'Pre-Chorus' };
  }

  if (lowerTitle === 'bridge') {
    return { type: 'Bridge' };
  }

  return null;
}

export function getPartLabel(part: SongPart): string {
  if (part.type === 'Verse' && part.number) {
    return `Verse ${part.number}`;
  }
  return part.type;
}
