<template>
   <div class="card mt-5">
       <form @submit.prevent="onSubmit">
             <Fieldset legend="User Registration">
                <div class="card flex justify-content-center ">
                <div>
                    <div class="flex flex-column md:flex-row gap-2 mb-3">
                    
                        <div class="flex flex-column">
                            <label for="" class="py-1">First Name</label>
                            <InputText id="fname"  v-model="fname" size="large"  aria-describedby="firstname-error" />
                           
                        </div>
                        <div class="flex flex-column">
                            <label for="name" class="py-1">Last Name</label>
                            <InputText id="lname" v-model="lname" size="large"  />
                        </div>
                    
                    </div>
                <div class="flex flex-column gap-2">
                    <label for="email" class="py-1">Email</label>
                    <InputText id="email" type="email" v-model="email" size="large"  />
                    
                </div>  
                <div class="flex flex-column gap-2">
                    <label for="password" class="pt-2">Password</label>
                    <Password id="password" :feedback="false" toggleMask  v-model="password" size="large" class="_pass" /> 
                </div>  
                <div class="flex flex-column gap-2">
                    <label for="password" class="pt-2">Confirm Password</label>
                    <Password id="cpassword" :feedback="false" toggleMask v-model="confirm_password" size="large"  />
                    
                </div>  
                <p>
                    Already have an account <router-link to="/user/login"> Login</router-link>
                </p>
                <div class="flex flex-column gap-2 mt-3">
                    <Button type="submit" label="Register" />  
                </div>
                </div>

            </div>
            </Fieldset>
       </form>
       
    </div>
    <Toast />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from "../store/Auth"
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import router from '@/router';


 const store = useAuthStore();
 const { status, error } = storeToRefs(store)
 const { UserRegister } = store

const fname = ref('');
const lname = ref('');
const email = ref('');
const password = ref(''); 
const confirm_password = ref('');


const toast = useToast();

 

const onSubmit = () => {
 

    if(fname.value == "") {
        
       toast.add({ severity: 'error', summary: 'Error', detail: 'First name is required', life: 6000 });
        
    }else if(lname.value == "") {
        
       toast.add({ severity: 'error', summary: 'Error', detail: 'Last name is required', life: 6000 });
        
    
    }else if(email.value == "") {
        
       toast.add({ severity: 'error', summary: 'Error', detail: 'Email is required', life: 6000 });
        
    
    }else if(password.value == "" ) {
        
       toast.add({ severity: 'error', summary: 'Error', detail: 'Password is required  ', life: 6000 });
        
    
    }else if(confirm_password.value == ""){

        toast.add({ severity: 'error', summary: 'Error', detail: 'Confirm password is required  ', life: 6000 });
        
    }
    
    else if(confirm_password.value !== password.value ) {
        
       toast.add({ severity: 'error', summary: 'Error', detail: 'Confirm password do not match', life: 6000 });
        
    }
    
    else{

        let userData = {
            firstname: fname.value, 
            lastname:lname.value,
            email:email.value,
            password:password.value,
            confirm_password:confirm_password.value
        };

       
        UserRegister(userData).then((result)=>{

                // console.log(error.value)

                if(result.data.success){ 

                    toast.add({ severity: 'success', summary: 'Success', detail: 'User successfully registered', life: 2000 });
        

                    setTimeout(() => {

                         router.push({
                              name: "LoginPage",
                             
                          })
                        
                    }, 3000);

                    
                }
                
                
        }).catch((err)=>{

             if(error.value){  

                        //  console.log(result.data)
                       
                         toast.add({ severity: 'error', summary: error.value, life: 3000 });
                    }

            
        })

    }
};

//  const registerUser = () =>{

//     alert(username.value)
//  }


</script>

<style>

.p-inputtext{
    padding: 0.9375rem 0.9375rem;
    font-size: 1.25rem;
    width:100%;
}
</style>