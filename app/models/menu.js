// if we name this file as menu then db make collections named as menus

const { modalClasses } = require('@mui/material');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//apply to new class or constructor function
const menuSchema=new Schema({
   //what we want to disply in home page
   name:{type:String,required:true},
   price:{type:Number,required:true},
   image:{type:String,required:true},
   size:{type:String,required:true}
})

//export this models
const Menu=mongoose.model('Menu',menuSchema);// Meanu satrts with capital alphabet
module.exports=Menu;


