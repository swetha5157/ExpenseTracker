const express = require('express')
const app = express()

const static = express.static('static');
app.use("/",static);
/*
?key=value
**/


app.get("/hi",(req,res)=>{
  console.log(req.query)
  res.json({
    name:req.query.name,

    phone:"123",
    ph:req.query.ph*10,
  });
})
app.listen(3000,() =>{
  console.log("Hello world")
})