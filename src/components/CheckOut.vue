<template>

<div class="flex-1">

        <div class="card flex flex-column md:flex-row justify-content-start  gap-1 md:gap-3">
        <Button type="button" label="Cart" icon="pi pi-shopping-cart" class="text-color text-sm" style="backgroundColor: var(--highlight-bg)"  />
        <Button type="button" label="Billing Details" icon="pi pi-box" class="text-color text-sm " style="backgroundColor: var(--highlight-bg)"  />
        <Button type="button" label="Payment" icon="pi pi-wallet" class="text-color text-sm" style="backgroundColor: var(--highlight-bg)"  />
      </div>
       <div class="card mt-4">
        <Panel header="Billing Details" toggleable>
           
            <div v-if="customerAddress.length">
                <div v-for="caddress in customerAddress" :key="caddress.city">
                    <p>
                      <span class="mr-2">
                        {{firstname}}
                      </span>
                      <span>
                        {{lastname}}
                      </span>
                    </p>
                    <p>
                      {{caddress.email}}
                    </p>
                    <p class="text-500">
                        {{caddress.address}}  / {{caddress.city}} / {{caddress.country}} / {{caddress.phonenumber}}
                    </p>
                    <div class="flex justify-content-end items-align-right ">
                          <router-link to="/checkout/address" class="text-primary-400">
                             
                                Change &nbsp;<i class="pi pi-user-edit"></i>
                              
                          </router-link>
                    </div>
                </div>
            </div>
             <div v-else >

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
        </Panel>
    </div>

      <div class="card mt-4">
        <Panel header="Your Order" toggleable>
            <div class="grid " >

                <div class="col-12 border-50 md:col-6 lg:col-6 border-1 border-round " v-for="product in CartItems" :key="product.id">

                        <div class="flex  align-items-start justify-content-start  font-bold   border-round" >     
                        <router-link :to="'/products/'+product.id">
                            <div class="flex ">
                                <div>
                                    <Avatar :image="product.imageUrl" class="flex bg-contain align-items-center justify-content-center mr-2" size="xlarge" />
                                    
                                </div>
                            </div>
                        </router-link>
                        <div>
                            <router-link :to="'/products/'+product.id" class="text-xs">
                                {{product.name.substring(0,120)}}
                            </router-link>
                            <p class="text-xs">
                               <span> QTY: {{product.quantity}}</span> <span class="text-500">Unit Price :  ${{ product.new_price.toFixed(2)}}</span>
                            </p>
                            <p class="text-sm">
                                
                            </p>
                        
                        </div>
                        </div>

                </div>

            </div>

            <div class="flex justify-content-center items-align-center mt-2">

                <router-link :to="'/products/cart'">
                    <b class="text-primary-300 ">
                    MODIFY CART
                    </b>
                </router-link>

            </div>
        </Panel>
    </div>

</div>
<div class="my-5 ">
      <div class="surface-0 border-round px-3 lg:mx-3 py-3 my-3">
          <b class="">
            Payment Method
          </b>
          <div class="card flex justify-content-start mt-3">
            <div class="flex flex-column gap-2">
                <div v-for="category in categories" :key="category.key" class="flex align-items-center">
                    <RadioButton v-model="selectedPaymentMethod" :inputId="category.key" name="dynamic" :value="category.name" />
                    <label :for="category.key" class="ml-2">{{ category.name }}</label>
                </div>

            
            </div>
         </div>
      </div>
       <div class="surface-0 border-round px-3 py-3 lg:mx-3">
             <b class="">
               CART SUMMARY
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
              <div class="flex flex-wrap justify-content-start  gap-3 " v-if="!customerAddress.length">
               <Button class="p-button-label px-7" label="Confirm Order" icon="pi pi-check-circle" @click="checkoutbtn" />
              </div>
              <div class="flex flex-wrap justify-content-start  gap-3 " v-if="customerAddress.length">
               <Button class="p-button-label px-7" label="Confirm Order" icon="pi pi-check-circle" @click="checkoutbtnhasAddress" />
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
const { usermain,firstname,lastname } = storeToRefs(auth)
const { updateUser } = auth

const customerAddress = usermain.value.billingAddress
const store = useCartItemsStore();
const { customerOrder } = store

const props = defineProps({
  CartItems: {
    type: Array,
    required: true
  }
});

 const toast = useToast()


const fname = ref('')
const lname = ref('')
const email = ref('')
const phone_number = ref('')
const address = ref('')
const country = ref('')
const city = ref('')

const CartItems = ref(props.CartItems)

const billingAddress = ref([])
billingAddress.value = usermain.value.billingAddress


const checkoutbtnhasAddress = () =>{


for(var i=0 ;i < usermain.value.billingAddress.length; i++){
    
    fname.value = billingAddress.value[i].firstname;
    lname.value = billingAddress.value[i].lastname;
    email.value = billingAddress.value[i].email;
    phone_number.value =usermain.value.billingAddress[i].phonenumber;
    address.value = billingAddress.value[i].address;
    country.value = billingAddress.value[i].country;
    city.value = billingAddress.value[i].city;
}


   let shippingAddress = {
          firstname: fname.value,
          lastname: lname.value,
          email: email.value,
          phonenumber: phone_number.value,
          city: city.value,
          country: country.value,
          address: address.value
      }

      customerOrder(shippingAddress,CartItems.value,grandTotal,selectedPaymentMethod.value,usermain.value._id,shippingPrice,taxPrice).then((res)=>{

             
              if(res.user){
                  
                  updateUser(res.user)
              }

           

                router.push({

                  path: `/order/${res.createOrder._id}/payment`

                })

              
        }).catch((err)=>{
           console.log("error fetching data")
        })



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


        customerOrder(shippingAddress,CartItems.value,grandTotal,selectedPaymentMethod.value,usermain.value._id,shippingPrice,taxPrice).then((res)=>{

             
              if(res.user){
                  
                  updateUser(res.user)
              }

           

                router.push({

                  path: `/order/${res.createOrder._id}/payment`
                  
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

      { name: 'Paypal', key: 'P' },
      { name: 'Paystack', key: 'PS' },
      { name: 'Flutterwave', key: 'FW' },
      
      
  ]);

    



</script>

<style>

</style>