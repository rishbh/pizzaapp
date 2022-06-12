const { Menu } = require('@mui/material')

function homeController(){
     const menu=require('../../models/menu')
  // use factory functions(produces objects)

  return{
    
    async index(req,res){
        // all logic for rendering home page
       
        const pizzas=await Menu.find()
        console.log(pizzas);
        
        return  res.render('home',{pizza:pizzas})

    }
  }

}


module.exports=homeController















