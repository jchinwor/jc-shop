<template>
<div class="container">
    <h2>Check Out</h2>
  <div class="flex flex-column lg:flex-row" v-if="CartItems.length>0">
    
        <CheckOut 
        v-on:remove-from-cart="removeFromCart($event,$event2)"
        :CartItems="CartItems"
        />
     
     
  </div>
    <div v-else class="flex justify-content-center items-align-center surface-0 border-round px-3 py-3">

        <div class="mt-4 flex flex-column">
            <!-- <img :src="require('../assets/empty-cart.svg')" alt=""> -->
            <img :src="emptycart" alt="">
            <b class="mt-3">
              Your Cart is empty
            </b>

            <router-link to="/">
                <Button label="Start Shopping" class="mt-3"/>
            </router-link>

        </div>

    </div>
</div>

    
  
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import CheckOut from '../components/CheckOut.vue'
import { useAuthStore } from "../store/Auth"
import { useCartItemsStore } from "../store/fetchCartItems"


         const store = useCartItemsStore();
         const { CartItems} = storeToRefs(store)
         const { deleteProductFromCartFnt, getUserCartItems } = store
         
         const auth = useAuthStore();
         const { userid } = storeToRefs(auth)

         const emptycart = require('../assets/empty-cart.svg')

        const totalPrice = computed(() => {

                    return CartItems.value.reduce(
                        (sum, item) => sum + (Number(item.new_price) * Number(item.quantity)),
                        0,
                    );

                })

        const selectedCategory = ref('Paypal');
        const categories = ref([
            { name: 'Paystack', key: 'PS' },
            { name: 'Flutterwave', key: 'FW' },
            { name: 'Paypal', key: 'P' },
            
        ]);
        

</script>

<style>

</style>