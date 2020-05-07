const bcrypt = require('bcryptjs');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const moment = require('moment');
const _ = require('lodash');
const i18n = require('i18n');
const shortId = require('shortid');
const uuidv1 = require('uuid/v1');
const xoauth2 = require('xoauth2');
const { ObjectId } = require('mongodb');
const { ApolloError, AuthenticationError } = require('apollo-server');

const { verifyToken } = require('../../../util/TokenUtil');
const { fetchUserData } = require('../common');
const Post = require('../../../models/Post');
const User = require('../../../models/User');

const userQueries = {
  currentUser: async (authorization) => {
    const bearerLength = 'Bearer '.length;

    if (authorization && authorization.length > bearerLength) {
      const token = authorization.slice(bearerLength);
      const { ok, result } = await new Promise((resolve) => verifyToken(resolve, token, process.env.SECRET_KEY));

      if (ok) {
        const user = await User.findOne({ _id: ObjectId(result.userId) });
        return user;
      }
      
      return null;
    }

    return null;
  },

  getUsers: async (args, req, context) => {
    // TODO: Yetki kontrolü
    console.log("context", context);

    try {
      const users = await User.find();
      return users.map((user) => {
        return fetchUserData(user);
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getUserById: async (args, req) => {
    // TODO: Yetki kontrolü

    const { userId } = args;

    try {
      const user = await User.findById(userId);
      return fetchUserData(user);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getUserByPhone: async (args, req) => {
    // TODO: Yetki kontrolü
    const { phone } = args;
    try {
      const user = await User.findOne({ phone });
      return fetchUserData(user);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getLast10Posts: async (args, req) => {
    // TODO: Yetki kontrolü

    try {
      // sorting newest to oldest
      const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
      return posts;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getPostById: async (args, req) => {
    // TODO: Yetki kontrolü

    const { postId } = args;

    try {
      const post = await Post.findById(postId);
      return post;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getPostsWithPage: async (args, req) => {
    // TODO: Yetki kontrolü

    const { offset, limit } = args;

    try {
      const posts = await Post.find().skip(offset).sort({ createdAt: -1 }).limit(limit);
      return posts;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getPostsByUser: async (args, req) => {
    // TODO: Yetki kontrolü

    const { userId } = args;

    try {
      const posts = await Post.find({ user: userId }).sort({ createdAt: -1 });
      return posts;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getPostsByUserWithPage: async (args, req) => {
    // TODO: Yetki kontrolü

    const { userId, offset, limit } = args;

    try {
      const posts = await Post.find({ user: userId }).skip(offset).sort({ createdAt: -1 }).limit(limit);
      return posts;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

module.exports = userQueries;
