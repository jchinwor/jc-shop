<template>
<main class="container">
    <!--- Hero section --->
    <Hero />


 <!--- Best Services Section --->
   <div class="grid grid-nogutter surface-0 border-round p-3 mt-3">
    <div class="col-12 md:col lg:col">
        <div class="text-center md:text-left lg:text-left mb-4 md:mb-0 lg:mb-0 flex flex-column md:flex-row lg:flex-row justify-content-center align-items-center">
            <div class="mr-1">
                <Avatar :image="delivery_info"   />
               
            </div>
            <div>
                Fast Delivery all across the country
            </div>
        </div>
        
    </div>
    <Divider layout="vertical" class="hidden md:block lg:block" />
    <div class="col-12 md:col lg:col">
            <div class="text-center md:text-left lg:text-left mb-4 md:mb-0 lg:mb-0 flex flex-column md:flex-row lg:flex-row justify-content-center align-items-center">
                <div class="mr-1">
                    <Avatar :image="safe_payment"   />
                   
                </div>
                <div>
                    Safe Payment
                </div>
            </div>
    </div>
    <Divider layout="vertical" class="hidden md:block lg:block" />
    <div class="col-12 md:col lg:col">
            <div class="text-center md:text-left lg:text-left mb-4 md:mb-0 lg:mb-0  flex flex-column md:flex-row lg:flex-row justify-content-center align-items-center">
            <div class="mr-1">
                 <Avatar :image="return_policy"   />
              
            </div>
            <div>
               7 Days Return Policy
            </div>
        </div>
    </div>
    <Divider layout="vertical" class="hidden md:block lg:block" />
    <div class="col-12 md:col lg:col">
            <div class="text-center md:text-left lg:text-left mb-4 md:mb-0 lg:mb-0 flex flex-column md:flex-row lg:flex-row justify-content-center align-items-center">
            <div class="mr-1">
                 <Avatar :image="authentic_product"   />
               
            </div>
            <div>
                100% Authentic Products
            </div>
        </div>
    </div>
  
  </div>

   <!-- Featured Products -->
    <div class="card surface-0 border-round px-3 ">
        <h2 class="flex justify-content-center pt-4">
                Featured Products
            </h2>
        <Carousel :value="productsdata.slice(0).slice(-8)" :numVisible="4" :numScroll="4" :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000">
            <template #item="slotProps">
                <div class="border-1 shadow-3 surface-border surface-0 border-round m-2  p-3">
                    <router-link :to="'products/'+slotProps.data.id">
                    <div class="mb-3">
                        <div class="relative mx-auto ">
                            <img :src="slotProps.data.imageUrl" :alt="slotProps.data.name" class="w-full  h-12rem border-round" />
                                                                                                                                                                                                                    
                                <Tag  :value="((slotProps.data.old_price - slotProps.data.new_price) / slotProps.data.old_price * 100).toFixed(0)+' % OFF'"  class="absolute bg-primary-100 text-green-900 font-bold" style="left:5px; top: 5px"> </Tag>
                               
                            
                            <!-- <div v-else-if="slotProps.data.countInStock >2 && =4">
                                <Tag value="INSTOCK" :severity="success" class="absolute" style="left:5px; top: 5px"/>

                            </div> -->
                            
                    
                        </div>
                    </div>
                    <div class="mb-3 font-medium">
                        <p class="text-center">
                            {{slotProps.data.name.length < 25 ? slotProps.data.name : slotProps.data.name.substring(0,22)+"..." }}
                        </p>
                    </div>
                    </router-link>
                    <div class="flex justify-content-center align-items-center">
                    
                        <div class="mt-0 font-semibold text-xl ">
                            <span class="text-500 text-sm ">
                                <strike>
                                    ${{ slotProps.data.old_price }}
                                </strike>
                            </span>
                            ${{ slotProps.data.new_price }}
                            
                        </div>
                        <!-- <span>
                            <Button icon="pi pi-heart" severity="secondary" outlined />
                            <Button icon="pi pi-shopping-cart" class="ml-2"/>
                        </span> -->
                    </div>
                </div>
            </template>
        </Carousel>
    </div>

     <!-- Latest Products -->
    <div class="card mb-5 ">
        <h2 class="flex justify-content-center pt-4">
                Latest Products
            </h2>
        <DataView :value="latestproductsdata" :layout="layout"  paginator :rows="8">
            <!-- <template #header>
                <div class="flex justify-content-end">
                    <DataViewLayoutOptions  v-model="layout" />
                </div>
            </template> -->

            <template #grid="slotProps">
                <div class="grid grid-nogutter ">
                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 xl:col-3 p-2">
                       <router-link :to="'products/'+item.id">
                        <div class="p-4 border-1 surface-border surface-card border-round flex flex-column">
                            <div class="surface-50 flex justify-content-center border-round p-3">
                                <div class="relative mx-auto">
                                    <img class="border-round w-full h-12rem" :src="`${item.imageUrl}`" :alt="item.name" style="max-width: 300px"/>
                                   <Tag :value="((item.old_price - item.new_price) / item.old_price * 100).toFixed(0)+' % OFF'"  class="absolute bg-primary-100 text-green-900 font-bold" style="left:5px; top: 5px"/>

                                </div>
                            </div>
                            <div class="pt-4">
                                <div class="flex flex-row justify-content-between align-items-start gap-2">
                                    <div>
                                       
                                        <div class="text-lg font-medium text-900 mt-1">{{ item.name.length < 25 ? item.name : item.name.substring(0,25)+"..." }}</div>
                                    </div>
                                    <div class="surface-100 p-1" style="border-radius: 30px">
                                        <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                            <span class="text-900 font-medium text-sm">{{ (item.averageRating).toFixed(0) }}</span>
                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                        </div>
                                    </div>
                                </div>
                                 <div class="mt-0 font-semibold text-xl mt-3">
                                        <span class="text-500 text-sm ">
                                            <strike>
                                                ${{ item.old_price }}
                                            </strike>
                                        </span>
                                        ${{ item.new_price }}
                                        
                                    </div>
                                <!-- <div class="flex flex-column gap-4 mt-4">
                                     <span class="text-500 text-sm ">
                                            <strike>
                                                ${{ item.old_price }}
                                            </strike>
                                        </span>
                                        ${{ item.new_price }}
                                    <span class="text-2xl font-semibold text-900">${{ item.new_price  }}</span>
                                    <div class="flex gap-2">
                                        <Button icon="pi pi-shopping-cart" label="ADD TO CART" :disabled="item.countInStock < 1 " class="flex-auto white-space-nowrap"></Button>
                                       
                                    </div>
                                </div> -->
                            </div>
                        </div>
                       </router-link>
                    </div>
                </div>
            </template>
        </DataView>
    </div>

    <!-- Category slider  -->
    <div class="card surface-0 border-round px-3 ">
        <h2 class="flex justify-content-center pt-4">
                Shop By Categories
        </h2>
        <Carousel :value="categories" :numVisible="4" :numScroll="4" :responsiveOptions="responsiveOptions" circular :autoplayInterval="3000">
            <template #item="slotProps">
                <div class="border-1 shadow-3 surface-border surface-0 border-round m-2  p-3">
                    <router-link :to="{ name: 'categoryCatalog', params: { catTitle: slotProps.data.categoryName }}">
                    <div class="mb-3">
                        <div class="relative mx-auto ">
                            <img :src="slotProps.data.categoryImage" :alt="slotProps.data.categoryName" class="w-full  h-12rem border-round" />
                        </div>
                    </div>
                    <div class="mb-3 font-medium">
                        <p class="text-center">
                            {{slotProps.data.categoryName.length < 25 ? slotProps.data.categoryName : slotProps.data.categoryName.substring(0,22)+"..." }}
                        </p>
                    </div>
                    </router-link>
                    <div class="flex justify-content-center align-items-center">
                    
                        <div class="mt-0 font-semibold text-xl ">
                            <span class="text-500 text-sm ">
                               {{categoryItems(slotProps.data.categoryName)}} (items)
                            </span>
                            
                            
                        </div>
                        <!-- <span>
                            <Button icon="pi pi-heart" severity="secondary" outlined />
                            <Button icon="pi pi-shopping-cart" class="ml-2"/>
                        </span> -->
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useProductsStore } from "../store/fetchProducts"
import { computed, onMounted, ref } from "vue";
import Hero from '../components/Hero.vue'

        const status = ref()
        const store = useProductsStore();
        const { productsdata,latestproductsdata,categories } = storeToRefs(store)
        const { products,latestproducts } = store
        const layout = ref('grid');


        const authentic_product = require('../assets/authentic_product.png')
        const delivery_info = require('../assets/delivery_info.png')
        const return_policy = require('../assets/return_policy.png')
        const safe_payment = require('../assets/safe_payment.png')

        productsdata.value.slice(0).slice(-8)
        latestproductsdata.value.slice(0).slice(-8)

    //   let totalsale = 0;
    //     if(orders.value){
    //         orders.value.map((order) =>( 
                
    //             order.isPaid === true  ?   (totalsale = totalsale + order.totalPrice) : null

    //         ));
    //     }


    const categoryItems = (category) => {

            const cartItems =  productsdata.value.filter( product => product.category === category )
                return cartItems.length
            

  }

   
      

const responsiveOptions = ref([ 
    {
        breakpoint: '1400px',
        numVisible: 2, 
        numScroll: 1
    },
    {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
    },
    {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 3
    },
    {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 3
    }
]);


</script>

<style>

</style>
