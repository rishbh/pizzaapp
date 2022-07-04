// const LocalStrategy=require('passport-local').Strategy;
// const User=require('../models/user');//databse se sari info 
// const bcrypt=require('bcrypt');
// function init(passport){
       
//         passport.use(
//                     new LocalStrategy(
//                                 {
//                                 usernameField:'email' }
//                                 ,async (email,password,done)=>{
//                                 //Login
//                                 // check if email exists
//                                 const user=await User.findOne({email:email})
//                                 if(!user){
//                                     return done(null,false,{message:'No user with this email'});
//                                 }
                                 
//                                 bcrypt.compare(password,user.password).then(match=>{
//                                     if(match){ 
//                                         return done(null,user,{message:'Logged in successfully'})
//                                     }
                                    
//                                     return done(null,false,{message:'Wrong username or password'})
//                                 }).catch(err=>{
//                                     return done(null,false,{message:'Something went wrong'})
//                                 })

//                                  } ))

//                         //now chek if user logged in or not??

//                         passport.serializeUser((user,done)=>{
//                             done(user,user._id)//in databse it is present so we get it by its ID
//                         })
//                         passport.deserializeUser((id,done)=>{
//                                  User.findById(id,(err,user)=>{
//                                     done(err,user)
//                                  })
//                         })

//                       //we get the user by its ID

// }
// module.exports=init



const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')// MODELS MEIN DATABSE HAI USERS KA
const bcrypt = require('bcrypt')

function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // Login
        // check if email exists
        const user = await User.findOne({ email: email })
        if(!user) {
            return done(null, false, { message: 'No user with this email' })
        }

        bcrypt.compare(password, user.password).then(match => {
            if(match) {
                return done(null, user, { message: 'Logged in succesfully' })
            }
            return done(null, false, { message: 'Wrong username or password' })
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong' })
        })
    }))
//check if user logged in or not??
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    // 
    passport.deserializeUser((id, done) => { 
        User.findById(id,(err,user)=> {
            done(err, user)
        })
    })

}

module.exports = init