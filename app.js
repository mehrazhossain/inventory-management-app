const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(express.json());
app.use(cors());

// routes
const productRoute = require('./routes/product.route');
const brandRoute = require('./routes/brand.route');

app.get('/', (req, res) => {
  res.send('Route is working! YaY!');
});

// get/post to/from database
app.use('/api/v1/product', productRoute);
app.use('/api/v1/brand', brandRoute);

module.exports = app;
