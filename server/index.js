//IMportation des dependances
const express=require('express') 
const cors=require('cors')
require('dotenv').config()

//
const bookRoutes=require('./routes/bookRouter')
const db= require('./db/db')

const app=express();
       
//midlleware
app.use(cors());
app.use(express.json());
app.use('/Images',express.static("./Images"))

//    
app.use('/books',bookRoutes)
 
app.get('/',(req,res)=>{
res.send('welcome')
})

const port=5000

//connection a la base de mongoDb 
db.sync()
.then(console.log('Connexion reussi '))
.catch(err =>console.log(err))
app.listen(port,()=>{
    console.log('serveur lancer avec succes au port '+ port);
})

 
  
//
// const token =jwt.sign({id:userInfo._id},'secret');
// res.json({token, userId:userInfo._id})