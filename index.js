const express = require('express');
const path = require('path');
const port = 3001;

const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connection open.'))
  .catch(err => console.log(err))






app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
})
