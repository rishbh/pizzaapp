const order=require('../../../models/order')
function orderController(){

    return{

        index(req,res){

            //find the order placing customer whole details
           order.find({status:{$ne:'completed'}},
           null,
           {sort:{'createdAt':-1}})
           .populate(
            'customerId' -'password'        ).exec( (err,orders)=>{
                //send the json data
                if(req.xhr){
                    return res.json(orders)
                }
                else{
                res.render('admin/orders')
                        
                }
            })
        }
    }


}

module.exports=orderController