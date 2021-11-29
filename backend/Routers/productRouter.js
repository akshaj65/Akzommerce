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
productRouter.post(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req,res)=>{
        const product = await Product.findById(req.params.id);
        if(product){
            const review ={
                rating: req.body.rating,
                comment:req.body.comment,
                user: req.user._id,
                name: req.user.name,
            };
            product.reviews.push(review);
            product.rating=
                product.reviews.reduce((a,c)=> c.rating+a ,0) /
                product.reviews.length;
            product.numReviews=product.reviews.length;
            const updatedProduct= await product.save();
            res.status(201).send({
                message:'Comment Created',
                data:updatedProduct.reviews[updatedProduct.reviews.length-1],
            });
        } else {
            throw new Error('Product does not exist');
        }
    })
);
productRouter.put(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req,res)=>{
        const editReview = await Product.findOneAndUpdate({"_id":req.params.id,"reviews.name":req.user.name},{$set:{"reviews.$.comment":req.body.comment,"reviews.$.rating":req.body.rating}},{new:true});
        console.log(editReview);
        if(editReview){

            editReview.rating=
                editReview.reviews.reduce((a,c)=> c.rating+a ,0) /
                editReview.reviews.length;
            editReview.numReviews=editReview.reviews.length;

            const updatedProduct= await editReview.save();
            res.send({
                message:'Comment Editted',
                data:updatedProduct.reviews[updatedProduct.reviews.length-1],
            });
        } else {
            throw new Error('Product does not exist');
        }
    })
);
productRouter.delete(
    '/:id/reviews',
    isAuth,
    expressAsyncHandler(async (req,res)=>{
        const product= await Product.findById(req.params.id)
        let removedreview=await Product.findOneAndUpdate({"_id":req.params.id},{"$pull":{"reviews":{"_id":req.body._id}}});
        if(product && removedreview){   
            removedreview.numReviews=removedreview.reviews.length;
            const updatedProduct= await removedreview.save();
            res.send({
                message:'Comment Deleted',
                data:updatedProduct.reviews[updatedProduct.reviews.length-1],
            });
        } else {
            throw new Error('Product does not exist');
        }
    })
);


export default productRouter;
