const mongoose = require('mongoose');
const validator = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Please provide a brand name'],
      lowercase: true,
      enum: {
        values: [
          'dhaka',
          'chattogram',
          'rajshahi',
          'sylhet',
          'khulna',
          'barishal',
          'rangpur',
          'mymensingh',
        ],
        message: '{VALUE} is not a valid name',
      },
      id: {
        type: ObjectId,
        required: true,
        ref: 'Store',
      },
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: 'User',
      },
    },
    description: String,

    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

const Store = mongoose.model('Store', storeSchema);
module.exports = Store;
