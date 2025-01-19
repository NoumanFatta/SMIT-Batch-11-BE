const http = require("http");
const socketIo = require("socket.io");
const express = require("express");
const app = express();
const nodemailer = require("nodemailer");
// Create an HTTP server
const server = http.createServer();

let connectedClients = [];

const io = socketIo(server, {
  cors: {
    origin: "http://127.0.0.1:5501",
  },
});

io.use((socket, next) => {
  const token = socket.handshake.headers.authorization;
  if (token) {
    next();
  } else {
    next(new Error("Socket authentication error"));
  }
});

app.post("/", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "",
        pass: "",
      },
    });
    const info = await transporter.sendMail({
      from: "", // sender address
      to: ["", ""], // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world test?", // plain text body
      html: `<h1 style = "color:red">Hello world tes?</h1>`, // html body
    });
    res.send("hello");
  } catch (error) {
    res.send("hello");

    console.log(error, ">>>>");
  }
});

// Handle client connection
io.on("connection", (socket) => {
  connectedClients.push(socket.id);
  console.log("Client connected:", socket.id, connectedClients);

  socket.on("chat", async ({ message }) => {
    console.log("Received message:", message);
    io.emit("chat", { message });
  });

  // Handle client disconnect
  socket.on("disconnect", () => {
    connectedClients = connectedClients.filter((id) => id !== socket.id);
    console.log("Client disconnected:", socket.id, connectedClients);
  });
});

server.listen(3000, () => {
  console.log("Socket.IO server running on http://localhost:3000");
});

app.listen(4000, () => {
  console.log("https server listening at http://localhost:4000");
});
