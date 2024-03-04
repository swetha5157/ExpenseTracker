const bodyparser=require('body-parser');
const axios = require('axios');
const express = require('express');
const mongoose=require('mongoose');
const Author=require("./models/author")//as Object //in json={author:Author}//local importing of package

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
mongoose
.connect('mongodb://127.0.0.1:27017/blogs')
 .then(()=>console.log("db connected"))
 .catch(()=>console.log("error occured"));
 console.log(Author.find({}).then(//
  (data)=>console.log(data)
 ));

/* const author = new Author({
  name:Math.random().toString(),
  email:Math.random().toString(),
})

author.save().then(()=>console.log("Author Created")) //automatically saved
*/
const static = express.static('static');
app.use("/",static);

/*
?key=value
**/


app.post("/authors",(req,res)=>{
  const {name,email}=req.body;
  const author=new Author({
    name,
    email,
  });

  author.save()
   .then((data)=>res.status(201).json(data))
   .catch((error)=>res.json({
    error:error.message
  })
  );

});
  
app.post("/authors/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the author by id
    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Update the name if provided in the request body
    if (req.body.name) {
      author.name = req.body.name;
      author.email = req.body.email;
    }

    // Save the updated author to the database
    await author.save();

    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update author" });
  }
});




  


//get the values from db

app.get("/authors",async(req,res)=>{
  const authors=await Author.find({})
  res.json(authors);
})

//as like of select a particular post from instagram
app.get("/authors/:id",async(req,res)=>{
  const{id}=req.params;
  const author=await Author.findById(id)
  res.json(author);
})


app.put("/authors/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the author by id
    const author = await Author.findById(id);

    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    // Update the name and email if provided in the request body
    author.name = req.body.name ? req.body.name : author.name;
    author.email = req.body.email ? req.body.email : author.email;

    // Save the updated author to the database
    await author.save();

    res.json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update author" });
  }
});



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
//     // const {amount}:req.query,//obj destructuring
//     // date:req.query.date,
//     // amount,
//     // ph:req.query.ph,
// })

/*
app.get("/hi", (req, res) => {
  console.log(req.query);
  res.json(req.query);
});
*/

/* using promise
app.get("/todos",(req,res)=>{
  const todos=fetch("https://jsonplaceholder.typicode.com/todos")
  .then((response)=>response.json())
  .then((json)=>res.json(json));
});*/

//using async await

/*
app.get("/todos",async(req,res)=>{
  try{//error handling
  const response=await fetch("https://jsonplaceholder.typicode.com/todos")
  const todos=await response.json()
  res.json(todos)
  }catch(error){
    res.status(503).json({
      error:"API call failed",    //to give a try catch so that it should print err msg when inter fails
    })
  }
});

*/
//the the last value is from 1to 200
//for each we cant create seperate get ftn
//dynamic saying of values after the /todos
/*
app.get("/todos/:id",async(req,res) => {
  const {id:Name}=req.params;
  res.json({Name})

});
*/


 // Get the entire value of data by typing the id in route parameter using axios library
/*
 app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params; // Extract id from route parameters

    const response = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const todo = response.data;

    res.json(todo); // Send the fetched todo as the response
  } catch (error) {
    console.error("Error in /todos/:id route:", error);
    res.status(503).json({
      error: "API call failed",
    });
  }
});

*/
//wildcard endpoint
/*
app.get("*",(req,res)=>{
  res.json({});                                                                                       //({}->this returns as object)
})
*/
app.listen(3000,() =>{
  console.log("Hello world")
})
