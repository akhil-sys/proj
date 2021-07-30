const express=require('express')
const router=express.Router();
const {Posts,Likes,Users,Friends}=require('../models')
const {tokenValidator} =require('../middleware/authMiddleware')


router.get('/',async(req,res)=>{
    const data=await Posts.findAll();
    
    res.json(data)
})

router.post('/',tokenValidator,async (req,res)=>{
    const post=req.body;
    const id=req.user.id;
    
    await Posts.create({...post,UserId:id})
    console.log(post,'text')
    res.json(post)
})
router.post('/:postid/like',tokenValidator,async(req,res)=>{
    const postid=req.params.postid;
    const userid=req.user.id
    console.log(req.body.liked)
    if(req.body.liked){
        await Likes.destroy({where:{PostId:postid,UserId:userid}})
    }
    else{
        await Likes.create({PostId:postid,UserId:userid})
    }
    const likes=await Likes.findAll({where:{PostId:postid}})
    res.json(likes)

})

router.get('/:user_id',tokenValidator,async(req,res)=>{
    const id=req.params.user_id
    
    const posts=await Posts.findAll({where:{
        UserId:id
    }})
    const user=await Users.findOne({where:{
        id:id
    }})
    const request=await Friends.findOne({where:{
        sender_id:req.user.id,reciver_id:id
    }})
    console.log(request)
     return res.json({posts,user:{username:user.username,id:user.id},friend_req:request})
    
})

module.exports=router;