<template>

<!-- For StickyNav Observer -->
  <div ref="target"></div>

<!-- Desktop Navbar -->
   <div id="nav" :class="{ sticking }"   class="hidden sticky-menu lg:block surface-0 ">
       <div   class="flex  justify-content-between  align-items-center py-2 container w-full ">
        
       <div class="flex ">
              <router-link to="/" >
                     <img src="../../src/assets/dark.png" alt="" width="90">
              </router-link>
       
       </div>
              <div class="flex align-items-center flex-wrap">
                 
                     <AutoComplete v-on:keydown="isLetter($event)"  v-model="selectedProduct" class="w-30rem mr-1 h-auto" optionLabel="name" :suggestions="filteredProducts" @complete="search">
                     <template #option="slotProps">
                           
                                   <!-- <router-link :to="'/shop/'+slotProps.option.name">

                                   
                                    </router-link> -->
                                     <div class="flex align-options-center" >
                                          <img :alt="slotProps.option.name" :src="slotProps.option.imageUrl" :class="` mr-2`" style="width: 18px" />
                                          
                                          <div>{{ slotProps.option.name }}</div>
                                        </div>
                                  
                                      
                                 
                            
                     </template>
                     </AutoComplete>
                            <!-- <InputText placeholder="Search" type="text" class="w-30rem mr-1 h-3rem" /> -->
                     <Button label="SEARCH" @click="searchBTN" class="mr-4 raised" />
                     
              </div>
       <div class="flex ">
       
              <div class="flex justify-content-center align-items-center">
                     
                     <div>
                            <SplitButton :model="items"  severity="secondary" text class="mr-1" menuButtonIcon="pi pi-angle-down">
                            
                                   <span class="flex align-items-center  font-bold">
                                          <i class="pi pi-user pr-2"></i>
                                          <span v-if="token">
                                                 Hi, {{firstname}}
                                          </span>
                                          <span v-else>
                                                 Account
                                          </span>
                                   </span>
                            </SplitButton>
                     </div>
              
                     <router-link to="/products/cart" class="surface-0 border-round">
                     <Button type="button" label="Cart" icon="pi pi-shopping-cart" text :badge="totalCartItems || '0'" badgeClass="p-badge-danger " badgeSeverity="contrast" outlined />

                     </router-link>
                     
              </div>
       </div>

         </div>
    
    </div>


<!---Mobile Menu--->
<div :class="{ sticking }"  class="lg:hidden surface-0 sticky-menu ">
       <div class="flex flex-column">

              <div class="flex justify-content-between w-full p-3 container">
                     
                     <Button icon="pi pi-bars" @click="visible = true" />
                     <div class="">
                         <Sidebar v-model:visible="visible">
                            <template #container="{ closeCallback }">
                                   <div class="flex flex-column h-full">
                                   <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                                          <span class="inline-flex align-items-center gap-2">
                                                 <router-link to="/" >
                                                        <img src="../../src/assets/dark.png" alt="" width="70">
                                                 </router-link>
                                                 <span class="font-semibold text-2xl text-primary"></span>
                                          </span>
                                          <span>
                                                 <Button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined class="h-2rem w-2rem"></Button>
                                          </span>
                                   </div>
                                   <div class="overflow-y-auto">
                                          <ul class="list-none p-3 m-0">
                                                 <li>
                                                 <div
                                                        v-ripple
                                                        v-styleclass="{
                                                        selector: '@next',
                                                        enterClass: 'hidden',
                                                        enterActiveClass: 'slidedown',
                                                        leaveToClass: 'hidden',
                                                        leaveActiveClass: 'slideup'
                                                        }"
                                                        class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
                                                 >
                                                        <span class="font-medium">MY ACCOUNT</span>
                                                        <i class="pi pi-chevron-down"></i>
                                                 </div>
                                                 <ul class="list-none p-0 m-0 overflow-hidden" v-if="token">
                                                        <li>
                                                               <router-link to="/" @click="visible = false" >
                                                                      <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">                                                                            
                                                                                    <i class="pi pi-home mr-2"></i>
                                                                                    <span class="font-medium">Home</span>
                                                                      </a>
                                                               </router-link>
                                                        </li>
                                                        <li>
                                                               <router-link :to="{ name: 'Profile'}" @click="visible = false" >                                                               
                                                                      <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                                             <i class="pi pi-user mr-2"></i>
                                                                                    <span class="font-medium">Profile</span>   
                                                                      </a>
                                                               </router-link>
                                                        </li>
                                                 
                                                        <li>
                                                                 <router-link :to="'/edit/'+firstname+'/profile'" @click="visible = false" >        
                                                                      <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                                             <i class="pi pi-user-edit mr-2"></i>
                                                                                    <span class="font-medium">Settings</span>
                                                                      </a>
                                                               </router-link>
                                                        </li>
                                                        <li>
                                                               <router-link :to="{name: 'userOrder'}" @click="visible = false" >        
                                                                      <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                                             <i class="pi pi-box mr-2"></i>
                                                                                    <span class="font-medium">Orders</span>
                                                                      </a>
                                                                </router-link>
                                                        </li>
                                                        <Divider />
                                                         <li v-if="token">
                                                               <a v-ripple @click="logout" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                               
                                                                      <i class="pi pi-sign-out mr-2"></i>
                                                                      <span class="font-medium">Logout</span>
                                                               </a>
                                                        </li>
                                                 
                                                        
                                                 </ul>
                                                 <ul class="list-none p-0 m-0 overflow-hidden" v-else>
                                                        <li>
                                                                <router-link to="/" @click="visible = false" >
                                                                             <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                                     
                                                                                    <i class="pi pi-home mr-2"></i>
                                                                                    <span class="font-medium">Home</span>                                                               
                                                                              </a>
                                                                </router-link>
                                                        </li>
                                                        <li>
                                                               <router-link to="/user/login" @click="visible = false" >          
                                                                      <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                                             <i class="pi pi-user mr-2"></i>
                                                                             <span class="font-medium">Login</span>
                                                                      </a>
                                                               </router-link>
                                                        </li>
                                                 
                                                        <li>
                                                                <router-link :to="{name: 'RegisterPage'}" @click="visible = false" >
                                                                     
                                                                      <a v-ripple class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                                      <i class="pi pi-users mr-2"></i>
                                                                             <span class="font-medium">Register</span>
                                                                      </a>
                                                               </router-link>
                                                        </li>
                                                        <Divider />
                                                         <li v-if="token">
                                                               <a v-ripple @click="logout" class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                               
                                                                      <i class="pi pi-sign-out mr-2"></i>
                                                                      <span class="font-medium">Logout</span>
                                                               </a>
                                                        </li>
                                                 
                                                        
                                                 </ul>
                                                 </li>
                                          </ul>
                                        
                                   </div>
                                   
                                   </div>
                            </template>
                         </Sidebar>
                     </div>
                      <div class="flex align-items-center">

                            <span class="mr-2" v-if="token">

                             <router-link :to="{name: 'Profile'}">
                               <i class="pi pi-user"></i>
                             </router-link>
                            
                           </span>
                            <span class="mr-2" v-else>

                             <router-link :to="{name: 'LoginPage'}">
                               <i class="pi pi-user"></i>
                             </router-link>
                            
                           </span>
                       
                           <span>
                             <router-link to="/products/cart" >
                              <Button type="button" label="" icon="pi pi-shopping-cart" text :badge="totalCartItems || '0'" badgeClass="p-badge-danger " badgeSeverity="contrast" outlined />
                             </router-link>
                           </span>
                     </div>
              </div>
           
              <div class="card flex flex-wrap justify-content-center p-3">
                     <AutoComplete v-model="selectedProduct"  @keyup.enter="searchBTN" placeholder="Search products" class="w-full   mr-1 h-3rem" optionLabel="name" :suggestions="filteredProducts" @complete="search">
                     <template #option="slotProps">
                              <router-link :to="'/shop/'+slotProps.option.name">
                                      <div class="flex align-options-center">
                                          <img :alt="slotProps.option.name" :src="slotProps.option.imageUrl" :class="` mr-2`" style="width: 18px" />
                                          
                                          <div>{{ slotProps.option.name }}</div>
                                        </div>
                                   </router-link>
                     </template>
                     </AutoComplete>
                     <!-- <IconField iconPosition="right" class="w-full ">
                            <InputIcon class="pi pi-search pr-2"> </InputIcon>
                            <InputText v-model="value1" placeholder="Search" class="p-2" />
                     </IconField> -->
               </div>
       
             

       </div>
</div>

<Toast />
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from "../store/Auth"
import { useCartItemsStore } from "../store/fetchCartItems"
import { computed, onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import { useProductsStore } from "../store/fetchProducts"
import { useToast } from 'primevue/usetoast'

const router = useRouter()
const visible = ref(false);
const store = useAuthStore();
const { isLoggedIn, NotLoggedIn, LogOut } = store
const { token, firstname } = storeToRefs(store)
const toast = useToast();


const CartItemsData = useCartItemsStore();
const { CartItems } = storeToRefs(CartItemsData)
const { LogOutCart } = CartItemsData

const productStore = useProductsStore();
const { productsdata } = storeToRefs(productStore)

const isLetter = (e) => {
  let char = String.fromCharCode(e.keyCode); // Get the character
  if(/^[A-Za-z0-9" "\b]+$/.test(char)) return true; // Match with regex 
  else e.preventDefault(); // If not match, don't add to input text
}

const selectedProduct = ref('');
const filteredProducts = ref();

const search = (event) => {
    setTimeout(() => {
        if (!event.query.trim().length) {
            filteredProducts.value = [...productsdata.value];
        } else {
            filteredProducts.value = productsdata.value.filter((product) => {
                return product.name.toLowerCase().startsWith(event.query.toLowerCase());
            });
        }
    }, 250);
}

const searchBTN = () =>{
       if(selectedProduct.value.name){

                 router.push({     
                     //  path: `/shop/${selectedProduct.value}`
                     name: 'SearchShop', params:{ keyword: selectedProduct.value.name }
                            
                            
                     })
                     // router.go(0)
       }else if(selectedProduct.value){
              
                router.push({     
                     //  path: `/shop/${selectedProduct.value}`
                     name: 'SearchShop', params:{ keyword: selectedProduct.value }
                            
                            
                     })
                     // router.go(0)
              
       }else{

             
               toast.add({ severity: 'error', summary: '', detail: 'Enter search query', life: 3000 });
       }

       

             
      
}

// const submitSearch = async() =>{

//        // console.log(selectedProduct.value)

//        if(selectedProduct.value){

//                 await router.push({     
//                      //  path: `/shop/${selectedProduct.value}`
//                      name: 'SearchShop', params:{ keyword: selectedProduct.value }
                            
                            
//                      })
//                      router.go(0)

//                      // selectedProduct.value !=selectedProduct.value
      
              
//        }else{

             
//                toast.add({ severity: 'error', summary: '', detail: 'Enter search query', life: 3000 });
//        }

       

             
      
// }

 const sanitizeTitle = (title) => {
      var slug = "";
      // Change to lower case
      var titleLower = title.toLowerCase();
      // Letter "e"
      slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
      // Letter "a"
      slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
      // Letter "o"
      slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
      // Letter "u"
      slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
      // Letter "d"
      slug = slug.replace(/đ/gi, 'd');
      // Trim the last whitespace
      slug = slug.replace(/\s*$/g, '');
      // Change whitespace to "-"
      slug = slug.replace(/\s+/g, '-');
      
      return slug;
    }

const target = ref(null);
const showStickyNav = ref(false)
const sticking = ref(false);        
const observer = new IntersectionObserver(
       ([entry]) => { 

              sticking.value = !entry.isIntersecting; 
              showStickyNav.value = !entry.isIntersecting; 
       },
       { threshold: 0.0 }
); 

         onMounted(() => {
            observer.observe(target.value);
        });


//Mobile Logout
const logout = () =>{

       visible.value = false

        LogOut(CartItems.value)
        LogOutCart()
}


const totalCartItems = computed(() => {


       return CartItems.value.reduce(
              (sum, item) => sum + Number(item.quantity),
              0,
);
})


//Menu Items
const items = [
    {
        label: 'Profile',
        icon: 'pi pi-user',
        visible:()=> isLoggedIn(),
        command: () => {
             router.push({
                              name: "Profile",
                             
                          })
        }
    },
    {
        label: 'Settings',
        icon: 'pi pi-user-edit',
        visible:()=> isLoggedIn(),
        command: () => {
             router.push({
                            
                              path: `/edit/${firstname.value}/profile`
                             
                          })
        }
    },
    {
        label: 'Order',
        icon: 'pi pi-box',
        visible:()=> isLoggedIn(),
        command: () => {
             router.push({
                              name: "userOrder",
                             
                          })
        }
    },
    {
        label: 'Login',
        icon: 'pi pi-sign-in',
        visible:()=> NotLoggedIn(), 
        command: () => {
             router.push({
                              name: "LoginPage",
                             
                          })
        }
    },
    {
        label: 'Register',
        icon: 'pi pi pi-user',
        visible:()=> NotLoggedIn(), 
        command: () => {
            router.push({
                     name: "RegisterPage",
                     
              })
        }
    },
    {
                separator: true
    },
    {
       label: 'Logout',
       icon: 'pi pi-sign-out',
       visible:()=> isLoggedIn(),
       command: () => {

              LogOut(CartItems.value)
              LogOutCart()
              
       }

                
            },
   
];

const save = () => {
    toast.add({ severity: 'success', summary: 'Success', detail: 'Data Saved', life: 3000 });
};
</script>

<style scoped>
.sticky-menu {
    position: sticky;
    top: 0;
    z-index: 100;
}
.sticky-menu.sticking {
    background-color: rgba(65, 184, 131, 0.3);
    box-shadow: 0 8px 12px 0 rgba(0, 0, 0, 0.3)
}



</style>