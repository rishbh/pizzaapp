//   All te client codedss
import axios from 'axios';
import Noty from 'noty'; 
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

