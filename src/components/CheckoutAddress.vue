<template>
<div class="container">
    <h2>Edit Billing Address</h2>
  <div class="flex flex-column lg:flex-row" >
    
       <div class="flex-1">

        <div class="card flex justify-content-start  gap-3">
        <Button type="button" label="User" icon="pi pi-user" class="text-color " style="backgroundColor: var(--highlight-bg)"  />
        <Button type="button" label="Edit Address" icon="pi pi-user-edit" class="text-color " style="backgroundColor: var(--highlight-bg)"  />
      
      </div>
       <div class="card mt-4">
        <Panel header="Edit Billing Details" toggleable> 
             <div>

               <div class="flex flex-column md:flex-row gap-2 mb-3">
                    
                        <div class="flex flex-1 flex-column ">
                            <label for="" class="py-2">First Name</label>
                            <InputText id="fname"  v-model="fname" size="large"  aria-describedby="username-error" />
                           
                        </div>
                        <div class="flex flex-1 flex-column">
                            <label for="name" class="py-2">Last Name</label>
                            <InputText id="lname" v-model="lname" size="large"  />
                        </div>
                    
                    </div>
                 <div class="flex flex-column md:flex-row gap-2 mb-3">
                    
                        <div class="flex flex-1 flex-column">
                            <label for="" class="py-2">Email</label>
                            <InputText id="email" type="email" v-model="email" size="large"  aria-describedby="username-error" />
                           
                        </div>
                        <div class="flex flex-1 flex-column">
                            <label for="name" class="py-2">Country</label>
                            <InputText id="country" v-model="country" size="large"  />
                        </div>
                    
                    </div>
                 <div class="flex flex-column md:flex-row gap-2 mb-3">
                    
                        <div class="flex flex-1 flex-column">
                            <label for="" class="py-2">City</label>
                            <InputText id="city"  v-model="city" size="large"  aria-describedby="username-error" />
                           
                        </div>
                        <div class="flex flex-1 flex-column">
                            <label for="" class="py-2">Phone Number</label>
                            <InputText id="phone_number"  v-model="phone_number" size="large"  aria-describedby="username-error" />
                           
                        </div>
                    
                    
                    </div>
                 <div class="flex flex-column md:flex-row mb-3">
                     <div>
                        <label for="name" class="py-2">Address</label>
                       <Textarea v-model="address" rows="2" class="focus:border-gray-500 focus:border-1" cols="100" />
                     </div>
                    
                    </div>
              
            </div>
          <Divider />
                <div class="flex justify-content-end align-content-end">
                    
                       <div class="mr-3 ">
                        
                            <Button label="CANCEL" severity="secondary" @click="goBack"/>
                      
                       </div>
                       <div>
                         <Button class="p-button-label px-4" label="Save" icon="pi pi-check-circle"   @click="checkoutbtnhasAddress" />
                
                       </div>
                </div>
        </Panel>
    </div>



</div>
<div class="my-5 ">
      
       <div class="surface-0 border-round px-3 py-3 lg:mx-3">
             <b class="">
               ORDER SUMMARY
            </b>
           <div class="flex-column mx-2 ">
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="text-500">
                  SubTotal
                </p>
                <p class="">
                  ${{ totalPrice.toFixed(2) }}
                </p>
              </div>
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="text-500">
                  Tax
                </p>
                <p class="">
                  ${{taxPrice}}
                </p>
              </div>
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="text-500">
                  Shipping
                </p>
                <p class="">
                  ${{shippingPrice}}
                </p>
              </div>
              <Divider />
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="">
                  Total
                </p>
                <p class="">
                  ${{ grandTotal }}
                </p>
              </div>
              <div class="flex flex-wrap justify-content-start  gap-3 " >
               
               <Button class="p-button-label px-7" severity="secondary" label="Confirm Order" icon="pi pi-check-circle" disabled />
              </div>
             
          </div>
       </div>
       
    </div>
     
     
  </div>
  </div>

     <Toast />
</template>

<script setup>
import { computed, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useCartItemsStore } from "../store/fetchCartItems"
import { useAuthStore } from "../store/Auth"
import { storeToRefs } from "pinia";
import router from "@/router";

const auth = useAuthStore();
const { usermain } = storeToRefs(auth)
const { updateUser } = auth

const customerAddress = usermain.value.billingAddress

const store = useCartItemsStore();
const { CartItems } = storeToRefs(store)
const { customerOrder } = store



const toast = useToast()


const fname = ref('')
const lname = ref('')
const email = ref('')
const phone_number = ref('')
const address = ref('')
const country = ref('')
const city = ref('')

const billingAddress = ref([])
billingAddress.value = usermain.value.billingAddress


const goBack = () =>{

    router.go(-1)
}


for(var i=0;i<usermain.value.billingAddress.length;i++){
    
    fname.value = billingAddress.value[i].firstname;
    lname.value = billingAddress.value[i].lastname;
    email.value = billingAddress.value[i].email;
    phone_number.value =usermain.value.billingAddress[i].phonenumber;
    address.value = billingAddress.value[i].address;
    country.value = billingAddress.value[i].country;
    city.value = billingAddress.value[i].city;
}






const checkoutbtnhasAddress = () =>{

//    let shippingAddress = {
//           firstname: fname.value,
//           lastname: lname.value,
//           email: email.value,
//           phonenumber: phone_number.value,
//           city: city.value,
//           country: country.value,
//           address: address.value
//       }


    if(fname.value == "" || lname.value == "" || email.value == "" || phone_number.value == "" || address.value == "" || country.value == "" || city.value == ""){
        
        toast.add({ severity: 'error', summary: 'Error', detail: 'All fields are required', life: 4000 });

    }else{
        alert("There is a value for firstname")
    }


}
  

const checkoutbtn = () =>{

    if(fname.value == "" || lname.value == "" || email.value == "" || phone_number.value == "" || address.value == "" || country.value == "" || city.value == ""){
        
        toast.add({ severity: 'error', summary: 'Error', detail: 'All fields are required', life: 4000 });

    }else{


      let shippingAddress = {
          firstname: fname.value,
          lastname: lname.value,
          email: email.value,
          phonenumber: phone_number.value,
          city: city.value,
          country: country.value,
          address: address.value
      }


        UpdateBillingAddress(shippingAddress).then((res)=>{

             
              if(res.user){
                  
                  updateUser(res.user)
              }

           

                router.push({
                  name: "CheckoutPayment"
                })

              
        })
    }

    
   

}

  const totalPrice = computed(() => {

              return CartItems.value.reduce(
                (sum, item) => sum + (Number(item.new_price) * Number(item.quantity)),
                0,
              );

        })

 const addDecimals = (num) =>{
    return (Math.round(num * 100) / 100).toFixed(2)
 } 
 
 const shippingPrice = addDecimals(totalPrice.value > 100 ? 10 : 100)
 const taxPrice = addDecimals(Number((0.15 * totalPrice.value).toFixed(2)))

 const grandTotal = (Number(totalPrice.value) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)


  const selectedPaymentMethod = ref('Paypal');  
  const categories = ref([
      { name: 'Paystack', key: 'PS' },
      { name: 'Flutterwave', key: 'FW' },
      { name: 'Paypal', key: 'P' },
      
  ]);

    



</script>

<style>

</style>