import express from 'express';
import Product from '../models/product';
import { getToken, isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", async (req, res) => {
    const category = req.query.category ? { category: req.query.category } : {};

    const products = await Product.find({...category});
    console.log(products);
    res.send(products);
})

router.get("/:id", async (req, res) => {
    const product = await Product.findOne({_id: req.params.id});
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: "product not found"})
    }
    
})

router.post("/", async (req, res) => {
    const product = new Product({
        name: req.body.name,
        brand: req.body.brand,
        image: req.body.image,
        category: req.body.category,
        price: req.body.price,
        rating: req.body.rating,
        reviews: req.body.reviews,
        countInStock: req.body.countInStock,
        description: req.body.description
    })
    const newProduct = await product.save();
    if(newProduct){
       return res.status(201).send({ message: 'Product has been added successfully', data: newProduct });
    }
    return res.status(500).send({ message: "Error occured during an attempt to add new product" })
})


router.put("/:id", async (req, res) => {    
    const productId =  req.params.id;
    const product = await Product.findById(productId);
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        const updatedProduct = await product.save();
    if(updatedProduct){
       return res.status(200).send({ message: 'Product has been updated successfully', data: updatedProduct });
    }
    }
    
    
   return res.status(500).send({ message: "Error occured during an attempt to update product" })
})

router.delete("/:id", async(req, res) => {
    const deletedProduct = await Product.findById(req.params.id);
    if(deletedProduct){
        await deletedProduct.remove();
        res.send({message: "product deleted successfully"});
    }
    else{
        res.send("error in deletion");
    }

    
})

export default router;