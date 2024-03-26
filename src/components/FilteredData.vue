<template>
  
  <div class="mt-4 border-round surface-0 p-3 flex flex-column flex-1 " >
                     <div class="card w-full" >
                        <DataView  dataKey="_id" filterDisplay="row" :value="products"   :sortOrder="sortOrder" :sortField="sortField" :layout="layout" paginator :rows="6" >
                            <template #header>
                                <div class="flex  md:flex-row justify-content-between gap-3 align-content-center items-align-center mb-3">
                                    <div>
                                          <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)" />
                                     
                                    </div>
                                   <div>
                                        <DataViewLayoutOptions v-model="layout" />
                                     </div>
                                </div>
                                    <IconField iconPosition="right" >
                                        <InputIcon >
                                            <i class="pi pi-search pr-2" />
                                        </InputIcon>
                                        <InputText class="p-2" v-model="searchProducts" placeholder="Keyword Search" @change="changeSearchFtn"/>
                                    </IconField>
                              
                                     
                            </template>
                            <template #empty> 
                                <div class="mt-4 flex flex-column align-items-center  text-center">
                                    <img :src="require('../assets/empty-cart.svg')" alt="">

                                    <!-- <img :src="emptycart" alt="" width="200"> -->
                                    <b class="mt-3" v-if="searchProducts">
                                        No result found for query "{{searchProducts}}"
                                    </b>
                                    <b class="mt-3" v-else-if="productSearchKeyword">
                                        No result found for query "{{productSearchKeyword}}"
                                    </b>
                                    <b class="mt-3" v-else>
                                        No result found for query 
                                    </b>
                                    
                                    <p class="font-light">
                                        - Check your spelling for typing errors
                                    </p>
                                    <p class="font-light">
                                        - Try searching with short and simple keywords<br>
                                    </p>
                                    <p class="font-light">
                                        - Try searching more general terms - you can then filter the search results
                                    </p>

                                    

                                    <!-- <router-link to="/">
                                        <Button label="Go To HOMEPAGE" class="mt-3"/>
                                    </router-link> -->

                                </div>
                            </template>
                            

                            <template #list="slotProps">
                                <div class="grid grid-nogutter">
                                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                                        <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                                            <div class="md:w-10rem relative">
                                                <router-link :to="'/products/'+item.id">
                                                <img class="border-round w-full h-12rem" :src="`${item.imageUrl}`" :alt="item.name" style="max-width: 300px"/>
                                                 <Tag :value="((item.old_price - item.new_price) / item.old_price * 100).toFixed(0)+' % OFF'"  class="absolute bg-primary-100 text-green-900 font-bold" style="left:5px; top: 5px"/>
                                                </router-link>
                                            </div>
                                            <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                                                 <router-link :to="'/products/'+item.id">
                                                <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                                                    <div>
                                                        <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                                         <p>
                                                        Availability: 
                                                        <span class="text-primary-700" v-if="item.countInStock > 0"> In Stock </span>
                                                        <span class="text-primary-700" v-else> <Tag severity="warning" value="Sold Out"></Tag> </span>
                                                        </p>
                                                        <div class="text-lg font-medium text-900 mt-2">{{ item.name }}</div>
                                                    </div>
                                                    <div class="surface-100 p-1" style="border-radius: 30px">
                                                        <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                                            <span class="text-900 font-medium text-sm">{{ item.averageRating }}</span>
                                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                </router-link>
                                                <div class="flex flex-column md:align-items-end gap-5">
                                                    <div>
                                                        <span class="text-2xl font-semibold text-900">    
                                                        <strike>
                                                            ${{ item.old_price }}
                                                        </strike>
                                                        </span>
                                                        <span class="text-2xl font-semibold text-900">  ${{ item.new_price }}</span>
                                                    </div>
                                                    <!-- <div class="flex flex-row-reverse md:flex-row gap-2">
                                                        <Button icon="pi pi-heart" outlined></Button>
                                                        <Button icon="pi pi-shopping-cart"  @click="addToCart(item.id)" label="ADD TO CART" :disabled="item.inventoryStatus === 'OUTOFSTOCK'" class="flex-auto md:flex-initial white-space-nowrap"></Button>
                                                    </div> -->
                                                       <div class="flex flex-row-reverse md:flex-row gap-2 "  v-if="item.countInStock > 0">
                                                        <Button icon="pi pi-heart" outlined></Button>
                                                        <Button  @click="addToCart(item.id)" icon="pi pi-shopping-cart" label="ADD TO CART" :disabled="!ItemIsInCart === 'OUTOFSTOCK'" class="flex-auto md:flex-initial white-space-nowrap"></Button>
                                                        
                                                    </div>
                                                     <div class="flex flex-row-reverse md:flex-row gap-2 " v-else >
                                                        <Button icon="pi pi-heart" outlined></Button>
                                                        <Button  @click="addToCart(item.id)" icon="pi pi-shopping-cart" label="ADD TO CART" disabled  class="flex-auto md:flex-initial white-space-nowrap"></Button>
                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <template #grid="slotProps">
                                <div class="grid grid-nogutter">
                                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12 sm:col-6 md:col-4 xl:col-4 p-2">
                                            <div @mouseover="mouseOver(item.id)" @mouseleave="action = null" class="p-4 border-1 shadow-6 surface-border surface-card border-round flex flex-column">
                                            <div class="surface-50  flex justify-content-center border-round p-3">
                                                 <router-link :to="'/products/'+item.id">
                                                    <div class="relative mx-auto">
                                                       <img class="border-round w-full h-12rem" :src="`${item.imageUrl}`" :alt="item.name" style="max-width: 300px"/>
                                                      <Tag :value="((item.old_price - item.new_price) / item.old_price * 100).toFixed(0)+' % OFF'"  class="absolute bg-primary-100 text-green-900 font-bold" style="left:5px; top: 5px"/>

                                                    </div>
                                                </router-link>
                                            </div>
                                            <div class="pt-4" >
                                                <router-link :to="'/products/'+item.id">
                                                <div class="flex flex-row justify-content-between align-items-start gap-2">
                                                    <div>
                                                        <span class="font-medium text-secondary text-sm">{{ item.category }}</span>
                                                         <p>
                                                        Availability: 
                                                        <span class="text-primary-700" v-if="item.countInStock > 0"> In Stock </span>
                                                        <span class="text-primary-700" v-else> <Tag severity="warning" value="Sold Out"></Tag> </span>
                                                        </p>
                                                        <div class="text-lg font-medium text-900 mt-1">
                                                            <!-- {{ item.name }} -->
                                                            {{item.name.length < 25 ? item.name : item.name.substring(0,20)+"..." }}
                                                            </div>
                                                    </div>
                                                    <div class="surface-100 p-1" style="border-radius: 30px">
                                                        <div class="surface-0 flex align-items-center gap-2 justify-content-center py-1 px-2" style="border-radius: 30px; box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)">
                                                            <span class="text-900 font-medium text-sm">{{ (item.averageRating).toFixed(0) }}</span>
                                                            <i class="pi pi-star-fill text-yellow-500"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                </router-link>
                                                <div class="flex flex-column gap-4 mt-4 " >

                                                    <div>
                                                        <span class="text-2xl font-semibold text-900">    
                                                        <strike>
                                                            ${{ item.old_price }}
                                                        </strike>
                                                        </span>
                                                        <span class="text-2xl font-semibold text-900">  ${{ item.new_price }}</span>
                                                    </div>
                                                    
                                                     <div class="flex gap-2 "  v-if="item.countInStock > 0">
                                                        <Button v-show="action === item.id" @click="addToCart(item.id)" icon="pi pi-shopping-cart" label="ADD TO CART" :disabled="!ItemIsInCart === 'OUTOFSTOCK'" class="flex-auto white-space-nowrap "></Button>
                                                        
                                                    </div>
                                                     <div class="flex gap-2 " v-else >
                                                        <Button v-show="action === item.id" @click="addToCart(item.id)" icon="pi pi-shopping-cart" label="ADD TO CART" disabled  class="flex-auto white-space-nowrap "></Button>
                                                        
                                                    </div>
                                                 
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </template>
                        </DataView>
                    </div>
                   
  </div>
 <Toast />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from "vue";
import { useToast } from 'primevue/usetoast'
import { useCartItemsStore } from "../store/fetchCartItems"
import { useProductStore } from "../store/fetchProduct"
import { useAuthStore } from "../store/Auth"

const props = defineProps({
 products: {
    type: Array,
    default: null
  },
 productSearchKeyword: {
    type: String,
    default: null
  },
})

const toast = useToast();

//CartITems store
const store = useCartItemsStore();
const { CartItems,productaddedtoast,outofstocktoast } = storeToRefs(store)
const { addToCartFnt } = store



//Authentication store
const auth = useAuthStore();
const { userid } = storeToRefs(auth)

 //product store
const storeProduct = useProductStore();
const { productdata, category, pname} = storeToRefs(storeProduct)
const { product } = storeProduct

const action = ref(null);


 const ItemIsInCart = computed(() => {

              return CartItems.value.some(
                (item) => item.id === productdata.value.id,
              ); 
          }) 

  const addToCart = (productid) =>{

         
            product(productid) 


         if(outofstocktoast.value){

            toast.add({ severity: 'error', summary:'',detail:"Product is out of stock", life: 5000 });

         }
          if(productaddedtoast.value){
            toast.add({ severity: 'success', summary: 'Success', detail: 'Product added to cart', life: 6000 });
          }
        
          setTimeout(() => {

            addToCartFnt(productdata.value,productid,userid.value)
            
          }, 2000);
          

      }


const mouseOver = (id) =>{
    action.value = id
    // showbtn.value = !showbtn.value
}

const layout = ref('grid');
const searchProducts = ref(null)

const emit = defineEmits(['update:SearchFilter'])

// Watch for search  change
    watch(() => searchProducts.value, () => {
      // Do something here...
      if(searchProducts.value){

          emit('update:SearchFilter', searchProducts.value)
      }
         
    // Optionally you can set immediate: true config for the watcher to run on init
    //}, { immediate: true });
    });





const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
    {label: 'Price High to Low', value: '!new_price'},
    {label: 'Price Low to High', value: 'new_price'},
]);
const onSortChange = (event) => {
    const value = event.value.value;
    const sortValue = event.value;

    if (value.indexOf('!') === 0) {
        sortOrder.value = -1;
        sortField.value = value.substring(1, value.length);
        sortKey.value = sortValue;
    }
    else {
        sortOrder.value = 1;
        sortField.value = value;
        sortKey.value = sortValue;
    }
};

const getSeverity = (product) => {
    switch (product.inventoryStatus) {
        case 'INSTOCK':
            return 'success';

        case 'LOWSTOCK':
            return 'warning';

        case 'OUTOFSTOCK':
            return 'danger';

        default:
            return null;
    }
}
</script>

<style>
.btn-add { display: none; }
</style>