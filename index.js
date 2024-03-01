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


/*app.post("/hi",(req,res)=>{
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
})*/

// app.get("/hi",(req,res)=>{
//   console.log(req.query)
//   req.json(req.query);
//   // firstName:req.query.name,
//     // ...req.query,            //... -> spread operator
//     // desc:req.query.desc,
//     // const {amount}:req.query,
//     // date:req.query.date,
//     // amount,
//     // ph:req.query.ph,
// })

app.get("/hi", (req, res) => {
  console.log(req.query);
  res.json(req.query);
});

/* using promise
app.get("/todos",(req,res)=>{
  const todos=fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response)=>response.json())
  .then((json)=>res.json(json));
});*/

app.get("/todos",async(req,res)=>{
  const response=await fetch("https://jsonplaceholder.typicode.com/todos")
  const todos=await response.json()
  res.json(todos)
});

app.listen(3000,() =>{
  console.log("Hello world")
})