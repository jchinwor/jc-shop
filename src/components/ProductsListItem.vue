<template>
<div class=" surface-0 border-round mt-4">
     
                
     <div class="flex">
            <div class="flex-1 flex align-items-start justify-content-start  font-bold m-2  py-3 border-round">
                   
            <router-link :to="'/products/'+product.id">
            <div class="flex ">
              <div>
                 <Avatar :image="product.imageUrl"   class="flex bg-contain align-items-center justify-content-center mr-2 border-round" size="xlarge" />
                
                  
                
              </div>
            </div>
            </router-link>
            <div >
              <b>
                  <router-link :to="'/products/'+product.id">
                    {{product.name.substring(0,120)}}
                  </router-link>
                  
              </b>
             <div class="block md:hidden">
               <p>
                <span class="text-500">Unit Price </span>:  ${{ product.new_price.toFixed(2)}}
              </p>
              <p >
                <span class="text-500">Total</span> :  ${{ itemcost.toFixed(2)}}
              </p>
             </div>
            </div>
            
            
            </div>
            <div class="md:block hidden md:flex align-items-center justify-content-center">
                <div class="font-bold m-2 px-5 py-3 border-round">
                ${{ product.new_price.toFixed(2)}}
                </div>
            </div>
           
           <div v-if="ItemIsInCart" class="block md:hidden flex align-items-center justify-content-center m-2">
            
                  <div class="flex flex-column justify-content-center align-items-center" >
                        <Button class="p-button-label" label="" icon="pi pi-plus" @click="addToCart" />
                        
                        <span class="p-2">
                          {{productTotal}}
                        </span>
                       
                        <Button class="p-button-label" label="" icon="pi pi-minus" @click="removeFromCart" />
                  </div>

           </div>


          <!--- Mobile  ItemIsInCart --->
          
          <div class="hidden md:block md:flex align-items-center justify-content-center  font-bold m-2 py-3 border-round">
                <div class="flex justify-content-center align-items-center" v-if="ItemIsInCart">
                  <Button class="p-button-label" label="" icon="pi pi-minus" @click="removeFromCart" />
                  <span class="p-2">
                    {{productTotal}}
                  </span>
                  <Button class="p-button-label" label="" icon="pi pi-plus" @click="addToCart" />
                          
                </div>
           
            </div>
          
            
                <div class="md:block hidden md:flex align-items-center justify-content-start  font-bold m-2 px-3 py-3 border-round">
                ${{ itemcost.toFixed(2) }}
                </div>
  
    </div>    

       <div class="p-1 text-primary-600 ">
        
            <span class="hover:bg-primary-50 hover:border-round cursor-pointer hover:m-4"  v-on:click="$emit('remove-from-cart',product.id)">
                <span class=""><i class="pi pi-trash mr-2  "></i></span>Remove   
            </span> 
        
        </div>      
            
  </div>
    
    <Toast />
 
</template>

<script>
import { computed, ref } from 'vue'
import { useProductStore } from "../store/fetchProduct"
import { useCartItemsStore } from "../store/fetchCartItems"
import { useAuthStore } from "../store/Auth"
import { storeToRefs } from 'pinia'
import { useToast } from 'primevue/usetoast'
export default {

    props: ['product'],

    setup(props){

      const product = ref([])

      const toast = useToast();

      product.value = props.product

      const store2 = useCartItemsStore();
      const { CartItems,productaddedtoast,outofstocktoast,productremovetoast  } = storeToRefs(store2)
      const { addToCartFnt, removeFromCartFnt,productQuantity } = store2

         //product store
      const store = useProductStore();
      const { productdata} = storeToRefs(store)


         //User store
      const auth = useAuthStore();
      const { userid } = storeToRefs(auth)
        
        
      
      const ItemIsInCart = computed(() => {
              return CartItems.value.some(
                (item) => item.id === product.value.id,
              ); 
          }) 

      const addToCart = () =>{

          if(outofstocktoast.value){

            toast.add({ severity: 'error', summary:'',detail:"Product is out of stock", life: 5000 });

         }

         if(productaddedtoast.value){
            toast.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart', life: 6000 });
          }

          addToCartFnt(productdata.value,product.value.id,userid.value)
      }

      const removeFromCart = () =>{

         if(productremovetoast.value = true){
            toast.add({ severity: 'success', summary: 'Success', detail: 'Cart Item quantity updated', life: 6000 });
          }
            removeFromCartFnt(productdata.value,product.value.id,userid.value)
      }

          const productTotal = computed(() => {
              return productQuantity(product.value.id)
          }) 

       const itemcost = computed(() => {

              return product.value.new_price * product.value.quantity

        })

      return{
        itemcost,
        addToCart,
        removeFromCart,
        ItemIsInCart,
        productTotal,
        toast
      }
    }

}
</script>

<style scoped>
 .product-container {
    align-content: 'center';
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 16px;
    width: 100%;
  }

  .product-image {
    flex: 1;
    height: 100px;
    max-width: 100px;
  }

  .details-wrap {
    padding: 0 16px;
    flex: 3;
  }

  .remove-button {
    flex: 1;
    margin: auto;
  }
</style>