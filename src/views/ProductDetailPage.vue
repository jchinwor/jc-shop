<template>
      <div v-if="productdata" class="container">
        <div class="card flex justify-content-start align-items-start mx-0 px-0   mt-3 ">
        <Breadcrumb :home="home" :model="items" class="border-none bg-surface-0" style="background:none">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'text-color']" />
                        <span class="text-primary font-semibold">{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-color">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb>
    </div>

     <div class="flex flex-column lg:flex-row" >
        <div class="flex-1 flex flex-column md:flex-row  align-items-start md:align-items-start justify-content-start  font-bold  md:pr-6 md:py-3 border-round">
            <div class="">
                <div class="surface-border mx-2 border-round-md">
                    <img :src="productdata.imageUrl" preview  class="bg-auto shadow-4 bg-no-repeat bg-center border-round h-20rem w-full md:w-24rem" alt="">
                </div>
                  <!-- <div class="flex flex-row flex-wrap">
                    <div class="flex align-items-center justify-content-center w-4rem h-4rem surface-0 font-bold border-round m-2 p-1">
                          <Image :src="productdata.imageUrl" alt="Image" width="100%" preview />
                    </div>
                    <div class="flex align-items-center justify-content-center w-4rem h-4rem surface-0 font-bold border-round m-2 p-1">
                          <Image :src="productdata.imageUrl" alt="Image" width="100%" preview />
                    </div>
                    <div class="flex align-items-center justify-content-center w-4rem h-4rem surface-0 font-bold border-round m-2 p-1">
                          <Image :src="productdata.imageUrl" alt="Image" width="100%" preview />
                    </div>
                    
                  </div> -->
            </div>
            <div class="mx-2 lg:mx-3 md:mx-3">
                   <div >
                     <h1 class="text-2xl"> {{ productdata.name}} </h1>
                    <div class="flex  justify-content-start align-content-center  gap-3  ">
                      
                        <div class="align-items-center justify-content-center">
                          <Rating v-model="productdata.averageRating" readonly :cancel="false" />
                        </div>
                        <span class="align-items-center justify-content-center">
                          {{productdata.numReviews}} Reviews
                        </span>

                    </div>
                    <p>
                      Category: <span class="text-primary-700"> {{productdata.category}}</span>
                    </p>
                    <p>
                      Availability: 
                      <span class="text-primary-700" v-if="productdata.countInStock > 0"> In Stock </span>
                      <span class="text-primary-700" v-else> <Tag severity="warning" value="Sold Out"></Tag> </span>
                    
                    
                    </p>
                    <h2>
                       <b>${{productdata.new_price}}</b> <span><strike>${{productdata.old_price}}</strike></span>
                    </h2>
                    <div>
                   
                    </div>

                    <div>
                      
                      <div v-if="productdata.countInStock > 0">
                         <div class="card flex justify-content-center mb-2 mt-3" v-if="!ItemIsInCart">
                          <Button class="p-button-label" label="Add to Cart"  icon="pi pi-shopping-cart" @click="addToCart" />
                        </div>
                        <div class="flex-auto" v-if="ItemIsInCart">
                            <label for="minmax-buttons" class="font-bold block mb-2">  </label>
                            <InputNumber v-model="productTotal" inputId="minmax-buttons" mode="decimal" showButtons :min="-1" :max="100" >

                            <template #incrementbuttonicon>
                                  <span class="pi pi-plus" @click="addToCart" />
                              </template>
                              <template #decrementbuttonicon>
                                  <span class="pi pi-minus" @click="removeFromCart" />
                              </template>
                            </InputNumber>
                        </div>

                      </div>
                      <div v-else>

                        <div class="card flex justify-content-center mb-2 mt-3" >
                          <Button class="p-button-label" label="Add to Cart" disabled icon="pi pi-shopping-cart"/>
                        </div>

                      </div>
                    </div>
                   </div>
                    
            </div>
            
          </div>
      
        <div class="flex align-items-start mt-3  justify-content-start font-bold border-round">
           <div class="card w-full mx-2">
            <Card class="surface-0 w-full ">
                <template #title></template>
                
                <template #content>
                    <p class="m-0 p-0 flex justify-content-start align-items-center">
                      <Avatar :image="delivery_info" class="flex align-items-center justify-content-center mr-2"  />

                       Fast Delivery all across the country
                    </p>
                    <Divider />
                     <p class="m-0 p-0 flex justify-content-start align-items-center">
                      <Avatar :image="safe_payment" class="flex align-items-center justify-content-center mr-2"  />

                        Safe Payment
                    </p>
                    <Divider />
                     <p class="m-0 flex justify-content-start align-items-center">
                      <Avatar :image="return_policy" class="flex align-items-center justify-content-center mr-2"  />

                       7 Days Return Policy
                    </p>
                    <Divider />
                     <p class="m-0 flex justify-contenter-start align-items-center">
                      <Avatar :image="authentic_product" class="flex align-items-center justify-content-center mr-2" />

                       100% Authentic Products
                    </p>
                </template>
            </Card>
        </div>
        </div>
        
     </div>

          <div class=" py-5">
                      <TabView>
                        <TabPanel header="Product Details" >
                           <div class="overflow-auto">
                             <!-- <p class="m-0 ">
                               {{productdata.description}}
                            </p> -->
                            <div class=" ql-editor" v-html="productdata.description"></div>
                           </div>
                        </TabPanel>
                        <TabPanel header="Reviews">

                          <div class="flex flex-column md:flex-row lg:flex-row gap-4" v-if="productdata.reviews.length">
                             <div class="flex-column   ">
                                <h4 class="">Verified Ratings <span>({{productdata.numReviews}})</span> </h4>
                                <div class="flex flex-column bg-gray-50 px-4 border-round py-2 justified-content-center  align-items-center">
                                    <p>
                                       {{ productdata.averageRating}} / 5
                                    </p>
                                      <div>
                                        <Rating v-model="customerRating" readonly :cancel="false" />
                                      </div>
                                    <p>
                                      ({{productdata.numReviews}}) verified ratings
                                    </p>
                                </div>
                             </div>
                             <div class="flex flex-1 ">
                                <div class="w-full">
                                       <h4 >Comments from verified purchase</h4>
                                        <DataView :value="productdata.reviews" paginator :rows="5">
                                          <template #list="slotProps">
                                              <div class="grid grid-nogutter">
                                                  <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 ">
                                                      <div class="flex  flex-column sm:flex-row sm:align-items-center  p-4 gap-3 " :class="{ 'border-top-1 surface-border': index !== 0 }">
                                                      


                                                        <div class="flex flex-1 overflow-auto flex-column  ">
                                                          <div class="flex flex-column">
                                                                <Rating v-model="item.averageRating" class="text-yellow-500" readonly :cancel="false" />
                                                              <p>
                                                                {{item.reviewTitle}}
                                                              </p>
                                                                <p>
                                                                  {{item.comment}}
                                                              </p>
                                                          </div>
                                                           <div class="flex  justify-content-between " >
                                                              <p class="flex text-sm md:text-base">
                                                                <span class="">{{moment(item.createdAt).format('ll') }} </span>&nbsp; by &nbsp;<span> {{item.name}}</span>
                                                              </p>
                                                              <p class="flex text-sm text-primary-400 md:text-base"> 
                                                                Verified Purchase
                                                              </p>
                                                           </div>
                                                        </div>
                                                        



                                                          <!-- <div class="md:w-10rem relative">
                                                           
                                                              <img class="block xl:block mx-auto border-round w-full" :src="`https://primefaces.org/cdn/primevue/images/product/${item.image}`" :alt="item.name" />
                                                             
                                                          </div>
                                                          <div class="flex flex-column  md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                                                              <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                                                                  <div>
                                                                      <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                                                      <div class="text-lg font-medium text-900 mt-2">{{ item.name }}</div>
                                                                  </div>
                                                                  <div class="surface-100 p-1" style="border-radius: 30px">
                                                                      <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                                                          <span class="text-900 font-medium text-sm">{{ item.rating }}</span>
                                                                          <i class="pi pi-star-fill text-yellow-500"></i>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                              <div class="flex flex-column md:align-items-end gap-5">
                                                                  <span class="text-xl font-semibold text-900">${{ item.price }}</span>
                                                                  <div class="flex flex-row-reverse md:flex-row gap-2">
                                                                      <Button icon="pi pi-heart" outlined></Button>
                                                                      <Button icon="pi pi-shopping-cart" label="Buy Now" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial white-space-nowrap"></Button>
                                                                  </div>
                                                              </div>
                                                          </div> -->
                                                      </div>
                                                  </div>
                                              </div>
                                          </template>
                                      </DataView>
                                </div>
                                 
                             </div>
                          </div>

                          <div v-else>
                              <div class="flex flex-column justify-content-center align-items-center text-center">
                                 <div>
                                      <img src="../assets/empty-review.svg" width="100" height="100" alt="">
                                      <p>
                                        No review given yet
                                      </p>
                                 </div>
                              </div>
                          </div>
                           
                        </TabPanel>
                        
                    </TabView>
                    </div>
      </div>

 <div v-else class="flex  justify-content-center  col-12">
             <ProgressSpinner />
        </div>
   

  <Toast />

    
</template>

<script>
import { storeToRefs } from 'pinia';
import { useProductStore } from "../store/fetchProduct"
import { useAuthStore } from "../store/Auth"
import { useCartItemsStore } from "../store/fetchCartItems"
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router";
// import {products} from '../fake-data'
import { useRoute } from 'vue-router'
import NotFoundPage from '../views/NotFoundPage.vue'
import { useToast } from 'primevue/usetoast'
import moment from 'moment';

export default {

components:{NotFoundPage},
    setup(){

        const toast = useToast();
        const authentic_product = require('../assets/authentic_product.png')
        const delivery_info = require('../assets/delivery_info.png')
        const return_policy = require('../assets/return_policy.png')
        const safe_payment = require('../assets/safe_payment.png')

        //Authentication store
        const auth = useAuthStore();
        const { userid } = storeToRefs(auth)
        //Fetch Cart Store
        const store2 = useCartItemsStore();
        const { CartItems,productaddedtoast,outofstocktoast,productremovetoast } = storeToRefs(store2)
        const { addToCartFnt, removeFromCartFnt,productQuantity } = store2


        const outstock  = ref(null)
        outstock.value = outofstocktoast.value
        // const showSuccessMessage = ref(false);

        

        //product store
        const store = useProductStore();
        const { productdata, category, pname} = storeToRefs(store)
        const { product } = store
        
        const route = useRoute();  
        const productid = route.params.id


         product(productid) 
         

        onMounted(() => {
                  
                
        });

        
        
        
       

          const ItemIsInCart = computed(() => {

              return CartItems.value.some(
                (item) => item.id === productdata.value.id,
              ); 
          }) 
         
          const productTotal = computed(() => {
              return productQuantity(productdata.value.id)
          }) 


      const addToCart = () =>{

         
        addToCartFnt(productdata.value,productdata.value.id,userid.value)

         if(outofstocktoast.value){

            toast.add({ severity: 'error', summary:'',detail:"Product is out of stock", life: 3000 });

         }
        
        if(productaddedtoast.value){
            toast.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart', life: 3000 });
          }
        
          
          
           
          
        
      }

      const removeFromCart = () =>{

        if(productremovetoast.value = true){
            toast.add({ severity: 'success', summary: 'Success', detail: 'Item  quantity updated', life: 6000 });
          }

        
            removeFromCartFnt(productdata.value,productdata.value.id,userid.value)
      }
 
   const home = ref({
    icon: 'pi pi-home',
    route: '/'
    });

    

    // Breadcrumbs Navigation
    const items = ref([]);
   items.value.push({ label:category})
   items.value.push({ label:pname})


        return {
            moment,
            home,
            items,
            productdata,
            addToCart,
            ItemIsInCart,
            productTotal,
            userid,
            toast,
            removeFromCart,
            category,
            authentic_product,
            delivery_info,
            return_policy,
            safe_payment,
           


        }
    }
}
</script>

<style scoped>



.p-button-label{
  flex: 1 1 auto;
}

  #page-wrapmain {
    max-width: 1200px;
  }
  #page-wrap {
    margin-top: 16px;
    padding: 16px;
    max-width: 600px;
  }

  #img-wrap {
    text-align: center;
  }

  img {
    width: 400px;
  }

  #product-details {
    padding: 16px;
    position: relative;
  }

  #add-to-cart {
    width: 100%;
  }

  #price {
    position: absolute;
    top: 24px;
    right: 16px;
  }
  .green-button{
    background:green;
  }
  .gray-button{
    background:#888;
  }
</style>