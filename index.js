const express = require('express')
const app = express()

const static = express.static('static');
app.use("/",static);

// app.get('/', function (req, res) {
//   res.send('Hello World...')

// })

app.listen(3000,() =>{
  console.log("Hello world")
})