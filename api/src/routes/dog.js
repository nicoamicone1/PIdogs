

const express = require('express');
const server=express()
const {Dog,Temperament}=require('../db.js')
const axios=require('axios');




server.post('/',async (req,res)=>{
    const {name,weight,height,life_span,temps}=req.body
    let perrito=await Dog.create({name,height,weight,life_span})
    await axios("http://localhost:3001/temperament")
    let temp=await Temperament.findAll({where:{ name: temps}});
    perrito.addTemperament(temp)
    res.send(perrito)
});

module.exports =server;