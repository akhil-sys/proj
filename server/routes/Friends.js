const express=require('express')
const { tokenValidator } = require('../middleware/authMiddleware')
const router=express.Router()
const {Friends,Users}=require('../models')


router.post('/request/:reciverid',tokenValidator,async(req,res)=>{
    const reciver_id=req.params.reciverid
    const sender_id=req.user.id;
    //console.log(Friends)
    const request=await Friends.findOne({where:{
        sender_id:sender_id,reciver_id:reciver_id
    }})
    if(request){
        await Friends.destroy({where:{
            sender_id:sender_id,reciver_id:reciver_id
        }})
        return res.json({data:null})
    }
    const r=await Friends.create({sender_id:sender_id,reciver_id:reciver_id,accpected:false})
    return res.json({data:r})

})
router.get('/request',tokenValidator,async(req,res)=>{
    const user_id=req.user.id
    const requests=await Friends.findAll({
        where:{
            reciver_id:user_id
        }
    })
    return res.json({data:requests})

})
router.get('/friends',tokenValidator,async(req,res)=>{
    const All_users=await Users.findAll()
    console.log(All_users)
    return res.json(All_users)
})



module.exports=router
