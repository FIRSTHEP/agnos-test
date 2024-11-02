import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

// Initialize express and http server
const app = express();
const server = http.createServer(app);

// Get environment variables with fallbacks
const PORT = process.env.PORT || 4000;
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || `http://localhost:${PORT}`;

// Initialize Socket.IO with CORS configuration
const io = new Server(server, {
  cors: {
    origin: SOCKET_URL,
    methods: ["GET"],
    credentials: true,
  },
});

// Middleware
app.use(express.json());

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Listen for 'submitPatientData' event and broadcast it
  socket.on('submitPatientData', (data) => {
    io.emit('patient_form_update', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Socket.IO server running on ${SOCKET_URL}`);
});
