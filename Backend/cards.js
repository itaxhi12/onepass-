const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const express = require('express')
const secret ="afhakjfgakfg&*%^$%^afasdk"

const router = express.Router()
const cardsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    cvv:{
        type:Number,
        required:true
    },
    moe:{
        type:String,
        required:true
    },
    bankname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    notes:{
        type:String,
        required:true
    }
},{
    collection:'cards'
})

const model = mongoose.model('cards schema',cardsSchema)
router.post('/cards',async(req,res)=>{
    const {name,number,cvv,moe,bankname,password,notes} = req.body
    try{
        const response = await model.create({name, number, cvv, moe, bankname, password, notes})
        res.json({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }
})
router.get('/cards',async(req,res)=>{
    
    const token = req.header("Auth")
    if(token){
        const verification = jwt.verify(token,secret)
        if(verification){
            const Cards = await model.find({})
            res.status(200).json(Cards)
        }else{
            res.status(200).json({message:"User Unauthorized"})
        }
    }else{
        res.status(200).json({message:"User Unauthorized"})
    }
})
router.put('/cards/:id',(req,res)=>{
    const {name,number,cvv,moe,bankname,password,notes} = req.body
    model.findByIdAndUpdate({_id:req.params.id},{$set:{name:name,number:number,cvv:cvv,moe:moe,bankname:bankname,password:password,notes:notes}},{new:true,useFindAndModify:false},(err,data)=>{
        res.send("updated")
         res.end()
    })
})

router.delete('/cards/:_id',(req,res)=>{
    model.findByIdAndDelete({_id:req.params._id},(err,r)=>{
        if(err){
            res.send(err)
            res.end()
        }
        else{
            res.send("done")
        res.end()
        }
        
    })
        
})


module.exports = {router,model}