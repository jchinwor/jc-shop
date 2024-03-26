<template>
 <div class="container">

           <div class=" py-5">
            <TabView>
            <TabPanel header="Edit Profile"> 
                  <div class="card flex flex-column md:flex-row justify-content-start">
                                 <div class="flex-1 flex-column gap-2 mb-3 md:mr-3">
                                    <label for="username" >First Name</label>
                                    <InputText id="firstname"   v-model="firstname" class="mt-2" aria-describedby="firstname-help" />
                                
                                </div>
                                <div class="flex-1 flex-column  mb-3 gap-2">
                                    <label for="username">Last Name</label>
                                    <InputText id="lastname"   v-model="lastname" class="mt-2" aria-describedby="username-help" />
                                
                                </div>
                           
                  </div>
                  <div class="card flex flex-column md:flex-row justify-content-start">
                                 <div class="flex-1 flex-column gap-2 mb-3 md:">
                                    <label for="username">Email</label>
                                    <InputText id="username" disabled class="mt-2" v-model="email" aria-describedby="username-help" />
                                
                                </div>   
                </div>

                 <Button icon="pi pi-check" label="Update" @click="Updateprofile"/>
                 
            </TabPanel>
            <TabPanel header="Change Password">
                <div class="card flex flex-column md:flex-row justify-content-start">

                              
                    <div class="flex flex-1 flex-column gap-2 mb-3 md:">
                    <label for="username">Current Password</label>
                    <Password id="username" :feedback="false" toggleMask class="mt-2" v-model="old_password" aria-describedby="username-help" />
                
                    </div>
                    <div class="flex flex-1 flex-column gap-2 mb-3 md:">
                        <label for="username">New Password</label>
                        <Password id="npassword" :feedback="false" toggleMask class="mt-2" v-model="new_password" aria-describedby="username-help" />
                    
                    </div>
                           
                </div>
                  <div class="card flex flex-column md:flex-row justify-content-start">

                    
                        <div class="flex flex-1 flex-column gap-2 mb-3 md:">
                        <label for="username">Confirm New Password</label>
                        <Password id="cpassword"  :feedback="false" toggleMask class=""  v-model="confirm_new_password" aria-describedby="cpassword-help" />
                    
                    </div>
                              
                           
                </div>
                 <Button icon="pi pi-check" label="Submit" @click="Updatepassword"/>
            </TabPanel>
            
        </TabView>
            </div>
 </div>
 <Toast />
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from 'pinia';
import { useAuthStore } from "../store/Auth"
import { useToast } from 'primevue/usetoast'


 const store = useAuthStore();
 const { userid,firstname,email,lastname,error,usermain } = storeToRefs(store);
 const { UpdateUserProfile,UpdateUserPassword } = store;
 const toast = useToast();

 const old_password = ref('');
 const new_password = ref('');
 const confirm_new_password = ref('');

    const Updatepassword = () =>{

         let updatePasswordData = {
            newpassword: new_password.value,
            password: old_password.value
            // _id:userid.value,
        };
        
        if(old_password.value =="" || new_password.value =="" || confirm_new_password.value == ""){

            toast.add({ severity: 'error', summary: 'Error', detail: 'All fields required', life: 3000 });
        }else if(new_password.value != confirm_new_password.value){
            toast.add({ severity: 'error', summary: 'Error', detail: 'New password do not match confirm password', life: 3000 });
        }else{

            UpdateUserPassword(updatePasswordData).then(res=>{

                if(res.data.success){

                     old_password.value = "";
                     new_password.value = "";
                     confirm_new_password.value = "";

                    toast.add({ severity: 'success', summary: 'success', detail: 'Password successfully updated', life: 3000 });
                }
            }).catch((err)=>{

                

                   if(error.value){  

                     old_password.value = "";
                     new_password.value = "";
                     confirm_new_password.value = "";

                        //  console.log(result.data)
                       
                         toast.add({ severity: 'error', summary: error.value, life: 5000 });
                    }
            }) 
        }

    }

    const Updateprofile = () =>{


        let updateData = {
            firstname: firstname.value, 
            lastname: lastname.value, 
            // _id:userid.value,
        };

        if(firstname.value === ""){

            toast.add({ severity: 'error', summary: '', detail: 'First name is required', life: 3000 });

        }else if(lastname.value === ""){

            toast.add({ severity: 'error', summary: '', detail: 'Last name is required', life: 3000 });
        }else{

             UpdateUserProfile(updateData).then(res=>{

                if(res.data.success){

                    toast.add({ severity: 'success', summary: 'success', detail: 'Profile successfully updated', life: 3000 });
                }
            })
        }
        
       
        
    }


</script>

<style>

</style>