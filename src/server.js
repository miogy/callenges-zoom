import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

// const handleListen = () => console.log(`Listening on http://localhost:3000`);
// app.listen(3000, handleListen);

// 동일한 포트에서 http, ws request 두가지 처리 가능
const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", (socket) => {
  // console.log(socket);
  sockets.push(socket);
  console.log("connected to browser 🫠");
  socket.on("close", () => console.log("Dissconnected from server 😈"));
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message));
    console.log(message);
    // socket.send(message);
  });
  socket.send("helloooooo!!"); //메세지 보내기
});

server.listen(3000, handleListen);
