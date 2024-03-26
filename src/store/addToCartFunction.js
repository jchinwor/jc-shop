import { defineStore } from "pinia";
import {  ref } from "vue";
import axios from "axios";
import router from "@/router";
// import router from "@/router";

export const useAddToCartStore = defineStore('addtocart', ()=>{

    const showSuccessMessage= ref(false)
    
    const CartItems= ref([])
     const serverApi = ref(null)
    serverApi.value = process.env.VUE_APP_SERVICE_URL

    const addToCart = async(productid) =>{
        try {
  
            const result = await axios.post(`${serverApi.value}/api/users/12345/cart`,{
                productId: productid,
            });

            const CartItemsdata = result.data

            CartItems.value = CartItemsdata;
        
            showSuccessMessage.value = ref(true)
            // setTimeout(() =>{
            //     router.push({
            //         name: "Products",
            //     })

            // }, 4000)
  
          
        }catch (err) {
        //   error.value = err.message
        
        }  

    }
   
   


    return {
        addToCart,showSuccessMessage
    }

})
