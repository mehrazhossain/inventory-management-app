const mongoose = require('mongoose');
const valid = require('validator');
const { ObjectId } = mongoose.Schema.Types;

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this product.'],
      trim: true,
      unique: [true, 'Name must be unique'],
      lowercase: true,
      minLength: [3, 'Name must be at least 3 characters.'],
      maxLength: [100, 'Name is too large'],
    },
    description: {
      type: String,
      required: true,
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ['kg', 'litre', 'ml', 'gm', 'pcs', 'bag'],
        message: "Unit value can't be {VALUE}, must be kg/litre/ml/gm/pcs/bag",
      },
    },

    imageURLs: [
      {
        type: String,
        required: true,
        validate: [valid.isURL, 'wrong url'],
      },
    ],

    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: 'Brand',
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data: pre / post
productSchema.pre('save', function (next) {
  if (this.quantity == 0) {
    this.status = 'out-of-stock';
  }
  next();
});

// productSchema.post('save', function (doc, next) {
//   console.log('After saving data');
//   next();
// });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
