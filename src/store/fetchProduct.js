import { defineStore } from "pinia";
import {  onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router";
// import router from "@/router";

export const useProductStore = defineStore('product', ()=>{

    const productdata= ref(null)
    const category = ref('')
    const pname = ref('')
     const serverApi = ref(null)
    serverApi.value = process.env.VUE_APP_SERVICE_URL
    
 

    const product = async(id) =>{
      
        try {
   
            const result = await axios.get(`${serverApi.value}/api/products/`+id)
            const product = result.data

            productdata.value = product;
            category.value = product.category;
            pname.value = product.name;
          
  
          if(!product){
            throw Error('No data available')
          }
   
           
        }catch (err) {
        //   error.value = err.message

            if(err){

              router.push({

                name: "NotFoundPage"
                
              })
            }
         
        }  
   
   }
   
   

    onMounted( ()=> {

        // product()
        
       

    });



    return {
        productdata,
        product,
        category,
        pname
    }

})
