const {verify} = require('jsonwebtoken')


const tokenValidator=(req,res,next)=>{
    const headers=req.headers
    const token=req.headers["jwt"]
    console.log(token)
    
    if(token==null || token==undefined || token==''||token=='null'){
        
        return res.json({err:'jwt token not found'})
    }
    try{
        const logged_in=verify(token,'j_token')
        
        if(logged_in){
        
        req.user=logged_in
        return next();
        
    }}catch{err=>console.log(err)}

    res.json({err:'request timed out'})
    
}

module.exports={tokenValidator}