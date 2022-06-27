require('dotenv').config()

const express=require('express');
const app=express(); //as a fn import kar liya hmne app wale variable mein
const PORT=process.env.PORT || 3000
const ejs=require('ejs')
const expresslayout=require('express-ejs-layouts');
const path=require('path')

const mongoose=require('mongoose') ;
const session=require('express-session');

const flash=require('express-flash');
const MongoDbStore = require('connect-mongo');
//const MongoDbStore=require('connect-mongo');//giving sessin as parameter to this fn




//Databse connection
const url='mongodb://localhost/pizza';

mongoose.connect(url,{ useNewUrlParser: true,  useUnifiedTopology: true
     });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
})
;

///*******do  stepwise pehle session store -->then session configuration *///used in previous version
//session store

// let mongoStore=new MongoDbStore({

//     mongooseConnection:connection,
//     collection:'sessions'//jis name se hmare databse mein store hoga 


// })

//Session configuration
app.use(session(
        {
    secret:  process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
    store:MongoDbStore.create({//works well for new version 4 of mongo-connect
        mongoUrl:url
        // another method : client:connection.getclient()
    }),//we store in datavsed
    cookie:{maxAge:1000*60*60*24 }//it reamins for 1 day
    }
)
);



//  flash 
app.use(flash())
//Global middleware
app.use((req,res,next)=>{//we can use session  from frontend also
    res.locals.session=req.session;
    next();
})







// Assests
app.use(express.static('public'))// give folder 
app.use(express.json())
//set template engine for doing repiting things like navbar footer //// layouts wala section pehle higa than routes
app.use(expresslayout);//app
app.set('views',path.join(__dirname,'/resources/views'))//giving path of views file
app.set('view engine','ejs')

//making route fn call
require('./routes/web')(app);// giving app as an argument




app.listen(PORT, ()=>{
    console.log(`Listening on the  port No :  ${PORT} `);
})


