const http = require("http"); // Import HTTP module
const { Server } = require("socket.io"); // Import Socket.IO
const app = require("./app"); // Import the Express app
const cors = require('cors');


const PORT = process.env.PORT || 3000;

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Replace "*" with your frontend's URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  },
});

// WebSocket logic
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for incoming messages
  socket.on("message", (data) => {
    console.log("Message received:", data);

    // Broadcast the message to all connected clients
    io.emit("message", data);
  });

  // Handle user disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});