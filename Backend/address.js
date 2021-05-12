const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const express = require('express')

const router = express.Router()
const secret ="afhakjfgakfg&*%^$%^afasdk"


const addressSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
        },
    apartment:{
        type:String,
        required:true
    },
    street:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    }

},{
    collection:'addresses'
})

const model = mongoose.model("Address Schema",addressSchema)

router.post('/address',async (req,res)=>{
    const {name,apartment,street,landmark,city,state,country,pincode} = req.body

    
    try{
        const response = await model.create({
           name,apartment,street,landmark,city,state,country,pincode
        })
        res.json({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }

})

router.get('/address',async(req,res)=>{
    
    const token = req.header("Auth")
    if(token){
        const verification = jwt.verify(token,secret)
        if(verification){
            const Address = await model.find({})
            res.status(200).json(Address)
        }else{
            res.status(200).json({message:"User Unauthorized"})
        }
    }else{
        res.status(200).json({message:"User Unauthorized"})
    }
})

router.put('/address/:id',(req,res)=>{
    const {name,apartment,street,landmark,city,state,country,pincode} = req.body
    model.findByIdAndUpdate({_id:req.params.id},{$set:{name:name,apartment:apartment,street:street,landmark:landmark,city:city,state:state,country:country,pincode:pincode}},{new:true,useFindAndModify:false},(err,data)=>{
        res.send("updated")
        res.end()
    })
})

router.delete('/address/:_id',(req,res)=>{
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