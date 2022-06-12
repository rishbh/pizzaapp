// if we name this file as menu then db make collections named as menus

const { modalClasses } = require('@mui/material');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//apply to new class or constructor function
new Schema({
   //what we want to disply in home page
   name:{type:String,required:true},
   price:{type:Number,required:true},
   image:{type:URL,required:true},
   size:{type:Number,required:true}
})

//export this models
models.export(mongoose.model('Menu','menuSchema'));// Meanu satrts with capital alphabet