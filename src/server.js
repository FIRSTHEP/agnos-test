import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();
const server = http.createServer(app);

const SOCKET_URL = process.env.SOCKET_URL;

const io = new Server(server, {
  cors: {
    origin: SOCKET_URL,
    methods: ["GET"],
    credentials: true
  }
});

app.use(express.json());

io.on('connection', (socket) => {
  socket.on('submitPatientData', (data) => io.emit('patient_form_update', data));
  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

server.listen(PORT, () => console.log(`Socket.IO server running on ${SOCKET_URL}`));