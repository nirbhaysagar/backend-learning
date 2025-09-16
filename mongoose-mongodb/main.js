const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nirbhaysagar45:nirbhaysagar45@cluster0.mhblda5.mongodb.net/').then(()=>{
    console.log("Connection Successful");
}).catch((e)=>{
    console.log("No Connection");
})