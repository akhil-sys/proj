const express=require('express');
const db=require('./models')
const Postrouter=require('./routes/Posts')
const Commentrouter=require('./routes/Comments')
const authRouter=require('./routes/auth')
const cors=require('cors')
const app=express();
const FriendsRouter=require('./routes/Friends')

app.use(cors())
app.use(express.json())

app.use('/posts',Postrouter)
app.use('/comments',Commentrouter)
app.use('/auth',authRouter)
app.use('/',FriendsRouter)
db.sequelize.sync().then(()=>{

    app.listen(3001,()=>{console.log('server started')})
})




