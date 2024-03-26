<template>
<div class="container">

    <div class="flex flex-column lg:flex-row" >
      <b class="text-lg mt-3 p-3 lg:hidden cursor-pointer" @click="goBack" >
         
             <i class="pi pi-arrow-left text-lg"></i>&nbsp; Pending Reviews
          
      </b>
    <div class="mt-4 mr-4 hidden lg:block">
            <div class="card flex justify-content-center">
                 <ProfileSidebar />
             </div>
    </div>
    <div class="flex-1">

                <div class="card mt-4">
                <Panel header="Pending Reviews" toggleable>
                    <div class="card ">
                        <DataView :value="customerPaidOrders"  paginator :rows="5">
                           
                            <template #list="slotProps">
                                <div class="grid grid-nogutter">
                                    <div v-for="(item, index) in slotProps.items" :key="index" class="col-12">
                                        
                                        <div v-for="cartitem in item.cartItems" :key="cartitem._id">
                                               
                                                <div class="flex flex-column sm:flex-row sm:align-items-center p-4 gap-3" :class="{ 'border-top-1 surface-border': index !== 0 }">
                                                <div class="md:w-6rem relative">
                                                    <img class="block xl:block mx-auto border-round w-full" :src="cartitem.imageUrl" :alt="cartitem.name" />
                                                    
                                                </div>
                                                <div class="flex flex-column md:flex-row justify-content-between md:align-items-center flex-1 gap-4">
                                                    <div class="flex flex-row md:flex-column justify-content-between align-items-start gap-2">
                                                        <div>
                                                            <div class="text-lg font-medium text-900 mt-2">{{ cartitem.name }} </div>
                                                            <span class="font-medium text-secondary text-sm">  Order {{ item._id }} </span>
                                                            <div class="mt-2" v-if="item.isPaid">
                                                             <Button  rounded severity="secondary" >
                                                                on {{moment(item.paymentResult.update_time).format('LLL') }}
                                                            </Button>
                                                           </div>
                                                            <div class="mt-2" v-else>
                                                             <Button  rounded severity="secondary" >
                                                                on {{moment(item.createdAt).format("MMM Do YY") }}
                                                            </Button>
                                                           </div>
                                                        </div>
                                                           
                                                    </div>
                                                 
                                                           
                                                    <div class="flex flex-column md:align-items-end gap-5">
                                                   
                                                       <router-link :to='`/user/reviewratings/detail/${cartitem._id}`' >
                                                         <span class="text-sm font-semibold text-900">RATE THIS PRODUCT</span>
                                                       </router-link>
                                                     
                                                         
                                                       
                                                    </div>
                                                </div>
                                            </div>
                                         </div>
                                        
                                    </div>
                                </div>
                            </template>
                        </DataView>
                    </div>
                </Panel>
            </div>
    </div>


  </div>

</div>
   
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from "../store/Auth"
import moment from 'moment';
import { onMounted, ref } from 'vue';
import router from '@/router';
import ProfileSidebar from "../components/ProfileSidebar.vue"
import { FilterMatchMode } from 'primevue/api';

const store = useAuthStore();
const { customerPaidOrders } = storeToRefs(store)
const { getAllPaidCustomerOrders } = store



 onMounted(() => {
    getAllPaidCustomerOrders()
});

const goBack = () =>{
     router.go(-1)
}

   
           
   


</script>

<style scoped>
  .p-button {
    
    padding: 8px;
    font-size: 12px;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s;
    border-radius: 6px;
  }
</style>