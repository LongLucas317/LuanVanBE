const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const { default: mongoose } = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cronService = require("./services/cronService"); // Khởi động cron job
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const port = process.env.PORT || 3001;

const server = http.createServer(app);
// Khởi tạo Socket.IO
const io = socketIo(server, {
  cors: {
    origin: "*", // Cho phép mọi domain kết nối, tùy chỉnh cho phù hợp
  },
});

app.get("/", (req, res) => {
  return res.send("Hello");
});

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(cookieParser());

routes(app);

// Lắng nghe kết nối WebSocket
io.on("connection", (socket) => {
  console.log("A user connected");

  // Lắng nghe ngắt kết nối
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Lưu đối tượng io vào app.locals để sử dụng trong controller
app.locals.io = io;

mongoose
  .connect(`${process.env.MONGO_DB}`)
  .then(() => {
    console.log("Connect DB Sucess");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(port, () => {
  console.log("Server is running in port: " + port);
});
