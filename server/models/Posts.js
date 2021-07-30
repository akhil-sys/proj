module.exports=(seq,dataTypes)=>{
    const Posts=seq.define("Posts",{
       title:{
           type:dataTypes.STRING,
           allowNull:false
       } ,
       postText:{
        type:dataTypes.STRING,
        allowNull:false
    } ,
    username:{
        type:dataTypes.STRING,
        allowNull:false
    } 
    })
    Posts.associate=(models)=>{
        Posts.hasMany(models.Comments,{onDelete:'cascade'})
        Posts.hasMany(models.Likes)
    }


    return Posts

}