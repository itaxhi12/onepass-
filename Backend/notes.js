const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const express = require('express')
const secret ="afhakjfgakfg&*%^$%^afasdk"


const router = express.Router()

notesSchema = mongoose.Schema({
    topic:{
        type:String,
        required:true
    },
    note:{
        type:String,
        required:true
    }
},{
    collection:'notes'
})

const notes = mongoose.model('Note Schema', notesSchema)
router.post('/notes',async(req,res)=>{
    const{topic,note}= req.body
    try{
        const response = await notes.create({topic,note})
        res.json({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }
})











router.get('/notes',async(req,res)=>{
    
    const token = req.header("Auth")
    if(token){
        const verification = jwt.verify(token,secret)
        if(verification){
            const Notes = await notes.find({})
            res.status(200).json(Notes)
        }else{
            res.status(200).json({message:"User Unauthorized"})
        }
    }else{
        res.status(200).json({message:"User Unauthorized"})
    }
})










router.put('/notes/:id',(req,res)=>{
    const {name,topic} = req.body
    notes.findByIdAndUpdate({_id:req.params.id},{$set:{name:name,topic:topic}},{new:true,useFindAndModify:false},(err,data)=>{
        res.send("updated")
         res.end()
    })
})






router.delete('/notes/:_id',(req,res)=>{
    notes.findByIdAndDelete({_id:req.params._id},(err,r)=>{
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

module.exports = {router,notes}