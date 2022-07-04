//   All te client codedss
import axios from 'axios';
import Noty from 'noty'; 
import {initAdmin} from './admin'
import moment from 'moment'
let cartCounter=document.querySelector("#cartCounter")

//we are sending data from clinet side user ki konsa pizza add kiya to thse server end*******
function updateCart(pizza){
    axios.post('/update-Cart',pizza).then(res=>{
        console.log(res);
        cartCounter.innerText=res.data.totalQty;
        new Noty({
            type:'success',
            timeout:1000,
            text: "Item added successfully in cart",
            progressBar:false
        }).show();
    }).catch(err=>{
        new Noty({
            type:'error',
            timeout:2000,
            text: "Something went wrong",
            progressBar:false
        }).show();
    })
}
//Adding Event Listener 
let addToCart=document.querySelectorAll('.add-to-cart');//an arry of all buttons on which 
addToCart.forEach(btn=>{
    btn.addEventListener('click',(e)=>{

        let pizza=JSON.parse(btn.dataset.pizza);
        console.log(pizza);

        updateCart(pizza)
    })
})



//Remove alert message after x seconds
const alertMsg=document.querySelector('#success-alert')
if(alertMsg){
    setTimeout( ()=>{
        alertMsg.remove()
    },2000)
}




let statuses=document.querySelectorAll('.status_line')
console.log("Statuses are",statuses)
//change status of order
let hiddenInput=document.querySelector('#hiddenInput')
let order=hiddenInput?hiddenInput.value:null

order=JSON.parse(order)
console.log(order)
let time=document.createElement('small')


function updateStatus(order){
    //remove all the previous classes 
    statuses.forEach((status)=>{
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted=true;
    statuses.forEach((status)=>{
        let dataProp=status.dataset.status;

        if(stepCompleted){
            status.classList.add('step-completed');
        }

        if(dataProp=== order.status){
            stepCompleted=false;

            if(status.nextElementSibling){

                 //appending time
                 time.innerText=moment(order.updatedAt).format('hh:mm A')
                 status.appendChild(time)


                status.nextElementSibling.classList.add('current')
            }
        }
    })
    
    


}






updateStatus(order)

//Socket
let socket=io()
//calls admin js ka file ka code

//JOIN from server
if(order){
    socket.emit('join',`order_${order._id}`)//server par bhejega  join message ka 
}
 //admin able to see all orders in real time
 let adminAreaPath=window.location.pathname;
 console.log(adminAreaPath)
 if(adminAreaPath.includes('admin')){
    initAdmin(socket)

    socket.emit('join','adminRoom');
 }




//we receive event from server file jo data aaya
socket.on('orderUpdated',(data)=>{
    //new order par update order function apply karna hai
    const updatedOrder={ ...order};//copy old order to new Order
    updatedOrder.updatedAt=moment().format();//curr time
    updatedOrder.status=data.status

    console.log("Data received from admin  side: ",data)
    updateStatus(updatedOrder)

    new Noty({
        type:'success',
        timeout:2000,
        text: "Order status get updated",
        progressBar:false
    }).show();

})





