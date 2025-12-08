export type PartType = 'Verse' | 'Chorus' | 'Pre-Chorus' | 'Bridge';

export interface SongPart {
  type: PartType;
  number?: number;  // For "Verse 1", "Verse 2", etc.
  lyrics: string;
}

export type GradientTheme = 'blue' | 'purple' | 'green' | 'orange' | 'pink' | 'cyan';

export type AnimationEffect = 'particles';

export interface AnimationSettings {
  effect: AnimationEffect;
  particleCount: number;
  particleSize: number;
  speed: number;
  particleColor: string;
  particleBlur: number;
  backgroundColor: GradientTheme;
}

export interface Song {
  id: string;
  title: string;
  tempo: 'slow' | 'fast';
  gradient?: GradientTheme;
  animationSettings?: AnimationSettings;
  parts: SongPart[];
  rawMarkdown: string;
}

export interface Session {
  songs: Song[];
  currentSongId: string | null;
  currentPartIndex: number;
}

export type SyncMessage =
  | { type: 'SONG_CHANGED'; songId: string }
  | { type: 'PART_CHANGED'; partIndex: number }
  | { type: 'SESSION_UPDATED'; session: Session };

export interface ExportData {
  version: string;
  exportDate: string;
  songs: Song[];
}
