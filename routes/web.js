
const homeController=require('../app/http/controllers/homeController.js')//importing homeController
const authController=require('../app/http/controllers/authController.js')//importing authController
const cartController=require('../app/http/controllers/customers/cartController.js')//importing authController
const orderController=require('../app/http/controllers/customers/orderController.js')//importing authController


//admin routes
const adminOrderController=require('../app/http/controllers/admin/orderController.js')
const statusController=require('../app/http/controllers/admin/statusController.js')

//middlewares
const auth=require('../app/http/middlewares/auth')
const guest=require('../app/http/middlewares/guest')
const admin=require('../app/http/middlewares/admin')


function initRoutes(app){
// takes all routes from server file


//for handling request and response
app.get('/',  homeController().index )//2nd paarmeter is fn which takes request and sends response in homeController file
  // making of cart page  route
app.get('/cart',cartController().index)
  
  app.get('/login',guest,authController().login)//Frontend jo dikhana hai data
  app.post('/login',authController().postLogin)//jo backend ko data jaega

  app.get('/register',guest,authController().register)
  app.post('/register',authController().postRegister)
  
  app.post('/logout',authController().logout)

  app.post('/update-Cart',cartController().update)//calss function 


  //Customers routes
  
   app.post('/orders',auth,orderController().store)
   app.get('/customer/orders',auth,orderController().index)

   app.get('/customer/orders/:id',auth,orderController().show)


    //admin routes
    app.get('/admin/orders',admin,adminOrderController().index)
    app.post('/admin/order/status',admin,statusController().update)



}


//export to server so that server file can use it
module.exports=initRoutes