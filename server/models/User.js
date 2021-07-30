module.exports=(seq,DataTypes)=>{

    const Users=seq.define('Users',{
        username:{type:DataTypes.STRING,allowNull:false},
        password:{type:DataTypes.STRING,allowNull:false}
    })

    Users.associate=(models)=>{
        Users.hasMany(models.Posts)
        Users.hasMany(models.Likes)
        
    }
    return Users
}
