<template>
  <div class="card mt-5">
     
        <form @submit.prevent="onSubmit">
            
            <Fieldset legend="Login">
                 <div class="">
                    <ProgressBar mode="indeterminate" style="height: 6px" v-if="loadingdata" class="mb-4" ></ProgressBar>
                 </div>
            <div class="card flex justify-content-center ">
            <div>
                <div class="flex flex-column gap-2 mb-3">
                <label for="username">Email</label>
                <InputText id="email" class="outline-none"  type="email" v-model="email" size="large" aria-describedby="username-help" />
                
            </div> 
            <div class="flex flex-column gap-2">
                <label for="password">Password</label>
                <Password id="password" class="outline-none" :feedback="false" toggleMask  v-model="password" size="large" aria-describedby="password-help" />
                 
            </div>
            <p>
                Don't have an account <router-link to="/user/register/account"> Register</router-link>
            </p>
             <div v-if="loadingdata">
                     <div class="flex flex-column gap-2 mt-3" >
                        <Button type="submit" label="Login" disabled/>  
                    </div>
                </div>
                <div v-else>
                     <div class="flex flex-column gap-2 mt-3" >
                        <Button type="submit" label="Login" />  
                    </div>
                </div>
                
            </div>

        </div>
        </Fieldset>
        </form>
     
        
    </div>
    
</template>

<script>
import { storeToRefs } from 'pinia';
import { useAuthStore } from "../store/Auth"
import { useCartItemsStore } from "../store/fetchCartItems"
import { onMounted, onUnmounted, ref } from 'vue';
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router';
export default {

    setup(){

        const email = ref('')
        const password = ref('')
        const toast = useToast();
        const router = useRouter();

        const loadingdata = ref(false)
        const store = useAuthStore();
        const { token,usermain,userid,error } = storeToRefs(store)
        const { authUser,updateUserCartItems } = store

        const cartStore = useCartItemsStore();
        const { CartItems } = storeToRefs(cartStore)
        const { getUpdatedUserCartItems } = cartStore
      
       

       
        onUnmounted(()=>{
           
            updateUserCartItems(CartItems.value,usermain.value._id)

           
            setTimeout(()=>{
                 getUpdatedUserCartItems(usermain.value._id)
            },2000)
        }) 
   

           

     
        
        
        

    const onSubmit = () => {

        

        if(email.value === "" ){
        
         toast.add({ severity: 'error', summary: 'Email is required', detail: '', life: 6000 });
        
                // resetForm();
            }
            else if(password.value === "" ) {
                
                toast.add({ severity: 'error', summary: 'Password is required',detail: '', life: 5000 });
                // resetForm();
            }else{

                 loadingdata.value = true
                    //    isLoggedIn()
                authUser(email.value,password.value)
                .then(result =>{
                    if(result.data.success){

                                toast.add({ severity: 'success', summary: 'User successfully logged in', detail: '', life: 1000 });
                          
                                 loadingdata.value = false
                                //Search for redirect path
                                let searchParams = new URLSearchParams(window.location.search);
                                setTimeout(() => {


                                    if (searchParams.has("redirect")) {

                                         router.push({ path: `${searchParams.get("redirect")}` });

                                    } else {
                                        
                                        router.push({ name: "Profile" });
                                        
                                        }

                                    
                                    // router.push({
                                    // name: "Profile",
                                    
                                    // })

                                    // router.go(0)

                                }, 2000) 
                    }else{  
                         loadingdata.value = false
                        
                         toast.add({ severity: 'error', summary: result.data.msg, life: 5000 });
                    }
                    
                  
                }).catch( err =>{

                    if(error.value){  
                       loadingdata.value = false
                        //  console.log(result.data)
                       
                         toast.add({ severity: 'error', detail: error.value, life: 3000 });
                    }

               
                   
                })
            }
            

        

                
                

            
        };

        
            return{
                onSubmit,email,password,toast,token,loadingdata
            }
    }
}
</script>

<style>

</style>
