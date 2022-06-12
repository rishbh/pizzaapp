const express=require('express');
const app=express(); //as a fn import kar liya hmne app wale variable mein
const PORT=process.env.PORT || 3000
const ejs=require('ejs')
const expresslayout=require('express-ejs-layouts');
const path=require('path')
const mongoose=require('mongoose') ;

// Assests
app.use(express.static('public'))// give folder 
//


//set template engine for doing repiting things like navbar footer //// layouts wala section pehle higa than routes
app.use(expresslayout);//app
app.set('views',path.join(__dirname,'/resources/views'))//giving path of views file
app.set('view engine','ejs')

//making route fn call
require('./routes/web')(app);// giving app as an argument




app.listen(PORT, ()=>{
    console.log(`Listening on the  port No :  ${PORT} `);
})


