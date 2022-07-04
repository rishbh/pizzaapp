const Order= require('../../../models/order')
function statusController(){

     return{

          update(req,res){
           
            //here update the order status
            Order.updateOne({_id:req.body.orderId},{status:req.body.status},(err,data)=>{
                    if(err){
                        return res.redirect('/admin/orders')
                    }
                      //Emit
                    const eventEmitter=req.app.get('eventEmitter');
                    eventEmitter.emit('orderUpdated',{
                         id:req.body.orderId,   status:req.body.status
                    })
                    //now we can listen in our application anywhere
                    console.log("Order get updated");
                    return res.redirect('/admin/orders')    
            })
             

          }

     }


}

module.exports=statusController