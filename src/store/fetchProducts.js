import { defineStore } from "pinia";
import {  onMounted, ref } from "vue";
import axios from "axios";

export const useProductsStore = defineStore('products', ()=>{

    const productsdata= ref([])
    const latestproductsdata= ref([])
    const categories = ref([])
    // const error = ref(null)


    const products = async () =>{
      
        try {
   
            const result = await axios.get('https://jc-shop-api.onrender.com
/api/products')
            const products = result.data

            productsdata.value = products;
          

          if(!products){
            throw Error('No data available')
          }
   
           
        }catch (err) {
        //   error.value = err.message
         
        }  
   
   }
    const latestproducts = async () =>{
      
        try {
   
            const result = await axios.get('/api/products/latest')
            const productslat = result.data

            latestproductsdata.value = productslat;
          

          if(!productslat){
            throw Error('No data available')
          }
   
           
        }catch (err) {
        //   error.value = err.message
         
        }  
   
   }

   //Get Categories
const getCategory = async() =>{

  try{

      let result = await axios.get('/api/categories/')
      const categoriesData = result.data.categories
      
      if(result.data.success){

          categories.value = categoriesData
      }

     


  }catch(err){

  }

}
   

    onMounted( ()=> {

        products()
        latestproducts()
        getCategory()
       
    });



    return {
        productsdata,
        products,
        latestproductsdata,
        latestproducts,
        categories,
    }

})
