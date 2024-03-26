<template>
 <div class="bg-primary-900 mt-5 w-full text-white pt-5 ">
    <div class="container ">
        <div class="grid grid-nogutter  border-round p-3 mt-3">
            <div class="col-12 md:col lg:col">
                <div class="text-center md:text-left lg:text-left mb-4 md:mb-0 lg:mb-0 flex flex-column md:flex-column lg:flex-column md:justify-content-start md:align-items-start justify-content-center align-items-center">
                  
                    <img src="../assets/dark.png" width="100px" alt="">
                 
                    <p>
                        Welcome to our store! We're all about top-notch products and awesome customer service. If you're into quality, style, and cool new stuff, you're in the right place!
                    </p>
                </div>
                
            </div>
           
            <div class="col-12 md:col lg:col">
                    <div class="text-center md:text-left lg:text-left md:justify-content-center md:align-items-center mb-4 md:mb-0 lg:mb-0 flex flex-column md:flex-column lg:flex-column justify-content-center align-items-center">
                    
                        <div class="flex flex-column justify-content-start">
                              <h2>
                        Quick Links
                      </h2>
                        <router-link to="/shop" class="text-white">
                            <p>
                             Shop
                            </p>
                        </router-link>
                        <router-link to="/shop" class="text-white">
                            <p>
                             About Us
                            </p>
                        </router-link>
                        <router-link to="/shop" class="text-white">
                            <p>
                             FAQs
                            </p>
                        </router-link>
                        </div>
                        
                    </div>
            </div>
         
           
            <div class="col-12 md:col lg:col">
                    <div class="text-center md:text-left lg:text-left mb-4 md:mb-0 lg:mb-0 flex flex-column md:flex-row lg:flex-row justify-content-center align-items-center">
                   
                         <div class="flex flex-column justify-content-start">

                             <h2>
                                Contact Us
                            </h2>
                            <p>
                               <i class="pi pi-map-marker" ></i> company's address
                            </p>
                            <p>
                               <i class="pi pi-send" ></i> support@jcstore.com
                            </p>
                         </div>
                   
                   
                </div>
            </div>
        
        </div>
    </div>
 </div>
 <div class="bg-primary-800  pt-5 pb-8b w-full ">

 </div>
 <ScrollTop />
</template>

<script setup>

</script>

<style>

</style>