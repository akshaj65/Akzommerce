import express from 'express';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';
import config from './config';
import userRouter from './Routers/userRouter';
import orderRouter from './Routers/orderRouter';
import productRouter from './Routers/productRouter';
import uploadRouter from './Routers/uploadRouter';


mongoose
    .connect(config.MONGODB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology:true,
      
    }).then((data)=>{
      console.log(`Mongodb Connected  with ${data.connection.host}`);
    })
    .catch((error)=>{
      console.log(error.message);
    });

const app = express();

app.use(cors());//use cors on backend as u cant fetch data from other link
app.use(express.json()) //json data is sent to the body so its used no need of bodyparser
app.use('/api/uploads',uploadRouter);
app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter)
app.get('/api/paypal/clientId',(req,res)=>{
  res.send({clientId : config.PAYPAL_CLIENT_ID});
});
const __dirname =path.resolve();
console.log(__dirname);
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));
app.use(express.static(path.join(__dirname,'/frontend')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'/frontend/index.html'));
});

app.use((err,req,res,next)=>{ //for handling all errors in express application (middleware)
  const status = err.name && err.name === 'ValidationError'?400:500;
  res.status(status).json({
    message:err.message
  })
})
app.listen(config.PORT, () => {
    console.log("server running at http://localhost:5000")
})