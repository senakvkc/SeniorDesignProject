// /backend/data.js
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// this will be our data base's data structure
const DonationSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: {
      type: Number,
      required: true
    },
    logs: [
      {
        logType: {
          type: String,
          enum: LOG_TYPES
        },
        amount: {
          type: Number,
          required: true
        },
        target: {
          type: String
        }
      }
    ],
    usedAmount: {
      type: Number,
      default: 0
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

DonationSchema.plugin(uniqueValidator);

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model('Donation', DonationSchema);
