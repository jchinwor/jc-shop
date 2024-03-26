import { defineStore } from "pinia";
import {  computed, onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router";

export const useCartItemsStore = defineStore('cartitems', ()=>{

    const CartItems= ref([])
   
    // const error = ref(null)
    const productaddedtoast = ref(false)
    const outofstocktoast = ref(false)
    const productremovetoast = ref(false)
    const client_id = ref([])
     const serverApi = ref(null)
    serverApi.value = process.env.VUE_APP_SERVICE_URL

    const Customer_order = ref([])
    const Customer_shippingAddress = ref([])


  const LogOutCart = ()=>{

      CartItems.value = []

        return

    }
    





    const sdkReady = async() =>{


        try{

          const result = await axios.get(`${serverApi.value}/api/config/paypal`);
  
   
          if(result.data){
            client_id.value = result.data
          }

        }catch(err){

        }
         


    }


  const payOrder = async(orderid,paymentResult) =>{

      try{

        if(orderid){

          const result = await axios.put(`${serverApi.value}/api/orders/${orderid}/pay`,paymentResult);
    
          const orderData = result.data
    
          Customer_order.value = result.data.updateOrder
          Customer_shippingAddress.value = result.data.updateOrder.shippingAddress
    
          return orderData;
    
        }

      }catch(err){

      }

  }
    
    

  const getCustomerOrder = async(token,orderid) =>{

    const config = {
      headers: {
        Authorization: `${token}`,
        }
     
    }

      try{

          const result = await axios.get(`${serverApi.value}/api/orders/${orderid}`,config);
    
          // const orderData = result.data

          if(result.data.success){

            Customer_order.value = result.data.order
            Customer_shippingAddress.value = result.data.order.shippingAddress

          }else{
            router.push({

              name: "NotFoundPage"
  
            })
          }

          

        
          
          // return result
         
    
        

      }catch(err){

       

        if(err){

          router.push({

            name: "NotFoundPage"

          })
        }


      }

        

  }

  const customerOrder = async(shippingAddress,Cartitems,grandTotal,selectedPaymentMethod,userid,shippingPrice,taxPrice) =>{


    if(userid){
        
      try {
  
          const result = await axios.post(`${serverApi.value}/api/orders/`,{
            shippingAddress:shippingAddress,
            orderItems:Cartitems,
            totalPrice:grandTotal,
            paymentMethod:selectedPaymentMethod,
            userId:userid,
            shippingPrice:shippingPrice,
            taxPrice:taxPrice

          });

          const orderData = result.data

          if(result.data){

            CartItems.value = []

            

          }

          return orderData;



      }catch(error){

      }

    }

       return 
        
  }
  

   const productQuantity = (productid) => {

      const item = CartItems.value.find(i => i.id === productid)

      if(item) return item.quantity
      else return null

   }

   const getUpdatedUserCartItems = async(userid) =>{

    if(userid){
        
        try {
    
            const result = await axios.get(`${serverApi.value}/api/users/${userid}/cartItems`);
            const CartItemsdata = result.data.CartItems

            CartItems.value = CartItemsdata

          

          if(!CartItemsdata){
            throw Error('No data available')
          }
  
          
        }catch (err) {
        //   error.value = err.message
        
        }  

    }
}

   const deleteProductFromCartFnt = async(productid,userid) =>{

 
     
        try {

          let item = CartItems.value.find( i => i.id === productid)

              if(item){
                  
                    CartItems.value = CartItems.value.filter(i => i.id !== productid)
                  
              } 
              
              
              if(userid){
        
                const result = await axios.post(`${serverApi.value}/api/users/${userid}/deleteCartItem`,{
                  productId: productid
                });

               return result;
            }


        }catch(err){
          
        }
    }
   const removeFromCartFnt = async(product,productid,userid) =>{
     
        try {

          let item = CartItems.value.find( i => i.id === productid)

              if(item){
                  if(item.quantity > 1){
                    item.quantity--
                    productremovetoast.value = true
                    productaddedtoast.value = false
                    outofstocktoast.value = false
                    
                  }else{
                    CartItems.value = CartItems.value.filter(i => i.id !== productid)
                  }
              } 
              
              
              if(userid){
        
                const result = await axios.post(`${serverApi.value}/api/users/${userid}/removeCartItem`,{
                    productId: productid
                
                });
      
              
      
               return result;
            }


        }catch(err){
          
        }
    }
   const addToCartFnt = async(product,productid,userid) =>{
   

      let item = CartItems.value.find( i => i.id === productid)

      if(item){

          if(item.quantity === item.countInStock || item.quantity > item.countInStock){
             outofstocktoast.value = true
             productaddedtoast.value = false
          }else{
            outofstocktoast.value = false
            productaddedtoast.value = true
            item.quantity++
          }
        
           

      }else{
        CartItems.value.push({...product,quantity:1})
        
        productaddedtoast.value = true
        outofstocktoast.value = false
      }

      // updateLocalStorage(CartItems.value)

      if(userid){
        
          const result = await axios.post(`${serverApi.value}/api/users/${userid}/cart`,{
              productId: productid,
              product:product
          });

        

         return result;
      }


      
     

}
   
   

    onMounted( ()=> {

        // cartitems()
        sdkReady()
        
       
    });



    return {
        CartItems,
        productQuantity,
        productaddedtoast,
        productremovetoast,
        addToCartFnt,
        removeFromCartFnt,
        deleteProductFromCartFnt,
        LogOutCart,
        getUpdatedUserCartItems,
        customerOrder,
        getCustomerOrder,
        Customer_order,
        Customer_shippingAddress,
        payOrder,
        client_id,
        outofstocktoast
        
        
       
    } 

})
