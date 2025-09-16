const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('home page!');
});

app.post('/data/api', (req, res)=>{
    res.json({
        name: 'bold',
        age: 23,
    })
})

app.use((err, req, res, next)=> {
    console.log(err.stack);
    res.status(500).send('Something broke!');
})

const port = 3000;
app.listen(port, () => {
  console.log('server is running on port', port);
});