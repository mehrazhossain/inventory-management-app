const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this product.'],
      trim: true,
      unique: [true, 'Name must be unique'],
      minLength: [3, 'Name must be at least 3 characters.'],
      maxLength: [100, 'Name is too large'],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative value."],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ['kg', 'litre', 'ml', 'gm', 'pcs'],
        message: "Unit value can't be {VALUE}, must be kg/litre/ml/gm/pcs",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "Quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: 'Quantity must be an integer',
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['in-stock', 'out-of-stock', 'discontinued'],
        message:
          "Status can't be {VALUE}, it should be in-stock/out-of-stock/discontinued",
      },
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Supplier',
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
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

productSchema.post('save', function (doc, next) {
  console.log('After saving data');

  next();
});

// Model
const Product = mongoose.model('Product', productSchema);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Route is working! YaY!');
});

// posting to database
app.post('/api/v1/product', async (req, res, next) => {
  try {
    // save or create

    // there is 2 way to insert data 1. save (require instance which is given below) and 2. create (does not require extra instance)
    const product = new Product(req.body);

    const result = await product.save();

    res.status(200).json({
      status: 'success',
      message: 'Product inserted successfully!',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Product is not inserted',
      error: error.message,
    });
  }
});

module.exports = app;
