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
const passport=require('passport');

//socket connection 
const Emitter= require('events')



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

//Event emitter
const eventEmitter=new Emitter();
app.set('eventEmitter',eventEmitter )//key value pair


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
//Passport configuration
const passportInit=require('./app/config/passport');
 passportInit(passport);

app.use(passport.initialize());
app.use(passport.session())


//  flash 
app.use(flash())









// Assests
app.use(express.static('public'))// give folder 
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Global middleware
app.use((req,res,next)=>{//we can use session  from frontend also
    res.locals.session=req.session
    res.locals.user=req.user
    next()
})


//set template engine for doing repiting things like navbar footer //// layouts wala section pehle higa than routes
app.use(expresslayout);//app
app.set('views',path.join(__dirname,'/resources/views'))//giving path of views file
app.set('view engine','ejs')

//making route fn call
require('./routes/web')(app);// giving app as an argument




const server=app.listen(PORT, ()=>{
    console.log(`Listening on the  port No :  ${PORT} `);
})

//Sockets
const io=require('socket.io')(server)

io.on('connection',(socket)=>{
    //Join to client side //browser
    
    console.log("Room name for client is",socket.id)
//Receive from clinet side join name ki event  pass karengee
    socket.on('join',(orderId)=>{
        console.log("Order id is:",orderId);
        socket.join(orderId)//socket ki method
    })
})
//if event emiiter get updated from sttaus Contoller of admin
eventEmitter.on('orderUpdated',(data)=>{//room par dtaa bhejna  id and status  passed from admnn/statusController
    io.to(`order_${data.id}`).emit('orderUpdated',data)//har order ke rrom mein emit kar rahein hain  clinet par orderUpdated 
})


//now doing work so that admin able to see orders in real time
eventEmitter.on('orderPlaced',(data)=>{//room par dtaa bhejna 
    io.to('adminRoom').emit('orderPlaced',data)
})






