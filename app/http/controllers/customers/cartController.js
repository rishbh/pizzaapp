function cartController(){
     
    // use factory functions(produces objects)
    return{
      
      index(req,res){
          // all logic for rendering home page
          
          res.render('customers/cart')
      }
    }
  
  }
  
  
  module.exports=cartController