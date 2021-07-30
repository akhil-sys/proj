const express=require('express')
const router=express.Router();
const {Users}=require('../models')
const {sign}=require('jsonwebtoken')
const{tokenValidator}=require('../middleware/authMiddleware')

router.post('/register',async (req,res)=>{
    const data= req.body;
    const username_not_valid=await Users.findOne({where:{
        username:data.username
    }})
    if(username_not_valid){
        res.json('username already exists')
    }else{
    await Users.create(data);
    res.json('user registered')}
})

router.post('/login',async (req,res)=>{
    const data=req.body;
    const user_valid= await Users.findOne({where:{username:data.username}})
    if(user_valid){ 
        const j_token=sign({username:user_valid.username,id:user_valid.id},'j_token')
        if(user_valid.password==data.password){
            
        return res.json(j_token)
    }
        else{
            return res.json({error:'incorrect password'})
        }
       
    }
    else{
        return res.json({error:'invalid username'})
    }
})
router.get('/auth',tokenValidator,(req,res)=>{
    const user=req.user;
    res.json(user)
})
module.exports=router