const express = require('express');
const path = require('path');


const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  console.log('First middleware');
  next(); // Pass control to the next middleware
});

let products = [
  { id: 1, name: 'Product 1', price: 100 },
  { id: 2, name: 'Product 2', price: 200 },
  { id: 3, name: 'Product 3', price: 300 },
];
app.get('/', (req, res) => {
  res.json({ message: 'welcome to book store' });
});


app.get('/get', (req, res) => {
  res.json(products);
});
app.use(express.json());

//get a single product using id

app.get('/get/:id', (req, res) => {{
    const productId = products.find(p => p.id === req.params.id);
    if(productId){
        res.status(200).json(productId);}
    else{
        res.status(404).json({message: 'Product not found'});
    }
    }});

//create a new product
app.post('/add', (req, res) =>{
    const newProduct = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});
    
//update a product
app.put('/update/:id', (req, res) =>{
    const productId = products.find(p =>p.id === parseInt(req.params.id));
    if(productId){
        productId.name = req.body.name;
        productId.price = req.body.price;
        res.status(200).json(productId);
    } else{
        res.status(404).json({message: 'Product not found to update'});
    }}
)

//delete a product
app.delete('/delete/:id', (req, res)=>{
    const productId = products.find(p => p.id === parseInt(req.params.id));
    if(productId){
        products = products.filter(p => p.id !== parseInt(req.params.id));
        res.status(200).json({message: 'Product deleted successfully'});
    } else{
        res.status(404).json({message: 'Product not found to delete'});
    }
})


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
