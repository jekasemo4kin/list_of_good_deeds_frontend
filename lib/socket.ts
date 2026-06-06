import { io } from 'socket.io-client';

export const socket = io(process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3002', {
  withCredentials: true,
  transports: ['websocket'],
  autoConnect: false, 
});