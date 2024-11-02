"use client";

import { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const PORT = process.env.PORT || 4000;
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || `http://localhost:${PORT}`;

export const useSocket = (): Socket | null => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
    });

    setSocket(newSocket);
    console.log('Socket instance created:', newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected successfully');
    });

    newSocket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    newSocket.on('reconnect_attempt', (attempt) => {
      console.log(`Reconnecting attempt ${attempt}`);
    });

    return () => {
      newSocket.disconnect();
      console.log('Socket disconnected on cleanup');
    };
  }, []);

  return socket;
};
