//const express = require('express');
import express from 'express';
const app = express();
import data from './data';
//const { data } = require('./data');

app.get('/api/products',function(req,res){
    console.log(data.products);
    res.send(data.products);
})

app.listen(5500,function(){
    console.log("server started at port: 5500");
})