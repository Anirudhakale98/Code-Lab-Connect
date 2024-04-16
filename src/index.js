const express = require("express");

const app = express();
const path = require("path");
const hbs  = require('hbs')

const collection = require('./mongodb')

const templatePath = path.join(__dirname , '../templates')
app.set('view engine','hbs')
app.set('views',templatePath)
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'/public')))

 

const port = 4000;

app.use(express.json())



app.listen(port, () => {
  console.log("port connected");
});


app.get('/',(req,res)=>{
    res.render('signin')
})



app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup',async(req,res) =>{
    const data = {
        username : req.body.email,
        password : req.body.password,
    }
    await collection.insertMany([data]);

    res.render('home')
})

app.post('/signin',async(req,res) =>{
  
    try{
        const check=await collection.findOne({name:req.body.email})

        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("Wrong password")
        }

        res.render('home')
    }
    catch{
        res.send("Wrond credentials");
    }
})
