import express from 'express';
import cors from 'cors';
import data from './data';
import mongoose from 'mongoose';
import config from './config';
import userRouter from './Routers/userRouter';


mongoose
    .connect(config.MONGODB_URL,{
      useNewUrlParser: true,
      useUnifiedTopology:true,
      
    }).then((data)=>{
      console.log(`Mongodb Connected  with ${data.connection.host}`);
    })
    .catch((error)=>{
      console.log(error);
    });

const app = express();

app.use(cors());//use cors on backend as u cant fetch data from other link

app.use('/api/users',userRouter);
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


app.listen(5000, () => {
    console.log("server running at http://localhost:5000")
})