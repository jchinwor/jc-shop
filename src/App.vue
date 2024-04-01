<template> 
<Header />
<router-view v-slot="{ Component }">
  <transition name="fade" >
    <component :is="Component" />
  </transition>
</router-view>
<Footer />
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Header from './components/Header.vue'
import Navigation from './components/Navigation.vue'
import Footer from './components/Footer.vue'


</script>


<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}

.fade-enter-from,
.fade-leave-active {
  opacity: 0;
}
 *{
    box-sizing: border-box;
    font-family: Arial;
    
    /* margin:0; */
    
    
  }
  body{
     background: #f8fafc;
        margin:0;
        
  }

 .slide-leave-active{
    transition: transform 0.175s ease-out;
  }
  .slide-leave-to{
    transform: translate(-100%, 0);
  }
 a{
   
    list-style: none;
    text-decoration:none;
    color:#000;
  }

.container{
  
  max-width:1300px;
  margin:0 auto;
}
.p-menubar {
    padding: 6px;
    background: #10b981;
    color: #4b5563;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    margin:0;
  }

#page-wrap {
    margin: auto;
    max-width: 1000px;
    min-height: 100vh;
  }
#page-wrapnav {
    max-width: 1000px;
  }
.p-inputtext:enabled:focus{
    border-color: #10b981 !important;
    box-shadow: 0 0 0 0.02rem green !important;
}
 /* .p-button.p-button-icon-only {
    width: 2rem;
    padding: 0.5rem 1rem;
    
  } */

.p-autocomplete-input{
  padding: 0.6375rem !important
} 

/* Rating Star */
 .p-rating .p-rating-item.p-rating-item-active .p-rating-icon {
    color: #eab308;
  }
 


/* .p-inputtext {
  padding: 0.375rem 0.9375rem!important;
  font-size: 1.25rem;
  width: 100%;
} */

  /* button {
    background-color: black;
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    outline: 0;
    padding: 16px;
  } */
</style>
