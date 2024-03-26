<template>
  
  <div class="container">
      <div  class="flex justify-content-center items-align-end surface-0 border-round px-3 py-3 mt-5">

        <div class="mt-4 flex flex-column">
            <!-- <img :src="require('../assets/empty-cart.svg')" alt=""> -->
          
            

            
              <img :src="notFound" alt="" width="400" height="400">

              <div class="flex justify-content-center text-center  align-content-center">
                <div>
                    <p>
                    Page not Found
                  </p>
                      <router-link to="/">
                        <Button label="Back to HOMEPAGE" class="mt-3"/>
                    </router-link>
                </div>
              </div>

           

        </div>

    </div>
  </div>
</template>

<script setup>

   const notFound = require('../assets/404_notfound.svg')

</script>

<style scoped>
h1{
    text-align: center;
}
</style>