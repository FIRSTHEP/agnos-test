import { io } from 'socket.io-client';

const PORT = process.env.PORT || 4000;
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || `http://localhost:${PORT}`;

export const socket = io(SOCKET_URL);
