<template>
   <div class="container">
       
           <div class="flex flex-column lg:flex-row" >
                <b class="text-lg mt-3 p-3 lg:hidden cursor-pointer" @click="goBack" >
                    
                        <i class="pi pi-arrow-left text-lg"></i>&nbsp; Shop all products
                    
                </b>
                <!---- ShopFilter --->
                <ShopFilters :products="products" @update:ResetFilter="resetProducts"   @update:CategoryFilter="filterCategories" @update:ProductRangeFilter="changeFnt" />

                <!--- Filtered Data ---->
                <FilteredData :products="products" @update:SearchFilter="searchFnt" />
                

            </div>
          

   </div>
 
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "../store/fetchProducts"
import ShopFilters from "../components/ShopFilters.vue"
import FilteredData from "../components/FilteredData.vue"
import router from '@/router';

const store = useProductsStore();
const { latestproductsdata } = storeToRefs(store)

const route = useRoute(); 


const products = ref([]);
products.value = latestproductsdata.value;

const emptycart = require('../assets/empty-cart.svg')

const goBack = () =>{
     router.go(-1)
}

const resetProducts = () => {

      products.value = latestproductsdata.value;
    }

const filterSearch = (searchquery) => {
    resetProducts()
      if (searchquery !== 'All') {
        products.value = products.value.filter((product) => {
           return product.name.toLowerCase().includes(searchquery.toLowerCase())
        })

      }     
}


const searchFnt = (search) =>{

            filterSearch(search)
        }
            
     




const filterCategories = (catName) => {
    resetProducts()
      if (catName !== 'All') {
        products.value = products.value.filter((product) => {
          return product.category === catName
        })

      }     
}

const changeFnt = (pricerange) =>{

       resetProducts()

        if(pricerange){

            var min = Math.min(...pricerange.map(item => item));
            var max = Math.max(...pricerange.map(item => item));

            products.value = products.value.filter((product) => {

            return product.new_price >= min && product.new_price <= max

            })
        }

    //    data.filter(function(x){ return x.Price >= 250 && x.Price <= 800});
}








</script>

<style scoped>

.p-inputtext {
  padding: 0.375rem 0.9375rem!important;
  font-size: 1.25rem;
  width: 100%;
}

</style>