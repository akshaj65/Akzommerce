import express from 'express';
import cors from 'cors';
import data from './data';
import mongoose from 'mongoose';
import config from './config';
import userRouter from './Routers/userRouter';
import orderRouter from './Routers/orderRouter';


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
app.use('/api/users',userRouter);
app.use('/api/orders',orderRouter)
app.get('/api/paypal/clientId',(req,res)=>{
  res.send({clientId : config.PAYPAL_CLIENT_ID});
})
app.get("/api/products", (req, res) => {
    res.send(data.products)
});
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found!' });
  }
});

app.use((err,req,res,next)=>{ //for handling all errors in express application (middleware)
  const status = err.name && err.name === 'ValidationError'?400:500;
  res.status(status).json({
    message:err.message
  })
})
app.listen(5000, () => {
    console.log("server running at http://localhost:5000")
})