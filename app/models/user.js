// if we name this file as menu then db make collections named as menus

const { modalClasses } = require('@mui/material');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//apply to new class or constructor function
const userSchema=new Schema({
   //what we want to disply in home page
   name:{type:String,required:true},
   email:{type:String,required:true,unique:true},
   password:{type:String,required:true},
   role:{type:String,required:false,default:'customer'}
},{timestamps:true})

//export this models
const User=mongoose.model('User',userSchema);// User satrts with capital alphabet jo collections bnegi vo hoga Users
module.exports=User;


