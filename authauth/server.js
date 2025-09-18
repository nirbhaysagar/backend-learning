require('dotenv').config();
const express = require('express');
const connectDB = require('./database/db');
const authRoutes = require('./routes/auth-routes');

//connect to database
connectDB();

const app = express();

app.use(express.json());

//routes
app.use('/api/auth', authRoutes);   

const PORT=process.env.PORT||3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})