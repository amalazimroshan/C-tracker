const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("room code", (room) => {
    // console.log(room);
    socket.join(room);
    socket.broadcast.to(room).emit("message", ` a user joined on room ${room}`);
  });
  socket.on("coordinates", (data) => {
    // console.log(data);
    socket.broadcast.to(data.code).emit("lolipop", data.coords);
    //console.log(data);
  });
});
server.listen(port, () => {
  console.log(`sever listening at port: http://localhost:${port}`);
});
