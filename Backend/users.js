const mongoose = require('mongoose')
const express = require('express')
const jwt = require('jsonwebtoken')
const secret ="afhakjfgakfg&*%^$%^afasdk"
const bcrypt = require('bcryptjs')
const router = express.Router()
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    hint:{
        type:String,
        required:true   
    }
},{
    collection:'users'
})

const model = mongoose.model('userSchema',userSchema)
router.post('/register',async (req,res)=>{
    model.find({}).then((db)=>{
        
        if(db.length > 0){
            mongoose.connection.db.dropDatabase().then
            (async ()=>
               
            {
                    let {username,password,hint} = req.body
                    password = bcrypt.hashSync(password,10)
                    try{
                            let response =   await model.create
                            ({
                                username,password,hint
                            })
                            // return res.status(200).json({status:"okay"})   
                        }
                catch(error){
                    console.log(error)
                    return res.json({status : "error"})
                        }
                }
            ).catch(er=>console.log(er))
}
}).catch(err=> console.log(err))
    let {username,password,hint} = req.body
 
    // console.log(hint)
    password = bcrypt.hashSync(password,10)
    try{
         let response = await model.create({
            username,password,hint
        })
        res.status(200).send({status:"okay"})   
    }catch(error){
        console.log(error)
        return res.json({
            status : "error"
        })
    }
    
})

router.post('/login', async (req,res)=>{
const {username,password} = req.body
const User = await model.findOne({username}).lean()
if(!User){
    return res.status(403).send({status:'error',error:'Invalid username or password'})
}
if(await bcrypt.compare(password, User.password)){
    const token = jwt.sign(User,secret)
    res.status(200).send({
         data:token
    })
}
else{
    res.status(403)
     res.json({error:'Invalid username or password'})
}
})
router.get('/creds',async (req,res)=>{
    const User = await model.findOne({})
    res.status(200).json({username:User.username,hint:User.hint})
})
module.exports = router