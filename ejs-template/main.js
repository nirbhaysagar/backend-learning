const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('home', { title: 'EJS Template', message: 'Hello from EJS!' });
});

const products = [
  { name: 'Laptop', price: 32000, id: 1 },
  { name: 'Mobile', price: 22000, id: 2 },
];

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Us', info: 'This is the about page.' });
});


const port = 8000;
app.listen(port, () => {
  console.log('server is running on port', port);
});