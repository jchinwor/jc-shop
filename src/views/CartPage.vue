<template>
  <div class="container">
   
        <h3 class="px-3">Shopping Cart</h3>
  <div class="flex px-3 flex-column lg:flex-row" v-if="CartItems.length>0">
     <div class="flex-1">
        <ProductsList 
        v-on:remove-from-cart="removeFromCart($event,$event2)"
        :CartItems="CartItems"
        />
     </div>
     <div class="mt-4 lg:mt-0 ">
       <div class="surface-0 border-round px-3 py-3 lg:mx-3">
             <b class="">
               CART SUMMARY
            </b>
           <div class="flex-column mx-2 ">
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="text-500">
                  SubTotal
                </p>
                <p class="">
                  ${{ totalPrice.toFixed(2) }}
                </p>
              </div>
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="text-500">
                  Tax
                </p>
                <p class="">
                  $0.00
                </p>
              </div>
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="text-500">
                  Shipping
                </p>
                <p class="">
                  $0.00
                </p>
              </div>
              <Divider />
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="">
                  Total
                </p>
                <p class="">
                  ${{ totalPrice.toFixed(2) }}
                </p>
              </div>
              <div class="flex flex-wrap justify-content-start  gap-3 ">
               <Button class="p-button-label px-7" label="Proceed to Checkout" icon="pi pi-check-circle" @click="checkoutbtn" />
             
              </div>
          </div>
       </div>
        <div class="surface-0 border-round px-3 lg:mx-3 py-1 my-3">
          <b>
            Returns are easy
          </b>
          <p>
            Free 7 days return if eligible
          </p>
      </div>
     
    </div>
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
               
         
         
         
    <Toast />
    <ConfirmDialog></ConfirmDialog>

       

   
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useAuthStore } from "../store/Auth"
import { useCartItemsStore } from "../store/fetchCartItems"
import ProductsList from '../components/ProductsList.vue'
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { useRouter } from 'vue-router';
// import {cartItems} from '../fake-data'
import axios from "axios"

export default {

  components: {ProductsList},

    setup(){

         const store = useCartItemsStore();
         const { CartItems} = storeToRefs(store)
         const { deleteProductFromCartFnt, getUpdatedUserCartItems } = store

         const router = useRouter();
         
         const emptycart = require('../assets/empty-cart.svg')

         const auth = useAuthStore();
         const { userid,usermain } = storeToRefs(auth)

         
        

      

         const confirm = useConfirm();
         const toast = useToast();


        


        

      const checkoutbtn = () =>{

             
               router.push({

                name: "CheckoutDetail",
                
                })
       
      }


       const removeFromCart = async (productid) =>{


            confirm.require({
                message: 'Do you really want to remove this item from cart?',
                header: 'Remove from cart',
                icon: 'pi pi-info-circle',
                rejectLabel: 'Cancel',
                acceptLabel: 'Remove Item',
                rejectClass: 'p-button-secondary p-button-outlined',
                acceptClass: 'p-button-primary',
                accept: () => {
                  
                  deleteProductFromCartFnt(productid,userid.value)

                    toast.add({ severity: 'success', summary: 'Confirmed', detail: 'Item deleted', life: 3000 });
                },
                reject: () => {
                    // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                }
            });
       }


       const totalPrice = computed(() => {

              return CartItems.value.reduce(
                (sum, item) => sum + (Number(item.new_price) * Number(item.quantity)),
                0,
              );

        })

      return{
        CartItems, totalPrice,removeFromCart,confirm,emptycart,checkoutbtn
      }
    }
}
</script>

<style scoped>
  h1 {
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }

  #total-price {
    padding: 16px;
    text-align: right;
  }

  #checkout-button {
    width: 100%;
  }

 
</style>