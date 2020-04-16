const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const i18n = require('i18n');
const cors = require('cors');
const { ApolloServer } = require('apollo-server');

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
const graphqlServer = new ApolloServer({ typeDefs, resolvers });
graphqlServer.listen(8080).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// database connection
const DB_URL = `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to database.');
    app.listen(process.env.APP_PORT);
  })
  .catch(err => {
    console.log(err);
  });
