const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const credentials = require("./middleware/credentials");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const verifyJWT = require("./middleware/verifyJWT");
const http = require("http");
const { Server } = require("socket.io");
const allowedOrigins = require("./config/allowedOrigins");
require("dotenv").config();

const app = express();

app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
  })
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(`Connection failed: ${e.message}`));

app.use("/API/auth", authRouter);
app.use(verifyJWT);
//protected routes
app.use("/API", userRouter);
app.all("*", (req, res) => {
  res.status(404).json({ msg: "Handled by .all" });
});

const PORT = process.env.PORT;
const server = http.Server(app);
server.listen(PORT, () => console.log(`Server's running on port ${PORT}`));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173/",
    credentials: true,
  },
});

const onlineUsers = new Map();
io.on("connection", (socket) => {
  socket.on("connected", ({ userID }) => {
    onlineUsers.set(userID, socket.id);
  });
  socket.on("send_msg", ({ from, to, msg }) => {
    const to_socket = onlineUsers.get(to);
    if (to_socket) {
      socket.to(to_socket).emit("receive_msg", { userID: from, msg });
    }
  });
  socket.on("disconnect", ({ userID }) => {
    onlineUsers.delete(userID);
  });
});
