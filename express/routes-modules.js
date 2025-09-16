const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World! twice');
});

app.get('/products', (req, res)=>{
    
    const products = [
        {name: 'laptop', price: 32000, id: 1},
        {name: 'mobile', price: 22000, id: 2},
    ]
    res.json(products);
},)

//dynamic route
app.get('/products/:id', (req, res)=>{
    const productId = parseInt(req.params.id);
      const products = [
        {name: 'laptop', price: 32000, id: 1},
        {name: 'mobile', price: 22000, id: 2},
    ]

    const singleProduct = products.find(product => product.id === productId);

    if(singleProduct){
        return res.json(singleProduct);
    } else{
        return res.status(404).send('Product not found');
    }
    res.send('you requested for product id: '+ id);
})

const port = 3200;
app.listen(port, ()=>{
    console.log('server is running on port', port); 
})