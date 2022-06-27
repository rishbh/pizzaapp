  function cartController(){
     
    // use factory functions(produces objects)
    return{
      
        index(req,res){
            // all logic for rendering home page
            
            res.render('customers/cart')
        },

        update(req,res){
            // let cart={
            //   items:{
            //     pizzaId:{item:pizzaObject,qty:0}
                  // pizzaID 2,45 qty
                  // pizza 3 ,64 qty
            //   },
            //   totalQty:0,
            //   totalPrice:0
            //   }
             //return res.json({data:"All is Ok"})

              //for 1st time we make our cart
             if(!req.session.cart){
              req.session.cart={
                items:{},
                totalQty:0,
                totalPrice:0
              }
             }
             //for 2nd time we can use it
             let cart=req.session.cart;//we are getting whole information  
             //check if item sis there or not
             if(!cart.items[req.body._id]){
                cart.items[req.body._id]={
                  item:req.body,
                  qty:1
              }
             cart.totalQty=cart.totalQty+1,
             cart.totalPrice=cart.totalPrice+req.body.price

             }else{
                
              cart.items[req.body._id].qty=cart.items[req.body._id].qty+1;
              cart.totalQty=cart.totalQty+1;
              cart.totalPrice=cart.totalPrice+req.body.price;
             }
             console.log(req.body);

             return res.json({totalQty:req.session.cart.totalQty});


        }
        
      }
    }
  
  
  
  
module.exports=cartController