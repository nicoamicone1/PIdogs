const express = require('express');
const server=express()
const {Temperament}=require('../db.js')
const axios=require('axios')

const getApi=async function(){
    let perros=await axios("https://api.thedogapi.com/v1/breeds")
    return perros.data
}

const getTemp=async function(){
    let api=await getApi()
    let arr=api.map(e=>e.temperament);
    let temps=arr.join().split(',').filter(e=> e.charAt(0)!=' ')
    let final=[]        
    temps.forEach(e=>{
        if(!final.includes(e) && e!='')final.push(e);
    })
    return final
}

const check=async function(){
    let temps=await getTemp();
    let final=await Temperament.findAll({attributes:['name']})
    if(final[0]==undefined){
        temps.forEach(e=>{
            Temperament.create({name:e})
        })
    }
    let returned=await Temperament.findAll({attributes:['name']})
    return returned
}

server.get("/",async (req,res)=>{
    let final=[]
    while(final[0]==undefined){
        final=await check()
    }
    res.send(final)
})

module.exports =server;