const express = require('express');
const path = require('path');

const portNum = parseInt(process.argv.slice(2))
const port = portNum ? portNum : 3000

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo connection open.'))
  .catch(err => console.log(`Mongo connection error.\n${err}`))

const Product = require('./models/product')

const methodOverride = require('method-override')

const app = express();
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.get('/', (req, res) => {
  res.send('<a href="/products">Go to products</a>');
})

app.get('/products', async (req, res) => {
  const products = await Product.find({})
  res.render('products/index.ejs', { products })
})

app.get('/products/new', (req, res) => {
  res.render('products/new.ejs')
})
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body) // i need to go back to this
  await newProduct.save();
  res.redirect(`/products/${newProduct.id}`)
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id)

  res.render('products/show.ejs', { product })
})

app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/edit', { product })
})

app.put('/products/:id', async (req, res) => {

  console.log(req.body)
  res.send('PUT!')
})

app.get('*', (req, res) => {
  res.send('Hello World!');
})

app.listen(port, () => {
  console.log(`App is listening on port ${port}.`);
})
