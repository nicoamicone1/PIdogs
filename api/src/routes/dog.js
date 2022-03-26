const express = require('express');
const server=express()
const {Dog}=require('../db.js')



server.post('/',async (req,res)=>{
    const {name,weight,height,life_span}=req.body
    let perrito=await Dog.create({name,height,weight,life_span})
    res.send(perrito)
});

module.exports =server;