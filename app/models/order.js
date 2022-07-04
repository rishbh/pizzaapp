// if we name this file as menu then db make collections named as menus

const { modalClasses } = require('@mui/material');
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

//apply to new class or constructor function
const orderSchema=new Schema({
   //what we want to disply in home page
   customerId:{type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
            
    items:{type:Object,
    required:true},

    phone:{type:String,
           required:true},
    
    address:{type:String,
            required:true},
    paymentType:{type:String,
                  default:'Cash On Delivery'},
    status:{type:String,
             default:'Order placed'}

},{timestamps:true})

//export this models
const Order=mongoose.model('Order',orderSchema);// User satrts with capital alphabet jo collections bnegi vo hoga Users
module.exports=Order;


