import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel';
import { isAdmin, isAuth } from '../utils';

const productRouter = express.Router();
productRouter.get(
    '/',
    expressAsyncHandler(async (req,res)=>{
        const searchKeyword= req.query.searchKeyword
            ?{
                name:{
                    $regex: req.query.searchKeyword,
                    $options: 'i',
                },
            }
            :{};
        const products = await Product.find({ ...searchKeyword });
        res.send(products);
    })
);
productRouter.get(
    '/:id',
    expressAsyncHandler(async (req,res)=>{
        const product = await Product.findById(req.params.id);
        res.send(product);
    })
);

productRouter.post(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req,res)=>{
        const product = new Product({
            name:'sample product',
            description:'sample desc',
            category:'sample category',
            brand:'sample-brand',
            image:'/images/product-1.jpg',
        });
        const createdProduct =await product.save();
        if(createdProduct){
            res.status(201).send({
                message:'Product Created',product:createdProduct
            });
        } else{
            res.status(500).send({
                message:'Error in creating product'});
        }
    })
);
productRouter.put(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req,res)=>{
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(product){
            product.name= req.body.name ;
            product.price= req.body.price ;
            product.image= req.body.image ;
            product.brand= req.body.brand ;
            product.category= req.body.category ;
            product.countInStock= req.body.countInStock ;
            product.description= req.body.description ;
            const updateProduct = await product.save();
            if(updateProduct){
                res.send({message:'Product Updated',product:updateProduct});
            } else{
                res.status(500).send({message:'Error in updating product'})
            }
        } else{
            res.status(404).send({message:'Product not found'});
        }
    })
);

productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req,res)=>{
        const product = await Product.findById(req.params.id);
        if(product){
            const deletedProduct = await product.remove();
            res.send({ message: 'Product Deleted',product:deletedProduct});
        } else{
            res.status(404).send({ message: 'Product Not Found'});
        }
    })
);

export default productRouter;
