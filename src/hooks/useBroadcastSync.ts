import { useEffect, useRef } from 'react';
import { SyncMessage } from '../types/song';

const CHANNEL_NAME = 'song-presenter-sync';

export function useBroadcastSync(onMessage: (message: SyncMessage) => void) {
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    // Create BroadcastChannel
    channelRef.current = new BroadcastChannel(CHANNEL_NAME);

    // Listen for messages
    channelRef.current.onmessage = (event) => {
      onMessage(event.data as SyncMessage);
    };

    // Cleanup on unmount
    return () => {
      channelRef.current?.close();
    };
  }, [onMessage]);

  // Function to send messages
  const sendMessage = (message: SyncMessage) => {
    channelRef.current?.postMessage(message);
  };

  return { sendMessage };
}
