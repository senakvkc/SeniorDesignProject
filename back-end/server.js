const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const i18n = require("i18n");
const cors = require("cors");
const { ApolloServer, AuthenticationError } = require("apollo-server");
const multer = require("multer");
const { uuid } = require("uuidv4");
const { currentUser } = require("./graphql/resolvers/queries/user-queries");
const http = require("http");
const _ = require('lodash');

const { SOCKET_EVENTS } = require("./constants");

i18n.configure({
  locales: ["tr", "en"],
  fallbacks: { tr: "tr" },
  defaultLocale: "tr",
  directory: __dirname + "/translation",
  prefix: "translation-",
  queryParameter: "lang",
  api: {
    __: "t",
  },
  objectNotation: true,
});

const app = express();

const convs = [];

function getOrCreateRoom(from, target) {
  const id = `${from._id}-${target._id}`;
  const revId = `${target._id}-${from._id}`;
  const room = _.find(convs, (c) => c.id === id || c.id === revId);

  if (!room) {
    const newRoom = { id, from, target };

    console.log("Room created. New room: ", newRoom);
    return newRoom;
  }

  console.log("Room is already exist.", room);
  return room;
}

const ioServer = http.createServer(app);
const io = require("socket.io")(ioServer);
io.on("connection", (socket) => {
  console.log("Socket connected.", socket.id);
  let fromUser = null;
  let targetUser = null;
  let room = null;
  let roomIds = [];

  socket.on(SOCKET_EVENTS.USER_CONNECTED, (data) => {
    targetUser = data.targetUser;
    fromUser = data.user;
    room = getOrCreateRoom(fromUser, targetUser);
    roomIds = [room.id, `${fromUser.id}-${targetUser.id}`];
    console.log(`User connected: ${fromUser.email}`);
    socket.join(roomIds);
  });

  socket.on(SOCKET_EVENTS.SEND_MESSAGE, (message, cb) => {
    console.log("message sent!", message);
    socket.to(roomIds).emit(SOCKET_EVENTS.SEND_MESSAGE, message);
    cb();
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected with socket id ${socket.id}`);
  });
});

ioServer.listen(process.env.SOCKET_PORT || 8000, () =>
  console.log(
    "Socket server running on port:" + process.env.SOCKET_PORT || 8000
  )
);

/* 
io.on("connection", (socket) => {
  console.log("Socket connection is started.", socket);
  socket.on(SOCKET_EVENTS.USER_CONNECTED, (fromUser, targetUser, callback) => {
    console.log("User connected to chat via socket.io.", fromUser, targetUser);
    const room = getRoomOfUsersOrCreate(fromUser, targetUser);
    console.log("Room created for users.", rooms, room);

    socket.join(room.roomId);
    console.log("Joined to room.");
    callback();
  });

  socket.on(SOCKET_EVENTS.SEND_MESSAGE, ({ roomId, from, message }, cb) => {
    const room = getRoomWithId(roomId);
    const { target } = room;
    const trimmedMessage = message.trim();
    if(isUserVerified(roomId, from)) {
      // send message to user.
      io.emit(SOCKET_EVENTS.SEND_MESSAGE, { from, message: trimmedMessage });
      // save it to database.
    } else {
      throw new Error("You cannot send message to this room.");
    }
  })

  socket.on("disconnect", (roomId) => {
    console.log("Socket disconnected!");
    removeRoom(roomId);
  });
});
 */

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

// cors
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(i18n.init);

// graphql settings
const typeDefs = require("./graphql/schema/index");
const resolvers = require("./graphql/resolvers/index");
const graphqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    console.log(req.headers);
    const token = req.headers.authorization || "";
    const user = await currentUser(token);
    console.log("tokenuser", user);
    return { user };
  },
});

graphqlServer.listen(8080).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// database connection
const DB_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database.");
    app.listen(process.env.REST_API_PORT);
  })
  .catch((err) => {
    console.log(err);
  });

// file upload endpoints with multer
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },

  filename: function (req, file, callback) {
    callback(null, file.originalname + "_" + uuid());
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.status(200).send("You can post to /api/upload");
});

app.get("/test", (req, res) => {
  res.status(200).send("Testing!");
});

app.post("/test-post", (req, res) => {
  res.status(200).send("Testing post");
});

app.post(
  "/api/upload/pet-profile",
  upload.single("photo"),
  (req, res, next) => {
    console.log("file", req.file);
    console.log("body", req.body);

    res.status(200).json({
      file: req.file,
      success: true,
    });
  }
);
