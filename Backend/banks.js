const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const express = require('express')
const secret ="afhakjfgakfg&*%^$%^afasdk"

const router = express.Router()
const BankSchema = mongoose.Schema({
    bank_name:{
        type:String,
        required:true
    },
    acc_no:{
        type:String,
        required:true
    },
    ifsc:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    telephone:{
        type:Number,
        required:true
    },
    note:{
        type:String,
        required:true
    }
},{
    collection:'banks'
})

const bank = mongoose.model('Bank Schema',BankSchema)
router.post('/bank',async (req,res)=>{
    const {bank_name,acc_no,ifsc,branch,telephone,note} = req.body
    try{
        const response = await bank.create({bank_name,acc_no,ifsc,branch,telephone,note})
        res.json({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }
})
router.get('/bank',async(req,res)=>{
    
    const token = req.header("Auth")
    if(token){
        const verification = jwt.verify(token,secret)
        if(verification){
            const Bank = await bank.find({})
            res.status(200).json(Bank)
        }else{
            res.status(200).json({message:"User Unauthorized"})
        }
    }else{
        res.status(200).json({message:"User Unauthorized"})
    }
})
router.put('/bank/:id',(req,res)=>{
    const {bank_name,acc_no,ifsc,branch,telephone,note} = req.body
    bank.findByIdAndUpdate({_id:req.params.id},{$set:{bank_name:bank_name,acc_no:acc_no,ifsc:ifsc,branch:branch,telephone:telephone,note:note}},{new:true,useFindAndModify:false},(err,data)=>{
        res.send("updated")
        res.end()
    })
})
router.delete('/bank/:_id',(req,res)=>{
    bank.findByIdAndDelete({_id:req.params._id},(err,r)=>{
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
module.exports = {router,bank}