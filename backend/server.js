//const express = require('express');
import express from 'express';
const app = express();
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute';
//const { data } = require('./data');

dotenv.config();
const mongodburl = config.MONGODB_URL;
mongoose.connect(mongodburl,{ useNewUrlParser: true,
     useUnifiedTopology: true}).catch(error =>
    console.log(error.reason));


app.use("/api/users", userRoute);

app.get('/api/products',function(req,res){
    console.log(data.products);
    res.send(data.products);
})

app.get('/api/products/:id',function(req,res){
    const productId = req.params.id;
    //console.log(data.products);
    const product = data.products.find(x => x.id === productId);
    if(product){
    res.send(product);
    }
    else{
        res.status(404).send({ msg: "product not found!" });
    }
})

app.listen(5500,function(){
    console.log("server started at port: 5500");
})