// /backend/data.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// this will be our data base's data structure
const ClinicSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      enum: CITIES,
      required: true
    },
    country: {
      type: String,
      enum: COUNTRY,
      default: 'TÜRKİYE',
      required: true
    },
    owner: {
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

ClinicSchema.plugin(uniqueValidator);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Clinic', ClinicSchema);
