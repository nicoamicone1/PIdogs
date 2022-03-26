const express = require('express');
const server=express()
const {Dog,Temperament}=require('../db.js')
const axios=require('axios')

const getApi=async function(){
    let perros=await axios("https://api.thedogapi.com/v1/breeds")
    return perros.data
}

const getDB=async function(){
    let perros=await Dog.findAll({attributes:['id','name','weight','height','life_span'],include:{
        model: Temperament,
        attributes: ['name'],
        through:{
            attributes:[]
        }
    }})
    return perros;
}

server.get('/',async (req,res)=>{
    let {name}=req.query;
    let api=await getApi()
    let datab=await getDB();
    let todos=api.concat(datab)
    if(name){
        let cont=todos.filter(e=>{
            let ename=e.name.toLowerCase();
            let myname=name.toLowerCase();
            if(ename.includes(myname))return true;
        });
        cont[0]!=undefined? res.send(cont) : res.status(404).send({msg: 'No existe una raza para esta busqueda'})
    }else{
        res.send(api.concat(datab))
    }
})

server.get('/:idRaza',async (req,res)=>{
    let {idRaza}=req.params;
    let api=await getApi()
    let datab=await getDB();
    let todos=api.concat(datab)

    let result=todos.filter(e=>e.id==idRaza);
    result[0]!=undefined? res.send(result) : res.status(404).send({msg: 'No existe raza con este ID'})
})



module.exports = server;