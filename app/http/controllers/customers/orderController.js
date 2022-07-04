const Order=require('../../../models/order.js')//  ./ same folder    ../parent folder
const moment=require('moment')
function orderController(){
   
    return{
        store(req,res){
            //we store data from frontend to dtabase
            //Validate Request
            const {phone,address}=req.body;
            if(!phone || !address)
            {
                req.flash('error','All fields are required');
                return res.redirect('/cart');
            }
//making new oder and the save it
            const order=new Order({
                customerId:req.user._id,
                items:req.session.cart.items,
                phone:phone,
                address:address
            })

            order.save().then(result=>{
                Order.populate(result,{path:'customerId'} , (err,placedorder)=>{
                                
                    req.flash('success','Order get placed successfully');
                    delete req.session.cart;
                     
                    //Emit
                    const eventEmitter=req.app.get('eventEmitter');
                    eventEmitter.emit('orderPlaced',placedorder)
    
    
                    return res.redirect('/customer/orders');
                })
               
            }).catch( err=> {
                req.flash('error','something went wrong')
                return res.redirect('/cart')
            })
            console.log(req.body);
        },
       async  index(req,res){
            //Fecth user al ordes
            //////*******yahan doubt hai kynunki user bna hi nhi to ????????????????????????/ */
          
            const orders=await Order.find({
                customerId:req.user._id //if logged in user and databse mein id same hai we get whole order   
            },
            null,
            {sort:{'createdAt':-1}})
            res.header('Cache-Control','no-store')
            res.render('customers/orders',{orders:orders,moment:moment})
            console.log(orders)
        },
        async show(req,res){
            const order=await Order.findById(req.params.id)
            //now authorise only that customer will be able to see if their order tracker page


                if(req.user._id.toString()===order.customerId.toString())//jo databsse se req aaya aur jo order ke id 
                {
                    return res.render('customers/singleOrder',{order:order})
                }
                return res.redirect('/')
        }







        
  }      
}
module.exports=orderController