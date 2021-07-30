module.exports=(seq,DataTypes)=>{

    const Comments=seq.define("Comments",{
        commentBody:{
            type:DataTypes.STRING,
            allowNull:false
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    return Comments
}