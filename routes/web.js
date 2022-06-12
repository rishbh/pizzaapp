
const homeController=require('../app/http/controllers/homeController.js')//importing homeController
const authController=require('../app/http/controllers/authController.js')//importing authController
const cartController=require('../app/http/controllers/customers/cartController.js')//importing authController




function initRoutes(app){
// takes all routes from server file


//for handling request and response
app.get('/',  homeController().index )//2nd paarmeter is fn which takes request and sends response in homeController file
  
  // making of cart page  route
app.get('/cart',cartController().index)
  
  app.get('/login',authController().login)
  app.get('/register',authController().register)

}


//export to server so that server file can use it
module.exports=initRoutes