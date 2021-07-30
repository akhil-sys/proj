const express=require('express')
const router=express.Router();
const {Comments,Likes}=require('../models')
const {tokenValidator}=require('../middleware/authMiddleware')

router.get('/:postid',tokenValidator,async (req,res)=>{
    const postId=req.params.postid;
    const User=req.user
    const comments=await Comments.findAll({where:{
        PostId:postId
    }})
    
    const likes=await Likes.findAll({where:{
        PostId:postId
    }})
    const user_liked=await Likes.findOne({where:{
        PostId:postId,
        UserId:req.user.id
    }})
        if(user_liked){
        res.json({comments:comments,likes:likes,liked:true}) }
        else{
            res.json({comments:comments,likes:likes,liked:false})}
        
    
    
   
} )
router.post('/:commentid/delete',tokenValidator,async(req,res)=>{
    const id=req.params.commentid
    const user=req.user
    const comment=await Comments.findOne({where:{
        id:id
    }})

    await Comments.destroy({where:{
        id:id
    }})
    return res.json({data:`comment ${id} deleted`})
})

router.post('/',tokenValidator,async (req,res)=>{
    
    const comment=req.body;
    comment.username=req.user.username
    
    const c=await Comments.create(comment)
    
    res.json(c)
})
module.exports=router
