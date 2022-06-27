//const { Menu } = require('@mui/material')
const Menu=require('../../models/menu')
function homeController(){
    
  // use factory functions(produces objects)

  return{
    
    async  index(req,res){
        // all logic for rendering home page
      
        const pizzas=await Menu.find()
        console.log( pizzas);
        return  res.render('home',{pizzas:pizzas})//here key is pizzas and array is 2nd type of pizzas jo Menu collectiosn se data aya hai

    }
  }

}


module.exports=homeController















