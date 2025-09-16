const express = require('express');

const app = express();

const firstmiddle = app.get('/', (req, res, next) => {
  console.log('First middleware');
  next(); // Pass control to the next middleware
});

app.use(firstmiddle);

app.get('/', (req, res) => {
  res.send('Hello World! twice');
});     

const port = 3000;  
app.listen(port, ()=>{
    console.log('server is running on port', port); 
});