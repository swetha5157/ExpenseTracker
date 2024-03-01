const express = require('express')

const bodyparser=require('body-parser')
const app = express()
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));

const static = express.static('static');
app.use("/",static);
/*
?key=value
**/


app.post("/hi",(req,res)=>{
  console.log(req.query)
  res.json({
   // name:req.query.name,
    name:req.body.name,
    desc:req.body.desc,
    date:req.body.date,
    //date:req.body.date,
    amount:req.body.amount
   // phone:"123",
    //ph:req.query.ph*10,
  });
})
app.listen(3000,() =>{
  console.log("Hello world")
})