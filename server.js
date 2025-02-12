// server.js
const http = require('http');
const socketIo = require('socket.io');

// HTTP サーバを作成（ポート3000など任意のポート）
const server = http.createServer();
const io = socketIo(server, {
  cors: { origin: "*" }  // デモ用。実際はアクセス元を制限してください。
});

// サーバ起動時の時刻を基準とする
const globalStartTime = Date.now();

io.on("connection", (socket) => {
  console.log("クライアント接続:", socket.id);
  // 接続時に開始時刻を送信
  socket.emit("startTime", globalStartTime);
});

server.listen(3000, () => {
  console.log("Socket.IO サーバがポート3000で起動");
});