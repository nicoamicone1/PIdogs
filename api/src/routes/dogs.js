const express = require('express');
const server=express()
const {Dog,Temperament}=require('../db.js')
const axios=require('axios')
const {APIKEY} = process.env;

const getApi=async function(){
    let perros=await axios(`https://api.thedogapi.com/v1/breeds?api_key=${APIKEY}`)
    return perros.data;
}

const getDB=async function(){
    let perros=await Dog.findAll({
        attributes:['id','name','weight']
        ,include:{
        model: Temperament,
        attributes: ['name'],
        through:{
            attributes:[]
        }
        }
    })
    
    return perros;
}

server.get('/',async (req,res)=>{
    let {name}=req.query;
    let api=await getApi();
    let final=api.map(e=>{
        let {name,weight,image,temperament,id}=e;
        return {name,weight,image,temperament,id};
    })
    let datab=await getDB();
    let todos=final.concat(datab)
    if(name){
        let cont=todos.filter(e=>{
            let ename=e.name.toLowerCase();
            let myname=name.toLowerCase();
            if(ename.includes(myname))return true;
        });
        cont[0]!=undefined? res.send(cont) : res.status(404).send({msg: 'No existe una raza para esta busqueda'})
    }else{
        res.send(todos)
    }
})

server.get('/:idRaza',async (req,res)=>{
    let {idRaza}=req.params;
    let api=await getApi()
    let final=api.map(e=>{
        let {name,weight,height,image,temperament,id,life_span}=e;
        return {name,weight,image,temperament,id,height,life_span};
    })
    let datab=await getDB();
    let todos=final.concat(datab)

    let result=todos.filter(e=>e.id==idRaza);
    result[0]!=undefined? res.send(result) : res.status(404).send({msg: 'No existe raza con este ID'})
})



module.exports = server;