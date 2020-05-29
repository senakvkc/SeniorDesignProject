const bcrypt = require('bcryptjs');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const moment = require('moment');
const _ = require('lodash');
const i18n = require('i18n');
const shortId = require('shortid');
const uuidv1 = require('uuid/v1');
const { ObjectId } = require('mongodb');
const { ApolloError, AuthenticationError } = require('apollo-server');

const { verifyToken } = require('../../../util/TokenUtil');
const { fetchUserData } = require('../common');
const User = require('../../../models/User');
const Animal = require('../../../models/Animal');

const animalQueries = {
  getAnimalWithId: async (req, args, context) => {
    console.log("ctx:", context);
    const { animalId } = args;

    try {
        const animal = await Animal.findById(animalId);
        console.log(animal);
        return animal._doc;
    } catch (err) {
        console.error(err);
        throw err;
    };
  },
  getAnimalsWithPage: async (req, args, context) => {
    // TODO: Yetki kontrolü

    const { offset, limit } = args;
    
    try {
      const animals = await Animal.find().skip(offset).sort({ createdAt: -1 }).limit(limit);
      console.log(animals.length);
      return animals;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

module.exports = animalQueries;
