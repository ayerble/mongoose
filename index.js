const express = require('express');
const path = require('path');
const port = 3001;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connection open.'))
  .catch(err => console.log(`Mongo connection error.\n${err}`))

const Product = require('./models/product')

const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
})
