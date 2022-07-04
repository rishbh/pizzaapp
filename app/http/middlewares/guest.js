function guest(req,res,next){
     if(!req.isAuthenticated()){
        return next()//if user don not loggeed in then process next request
     }
     return res.redirect('/')
}

module.exports=guest;