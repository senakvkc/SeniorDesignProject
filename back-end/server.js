const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const multer = require('multer');
const shortid = require('shortid');
const i18n = require('i18n');

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

const fileFilter = function(req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const getUploadDirection = url => {
  const splittedUrl = url.split('-');
  return splittedUrl[1];
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(
      null,
      `../front-end/public/images/${getUploadDirection(req.originalUrl)}/`
    );
  },
  filename: function(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}-${shortid.generate()}.${getFileExtension(
        file.originalname
      )}`
    );
  }
});

const getFileExtension = filename => {
  const splittedFilename = filename.split('.');
  const extension = splittedFilename[splittedFilename.length - 1];
  if (
    extension !== null &&
    (extension === 'jpg' || extension === 'png' || extension === 'jpeg')
  ) {
    return extension;
  }

  throw new Error({
    text: 'Unsupported file type.',
    code: 1
  });
};

const upload = multer({
  storage,
  fileFilter
});

const cors = require('cors');
const logger = require('morgan');

const gqlSchema = require('./graphql/schema/index');
const gqlResolvers = require('./graphql/resolvers/index');

const app = express();
const router = express.Router();

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));

app.post('/upload-profile', upload.single('profilePhoto'), function(
  req,
  res,
  next
) {
  const { file } = req;
  if (!file) {
    const error = new Error({
      text: 'Bir hata oluştu',
      code: 1
    });
    error.httpStatusCode = 400;
    return next(error);
  }

  res.send(file);
});

app.use(
  '/graphql',
  graphqlHttp({
    schema: gqlSchema,
    rootValue: gqlResolvers,
    graphiql: true
  })
);

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
