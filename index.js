const express=require('express');
require('dotenv').config();
const authRoutes=require('./routes/authRoutes');
const userRoutes=require('./routes/userRoutes');

const port=process.env.PORT || 3000;
const app=express();

app.use(express.json());

app.use((req,res,next)=>{
    console.log('logging request headers',req.headers);
    next();
});

app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);

app.get('/',(req,res)=>{
    res.send("Hello World");
});

app.listen(port,()=>{
    console.log(`Server is running at port ${port}`);
});