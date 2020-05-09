const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const i18n = require('i18n');
const cors = require('cors');
const { ApolloServer, AuthenticationError } = require('apollo-server');
const multer = require('multer');
const { uuid } = require('uuidv4');
const { currentUser } = require('./graphql/resolvers/queries/user-queries');

i18n.configure({
  locales: ['tr', 'en'],
  fallbacks: { tr: 'tr' },
  defaultLocale: 'tr',
  directory: __dirname + '/translation',
  prefix: 'translation-',
  queryParameter: 'lang',
  api: {
    __: 't'
  },
  objectNotation: true
});


const app = express();
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};

// cors
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(i18n.init);


// graphql settings 
const graphqlPath = '/graphql';
const typeDefs = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');
const graphqlServer = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async ({ req }) => {
    console.log(req.headers);
    const token = req.headers.authorization || '';
    const user = await currentUser(token);
    console.log("tokenuser", user)
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
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to database.');
    app.listen(process.env.REST_API_PORT);
  })
  .catch(err => {
    console.log(err);
  });

// file upload endpoints with multer
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './uploads');
  },

  filename: function(req, file, callback) {
    callback(null, file.originalname + "_" + uuid());
  }
});

const upload = multer({ storage });

app.get('/', (req, res) => {
  res.status(200).send("You can post to /api/upload");
});

app.get('/test', (req, res) => {
  res.status(200).send("Testing!");
});

app.post('/test-post', (req, res) => {
  res.status(200).send("Testing post");
})

app.post('/api/upload/pet-profile', upload.single('photo'), (req, res, next) => {
  console.log('file', req.file);
  console.log('body', req.body);

  res.status(200).json({
    file: req.file,
    success: true
  });
});
