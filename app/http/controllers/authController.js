function authController(){
     
    // use factory functions(produces objects)
    return{
      
      login(req,res){
          // all logic for rendering home page
          
          res.render('auth/login')
      },
      register(req,res){
        // all logic for rendering home page
        
        res.render('auth/register')
    }

    }
  
  }
  
  
  module.exports=authController