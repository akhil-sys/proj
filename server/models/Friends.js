module.exports=(seq,dataTypes)=>{
  
    const Friends=seq.define("Friends",{
      sender_id:{type:dataTypes.INTEGER,allowNull:false},
      reciver_id:{type:dataTypes.INTEGER,allowNull:false},
      accpected:{type:dataTypes.BOOLEAN,default:false}
    })
    

    return Friends

}