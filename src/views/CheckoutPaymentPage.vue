<template>
<div class="container">
    <h2>Order Payment</h2>
  <div class="flex flex-column lg:flex-row" >
    
       <div class="flex-1">

        <div class="card flex justify-content-start  gap-3">
        <Button type="button" label="Order" icon="pi pi-box" class="text-color " style="backgroundColor: var(--highlight-bg)"  />
        <Button type="button" label="Payment" icon="pi pi-wallet" class="text-color " style="backgroundColor: var(--highlight-bg)"  />
      
      </div>
       <div class="card mt-4">
        
        <Panel header="Customer Order Details" toggleable> 
             <div >

                     <p class="uppercase">
                      <span class="mr-2 ">
                        {{Customer_shippingAddress.firstname}}
                      </span>
                      <span>
                        {{Customer_shippingAddress.lastname}}
                      </span>
                    </p>
                    <p>
                       {{Customer_shippingAddress.email}}
                    </p>
                    <Divider />
                    <b>
                      Shipping:
                    </b>
                    <p class="text-500">
                        {{Customer_shippingAddress.address}}  / {{Customer_shippingAddress.city}} / {{Customer_shippingAddress.country}} / {{Customer_shippingAddress.phonenumber}}
                    </p>

                    
                      <div v-if="Customer_order.isPaid">
                            <Button label="" severity="primary" raised  outlined >
                                Paid on {{moment(Customer_order.paidAt).calendar() }}
                            </Button>
                      </div>
                      <div v-else>
                          <Button label="" severity="warning" raised  outlined >
                                Not Paid
                            </Button>
                      </div>
                  
                    <Divider />
                       <b >
                        Delivery Status:
                      </b>
                     <div v-if="Customer_order.isDelivered">
                            <Button label="" severity="primary" raised  outlined >
                                Delivered on {{moment(Customer_order.deliveredAt).calendar() }}
                            </Button>
                      </div>
                      <div v-else class="mt-3">
                          
                            <Button label="" severity="danger"  raised>
                              Not Delivered
                            </Button>
                      </div>

                     <p>
                       
                     </p>

            </div>
          
                
        </Panel>
    </div>

          <div class="card mt-4">
        <Panel header="Your Order" toggleable>
            <div class="grid " >
                <div class="col-12 border-50 md:col-6 lg:col-6 border-1 border-round " v-for="product in Customer_order.cartItems" :key="product.id">

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
                <div class="flex align-items-center">
                    <RadioButton v-model="Customer_order.paymentMethod"  name="dynamic" :value="Customer_order.paymentMethod" />
                    <label  class="ml-2">{{ Customer_order.paymentMethod }}</label>
                </div>
            </div>
         </div>
      </div>
      
       <div class="surface-0 border-round px-3 py-3 lg:mx-3">
             <b class="">
               ORDER SUMMARY
            </b>
           <div class="flex-column mx-2 ">
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="text-500">
                  SubTotal
                </p>
                <p class="" v-if="SubtotalPrice">
                  
                  ${{ SubtotalPrice.toFixed(2) }}
                </p>
              </div>
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="text-500">
                  Tax
                </p>
                <p class="">
                  ${{Customer_order.taxPrice}}
                </p>
              </div>
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="text-500">
                  Shipping
                </p>
                <p class="">
                  ${{Customer_order.shippingPrice}}
                </p>
              </div>
              <Divider />
              <div class="flex align-items-between justify-content-between  font-bold  border-round">
                <p class="">
                  Total
                </p>
                <p class="" v-if="Customer_order.totalPrice">
                  ${{ Customer_order.totalPrice.toFixed(2) }}
                </p>
              </div>
              <div class="flex flex-wrap justify-content-start  gap-3 " >
                <div v-if="Customer_order.paymentMethod === 'Paypal' && !Customer_order.isPaid">
                  <div id="paypal-button-container"></div>
                </div>
                <div v-else-if="Customer_order.paymentMethod === 'Paystack' && !Customer_order.isPaid">
                    
                      <div class="flex flex-column">
                              <paystack
                            buttonClass="button-class"
                            buttonText="Make Payment"
                            :publicKey="`${publicKeyPaystack}`"
                            :email="Customer_order.shippingAddress.email"
                            :amount="Customer_order.totalPrice *100"
                            :currency="GHS"
                            :reference="reference"
                            :onSuccess="onSuccessfulPayment"
                            :onCanel="onCancelledPayment"
                          ></paystack>

                          <img :src="secured_paystack" alt="">
                      </div>
                    
                </div>
                <div v-else-if="Customer_order.paymentMethod === 'Flutterwave' && !Customer_order.isPaid">
                     
                         <p>
                            Flutterwave button goes here
                         </p>
                     
                </div>
                <div v-else>
                     <Button class="p-button-label px-7" label="Order Complete" icon="pi pi-check-circle" disabled />
                     
                </div>

                <!-- <PaypalButtons :reference="reference" /> -->
              </div>
             
          </div>
       </div>
       
    </div>
     
     
  </div>
  </div>

     <Toast />
</template>

<script setup>
import paystack from "vue3-paystack";
import { computed, onMounted, ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useCartItemsStore } from "../store/fetchCartItems"
import { useAuthStore } from "../store/Auth"
import { storeToRefs } from "pinia";
import { useRoute } from 'vue-router'
import moment from 'moment';
import {loadScript} from '@paypal/paypal-js';

const auth = useAuthStore();
const { usermain,token } = storeToRefs(auth)
const { updateUser } = auth

const customerAddress = usermain.value.billingAddress

const store = useCartItemsStore();
const { CartItems,Customer_order,Customer_shippingAddress,client_id } = storeToRefs(store)
const { customerOrder,getCustomerOrder,payOrder } = store

const route = useRoute();  
const orderid = route.params.id
const toast = useToast()

const publicKeyPaystack = ref('')
publicKeyPaystack.value = client_id.value.clientID_paystack;


const selectedPaymentMethod = ref('');  
selectedPaymentMethod.value =  Customer_order.value.paymentMethod



const secured_paystack = require('../assets/secured-paystack.png')


getCustomerOrder(token.value,orderid)

onMounted(async() => {

      try {
            const paypal = await loadScript({
                'client-id': `${client_id.value.clientID_paypal}`
            });

            await paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                // e.g reference.price
                                value: `${Customer_order.value.totalPrice}`,
                            },
                        }],
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(orderData) {
                        // Successful capture!
                        // e.g. Inertia.post(route('order.update', reference.orderId)

                        toast.add({ severity: 'success', summary: 'Success', detail: 'Order successfully paid', life: 4000 });

                          payOrder(orderid,orderData)

                    });
                },
                style: {
                    // Adapt to your needs
                    layout: 'vertical',
                    color: 'gold',
                    shape: 'rect',
                    label: 'paypal',
                },
                // The following is optional and you can
                // limit the buttons to those you want to
                // provide
                fundingSource: paypal.FUNDING.PAYPAL,
            }).render('#paypal-button-container');
        } catch (error) {
            // Add proper error handling
            console.error(error);
        }
  

          
    
});

const checkoutbtn = () =>{

     
    
       
    }

  const SubtotalPrice = computed(() => {
              if(Customer_order.value.cartItems){

                    return Customer_order.value.cartItems.reduce(
                      (sum, item) => sum + (Number(item.new_price) * Number(item.quantity)),
                      0,
                    );
              }
        })
  




//PAYSTACK CALLBACK
  const reference = computed(() => {

        let text = "";
        let randomRef = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 15; i++ )
          text += characters.charAt(Math.floor(Math.random() * characters.length));
        return randomRef;
        })
//PAYSTACK CALLBACK
    const  onSuccessfulPayment = (response) =>{
      let paymentResult = {
         id:response.trxref,
         status:"COMPLETED",
         update_time:moment().format(),
         email_address:Customer_shippingAddress.value.email
      }
      toast.add({ severity: 'success', summary: 'Success', detail: 'Order successfully paid', life: 4000 });
      payOrder(orderid,paymentResult)

    }
   const  onCancelledPayment = () => {
      toast.add({ severity: 'error', summary: 'Error', detail: 'Payment Cancelled', life: 4000 });
    }

</script>

<style>
.button-class{
  color: #ffffff;
    background: #10b981;
    border: 1px solid #10b981;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, outline-color 0.2s;
    border-radius: 6px;
    outline-color: transparent;
    display: inline-flex; 
    cursor: pointer;
    user-select: none;
    align-items: center;
    vertical-align: bottom;
    text-align: center;
    overflow: hidden;
    position: relative;
    padding-left: 4rem !important;
  padding-right: 4rem !important;
}
</style>