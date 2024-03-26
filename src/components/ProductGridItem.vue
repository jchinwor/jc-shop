<template>

    <div  class="product-item flex align-items-center justify-content-center m-2 p-3">

          <div>
            <router-link :to="'products/'+product.id">
              <img :src="product.imageUrl" alt="">
              <h3 class="product-name">
                  {{product.name}}
              </h3>
              <p class="product-price">
                  ${{product.new_price}}
              </p>
                <button class="btn-m">
                    View Details
                </button>
                
            </router-link>

            <!-- <button class="btn-m" @click="addToCart(product.id)" v-if="!showSuccessMessage">
                    Add to cart
                </button>
             <button id="add-to-cart" class="green-button" v-if="showSuccessMessage">
            Item Added to Cart!
          </button> -->
            
            <!-- <router-link >
                <button >
                    Add to Cart
                </button>
            </router-link> -->
          </div>

        </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useCartItemsStore } from "../store/fetchCartItems"
import axios from 'axios'
import router from '@/router';
import { ref } from 'vue';

export default {
    name: 'ProductGridItem',
    props: ["product"],
    setup(){

      const store = useCartItemsStore();
      const { CartItems } = storeToRefs(store)
      

      const showSuccessMessage = ref(false);
      const addToCart = async (productid) =>{
          try {
    
            const result = await axios.post('/api/users/12345/cart',{
                  productId: productid,
              });

              CartItems.value = result.data;
          
              showSuccessMessage.value = true
              // setTimeout(() =>{
              //     router.push({
              //         name: "Products",
              //     })

              // }, 4000);
    
            
          }catch (err) {
          //   error.value = err.message
          console.log(err)
          
          }  
      }

        return{addToCart,showSuccessMessage} 
    }
}
</script>

<style scoped>
.product-item {
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 2px 5px #888;
    
   
  }

/* @media (max-width:900px){
  .product-item{
    width:90%;
  }
} */
.btn-m{
margin-bottom:12px;

}
  .product-name {
    margin-bottom: 0;
  }

  img {
    height: 200px;
    width: 200px;
  }

  .product-item a{
    width: 100%;
    list-style: none;
    text-decoration:none;
    color:#000;
  }

  button {
    width: 100%;
  }
   .green-button{
    background:green;
  }
</style>