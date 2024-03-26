<template>

<MainSection />


</template>

<script>
import Header from '../components/Header.vue'
import MainSection from '../components/MainSection.vue'


export default {

components: {Header,MainSection},

    setup(){
  

        return { }
    }
}
</script>

<style >

/* .card .p-dataview .p-dataview-content
{
    background: transparent !important;
  } */

.card .p-paginator{
    background:transparent;
}

.card .p-dataview .p-dataview-content
{
    background: transparent !important;
    color: #4b5563;
    border: 0 none;
    padding: 0;
  }

</style>
