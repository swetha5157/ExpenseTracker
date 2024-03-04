
const mongoose=require('mongoose');
const Schema=mongoose.Schema;
 const Author=new Schema({//Author is a collection
name:String,
email:String,
 });

 //to make mongoose know that Author is a model

 const authorModel=mongoose.model('author',Author)

 
 module.exports=authorModel //this sends the data to index.js