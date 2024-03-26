<template>
  <Menu :model="items" class="w-full md:w-full ">
               
                <template #submenuheader="{ item }">
                    <router-link to='/user/profile'>
                         <span class="text-primary font-bold">{{ item.label }}</span>
                         <span class="text-gray-400 font-bold">{{ item.label2 }}</span>
                    </router-link>
                   
                </template>
                <template #item="{ item, props }">
                    <a v-ripple class="flex align-items-center" v-bind="props.action">
                        <span :class="item.icon" />
                        <span class="ml-2">{{ item.label }}</span>
                        <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
                        <Badge v-if="item.badge2" class="ml-auto" :value="customerOrders.length" />
                        <span v-if="item.shortcut" class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{{ item.shortcut }}</span>
                    </a>
                </template>
                <template #end>
                    <button v-ripple class="relative overflow-hidden w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround">
                        <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" /> -->
                        <Avatar icon="pi pi-user" class="mr-2 " shape="circle" />
                        <span class="inline-flex flex-column">
                            <span class="font-bold">{{usermain.firstname}}</span>
                            <!-- <span class="text-sm">Admin</span> -->
                        </span>
                    </button>
                </template>
  </Menu>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from "../store/Auth"
import router from '@/router';
import { ref } from 'vue';
import { useCartItemsStore } from "../store/fetchCartItems"


const store = useAuthStore();
const { userid,firstname,regdate,email,lastname,usermain,customerOrders } = storeToRefs(store)
const { GetProfile,LogOut,getAllCustomerOrders } = store

const CartItemsData = useCartItemsStore();
const { CartItems } = storeToRefs(CartItemsData)
const { LogOutCart } = CartItemsData
            
const items = ref([
   
    {
        label: 'My Account',
        
        items: [
            {
                label: 'Profile',
                icon: 'pi pi-user',
                // shortcut: '⌘+N'
                  command: () => {
                      
                      router.push({
                        name: 'Profile'
                      })
                  }
            },
            {
                label: 'Orders',
                icon: 'pi pi-box',
                badge2: 1,
                  command: () => {
                      
                      router.push({
                        name: 'userOrder'
                      })
                  }
            },
            {
                label: 'Messages',
                icon: 'pi pi-inbox',
                badge: 0
            },
            {
                label: 'Pending Reviews',
                icon: 'pi pi-comments',
                command: () => {
                      
                      router.push({
                        name: 'ReviewRatings'
                      })
                  }
            },
            {
                label: 'Recently Viewed',
                icon: 'pi pi-history',
                // shortcut: '⌘+S'
            }
        ]
    },
    {
        label2: 'Account Management',
        items: [
            {
                label: 'Settings',
                icon: 'pi pi-cog',
                  command: () => {
                      
                     router.push({ path: `/edit/${firstname.value}/profile` })
                  }
               
            },
            {
                label: 'Address Book',
                icon: 'pi pi-cog',
                
            },
            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                 command: () => {
                      
                    
                        LogOut(CartItems.value)
                        LogOutCart()
                  }
                
            }
        ]
    },
    {
        separator: true
    }
]);
        
</script>

<style>

</style>