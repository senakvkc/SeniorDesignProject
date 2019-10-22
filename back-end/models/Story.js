// /backend/data.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// this will be our data base's data structure
const StorySchema = new Schema(
  {
    photo: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },

    createdBy: {
      type: String
    },
    updatedBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

StorySchema.plugin(uniqueValidator);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Story', StorySchema);
