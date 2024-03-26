<template>
<div class="mt-4 border-round surface-0 p-3 mr-4 hidden lg:block">
    <div class="card flex flex-column justify-content-center w-full">
        <b class="text-left">
            CATEGORIES
        </b>
        <Divider />
            <div class="card flex justify-content-center" >
            
                <Listbox  v-model="selectedCategory" @click="catSelect" :options="categories" :optionValue="categoryName"  filter optionLabel="categoryName" class="w-full border-0 m-0 inputtext md:w-12rem" />
            </div>
            <Divider />
            <b class="text-left">
            PRICE(USD)
        </b>
        <div class="card flex justify-content-center mt-4">
           
            <Slider v-model="price" range class="w-14rem " :min="min" :max="max" @change="changeFnt"/>
        </div>
        <div class="card flex justify-content-between mt-4">
            <span>
                Min : {{minPrice}}
            </span>
            <span>
                Max : {{maxPrice}}
            </span>
            
        </div>

        <Divider />
         <b class="text-center">
            RESET FILTER
        </b>
        <Button label="RESET" severity="secondary" @click="resetFilter" class="mt-2"/>
    </div>
</div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useProductsStore } from "../store/fetchProducts"

const props = defineProps({

 products: {
    type: Array,
    default: null
  },
})

const selectedCategory = ref()
const store = useProductsStore();
const { productsdata,categories } = storeToRefs(store)




const emit = defineEmits(['update:CategoryFilter','update:ProductRangeFilter','update:ResetFilter'])

const products = ref([])
products.value = props.products

 const priceRange = ref([])
  for (let i = 0; i<productsdata.value.length; i++) {
       priceRange.value.push(productsdata.value[i].new_price) 
  }

var min = Math.min(...priceRange.value.map(item => item));
var max = Math.max(...priceRange.value.map(item => item));

const price = ref([min, max]);

const minPrice = computed(() => {
        var min = Math.min(...price.value.map(item => item));
    return min
})
const maxPrice = computed(() => {
        var max = Math.max(...price.value.map(item => item));
    return max
})



const catSelect = () =>{

   

    if(selectedCategory.value){

        emit('update:CategoryFilter', selectedCategory.value.categoryName)
        
    }else{
        
    }
     
}


const changeFnt = () =>{

    if(price.value){

         emit('update:ProductRangeFilter', price.value)

    }else{

    }
}
const resetFilter = () =>{

  
         emit('update:ResetFilter')

   
}

 

</script>

<style>

</style>