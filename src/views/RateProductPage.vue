<template>
<div class="container">

    <div class="flex flex-column lg:flex-row" >
      <b class="text-lg mt-3 p-3 lg:hidden cursor-pointer" @click="goBack" >
             <i class="pi pi-arrow-left text-lg"></i>&nbsp; Rate Product
      </b>
    <div class="mt-4 mr-4 hidden lg:block">
        <div class="card flex justify-content-center">
            <ProfileSidebar />
        </div>
    </div>
    <div class="flex-1">
                        <!--- Check if user has reviewed product before -->
        <div v-if="orderCartItem.reviews">
            <div v-if="alreadyReviewed" class="text-center">
                <div class="card mt-4">
                    <Panel header="Rate Product" toggleable>
                        <div class="card " >
                            <p>
                                Product Already Reviewed
                            </p>
                        </div>
                        
                    </Panel>
                </div>
            </div>
            <div v-else-if="!alreadyReviewed">
                <div class="card mt-4">
                    <Panel header="Rate Product" toggleable>
                        <div class="card " >
                            <p class="font-bold text-base">
                                SELECT THE STAR TO RATE THE PRODUCT
                            </p>
                            <Divider />
                        
                            <div class="flex flex-1 flex-column md:flex-row lg:flex-row align-items-start justify-content-start align-items-center  font-bold m-2  border-round">
                    
                                
                                <div class="flex ">
                                
                                        <Avatar :image="orderCartItem.imageUrl" style="width:100px;height:100px" class="flex bg-contain align-items-center justify-content-center mr-2" size="xlarge" />
                                
                                </div>
                            
                                <div class="flex ">
                                
                                        <div class="">
                                            <router-link :to="'/products/'+orderCartItem.id" >
                                                {{orderCartItem.name}}
                                            </router-link>
                                            
                                            <Rating v-model="rate" :cancel="false" class="mt-2" />
                                        </div>
                            
                                
                                </div>

                            </div> 

                            <div>
                                <p class="font-bold">
                                    Leave Review
                                </p>
                                <Divider />
                                <div class="flex flex-column md:flex-row gap-2 mb-3">
                                    
                                        <div class="flex flex-1 flex-column">
                                            <label for="" class="py-2">Review Title</label>
                                            <InputText id="reviewtitle"  v-model="reviewtitle" size="large"  aria-describedby="username-error" />
                                        
                                        </div>
                                        <div class="flex flex-1 flex-column">
                                            <label for="" class="py-2">Your Name</label>
                                            <InputText id="name"  v-model="name" disabled  size="large" readonly aria-describedby="username-error" />
                                        
                                        </div>
                                    
                                    
                                    </div>
                                <div class="flex flex-column md:flex-row mb-3">
                                    <div>
                                        <label for="name" class="py-2">Detailed Review</label>
                                    <Textarea v-model="detailedreview" rows="2" class="focus:border-gray-500 mt-2 focus:border-1" cols="100" />
                                    </div>
                                    
                                    </div>
                                <div class="flex flex-column md:flex-row mb-3">
                                
                                    <Button class="p-button-label p-2" label="Submit Review" icon="pi pi-check-circle"   @click="ratingSubmit" />
                    
                                    </div>
                            </div>
                        </div>
                        
                    </Panel>
                </div>
            </div>
        
        </div>
        <div v-else>
        <div class="card mt-4">
            <Panel header="Rate Product" toggleable>
                <div class="card " >
                    <p class="font-bold text-base">
                        SELECT THE STAR TO RATE THE PRODUCT
                    </p>
                    <Divider />
                
                    <div class="flex flex-1 flex-column md:flex-row lg:flex-row align-items-start justify-content-start align-items-center  font-bold m-2  border-round">
            
                        
                        <div class="flex ">
                        
                                <Avatar :image="orderCartItem.imageUrl" style="width:100px;height:100px" class="flex bg-contain align-items-center justify-content-center mr-2" size="xlarge" />
                        
                        </div>
                    
                        <div class="flex ">
                        
                                <div class="">
                                    <router-link :to="'/products/'+orderCartItem.id" >
                                        {{orderCartItem.name}}
                                    </router-link>
                                    
                                    <Rating v-model="rate" :cancel="false" class="mt-2" />
                                </div>
                    
                        
                        </div>

                    </div> 

                    <div>
                        <p class="font-bold">
                            Leave Review
                        </p>
                        <Divider />
                        <div class="flex flex-column md:flex-row gap-2 mb-3">
                            
                                <div class="flex flex-1 flex-column">
                                    <label for="" class="py-2">Review Title</label>
                                    <InputText id="reviewtitle"  v-model="reviewtitle" size="large"  aria-describedby="username-error" />
                                
                                </div>
                                <div class="flex flex-1 flex-column">
                                    <label for="" class="py-2">Your Name</label>
                                    <InputText id="name"  v-model="name" disabled  size="large" readonly aria-describedby="username-error" />
                                
                                </div>
                            
                            
                            </div>
                        <div class="flex flex-column md:flex-row mb-3">
                            <div>
                                <label for="name" class="py-2">Detailed Review</label>
                            <Textarea v-model="detailedreview" rows="2" class="focus:border-gray-500 mt-2 focus:border-1" cols="100" />
                            </div>
                            
                            </div>
                        <div class="flex flex-column md:flex-row mb-3">
                        
                            <Button class="p-button-label p-2" label="Submit Review" icon="pi pi-check-circle"   @click="ratingSubmit" />
            
                            </div>
                    </div>
                </div>
                
            </Panel>
        </div>

        </div>
   
    </div>


  </div>

</div>
     <Toast />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from "../store/Auth"
import moment from 'moment';
import { computed, onMounted, ref } from 'vue';
import router from '@/router';
import ProfileSidebar from "../components/ProfileSidebar.vue"
import { useRoute } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const store = useAuthStore();
const { orderCartItem,usermain } = storeToRefs(store)
const { getCustomerOrderCartItem, createProductReview } = store

const toast = useToast();

const route = useRoute(); 
const productid = route.params.id

const rate = ref("")
const reviewtitle = ref("")
const name = ref("")
name.value = usermain.value.firstname


const detailedreview = ref("")


//Check if product is already reviewed
   const alreadyReviewed = computed(() => {

              return orderCartItem.value.reviews.some(
                (review) => review.user === usermain.value._id,
              ); 
          }) 
         

const ratingSubmit = () => {

    if(rate.value == "" || reviewtitle.value == "" || name.value == "" || detailedreview.value == ""){

    toast.add({ severity: 'error', summary: '', detail: 'All fields are required', life: 3000 });

    }else{

        let ratingData = {
            reviewTitle:reviewtitle.value,
            name: name.value,
            averageRating: rate.value,
            comment: detailedreview.value
        }

        

        createProductReview(productid,ratingData).then((res)=>{

            if(res.data.success){

                     toast.add({ severity: 'success', summary: 'Success', detail: 'Product review successfully added', life: 3000 });

                    setTimeout(() => {

                         router.push({
                            path:'/user/reviewratings/'
                        })
                        
                    }, 4000);
   
            }else{

                 toast.add({ severity: 'error', summary: '', detail: 'Product Already reviewed', life: 3000 });
            }
        })

    }

}

getCustomerOrderCartItem(productid)

 onMounted(() => {
    
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