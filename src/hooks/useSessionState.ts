import { useState, useEffect } from 'react';
import { Session } from '../types/song';
import { loadSession, saveSession } from '../utils/sessionStorage';

export function useSessionState(): [Session, (session: Session) => void] {
  const [session, setSession] = useState<Session>({
    songs: [],
    currentSongId: null,
    currentPartIndex: 0,
  });

  // Load session from localStorage on mount
  useEffect(() => {
    const savedSession = loadSession();
    if (savedSession) {
      setSession(savedSession);
    }
  }, []);

  // Save session to localStorage whenever it changes
  useEffect(() => {
    saveSession(session);
  }, [session]);

  return [session, setSession];
}
