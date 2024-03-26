<template>
<div class="container">

    <div class="flex flex-column lg:flex-row" >
    
    <div class="mt-4 lg:mr-4 ">
            <div class="card flex justify-content-start ">
                <ProfileSidebar />
            </div>
    </div>
    <div class="flex-1">

                <div class="card mt-4">
                <Panel header="Account Overview" toggleable>
                    <div class="grid " >
                          
                        <div class="col-12 border-50 md:col-6 lg:col-6  " >
                               <div class="card">
                                <Panel header="ACCOUN DETAILS" >
                                        <p class="uppercase">
                                          <span class="mr-2 ">
                                            {{firstname}}
                                          </span>
                                          <span>
                                            {{lastname}}
                                          </span>
                                        </p>
                                        <p>
                                          {{email}}
                                        </p>
                                        <p>
                                          Registered On: {{moment(regdate).format('LL') }}
                                        </p>
                                       
                                </Panel>
                              </div>

                        </div>
                        <div class="col-12 border-50 md:col-6 lg:col-6  " >
                               <div class="card">
                                <Panel header="ADDRESS" >
                                  
                                        <b>
                                         Your  Shipping:
                                        </b>
                                        <div v-for="address in usermain.billingAddress" :key="address">

                                           <p class="text-500">

                                              {{address.address}}  / {{address.city}} / {{address.country}} / {{address.phonenumber}}
                                           </p>

                                        </div>
                                        <div class="flex justify-content-end items-align-right ">
                                              <router-link to="" class="text-primary-400">
                                                
                                                    Change &nbsp;<i class="pi pi-user-edit"></i>
                                                  
                                              </router-link>
                                        </div>
                                       
                                </Panel>
                              </div>

                        </div>
                      

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
import { computed, onMounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast'
import { useCartItemsStore } from "../store/fetchCartItems"
import router from '@/router';
import ProfileSidebar from "../components/ProfileSidebar.vue"
 

      const store = useAuthStore();
      const { userid,firstname,regdate,email,lastname,usermain,customerOrders } = storeToRefs(store)
      const { GetProfile,LogOut,getAllCustomerOrders } = store

      const Cartstore = useCartItemsStore();
      const { CartItems } = storeToRefs(Cartstore)
      const { getUpdatedUserCartItems,LogOutCart } = Cartstore

       

        GetProfile().then((res)=>{})


      
         onMounted(() => {
            getAllCustomerOrders()
        });
        // getUpdatedUserCartItems(userid.value)


   


</script>

<style>

</style>