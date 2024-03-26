<template>


<div class="hidden md:block">
      <div class="flex  bg-primary-100 border-round">

                <div class="flex-1 flex align-items-start justify-content-start  font-bold m-2 px-5 py-3 border-round">Product</div>
                <div class=" flex align-items-center justify-content-start font-bold  m-2 px-5 py-3 border-round">Unit Price</div>
                <div class=" flex align-items-center justify-content-start font-bold  m-2 px-5 py-3 border-round">Qty</div>
                <div class=" flex align-items-center justify-content-start font-bold  m-2 px-5 py-3 border-round">Total</div>
            
     </div>
</div>
          
            <div >
                <ProductsListItem 
                
                v-for="product in CartItems" 
                v-on:remove-from-cart="$emit('remove-from-cart',$event)" 
                :key="product.id"  
                :product="product" />  
                
            </div> 

            
    


</template>

<script>
import ProductsListItem from '../components/ProductsListItem.vue'
export default {
    components:{ProductsListItem},
    props:['CartItems']

}
</script>

<style>

</style>