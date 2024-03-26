<template>
  <div class="grid-wrap flex flex-column md:flex-row  justify-content-between flex-wrap">

      <ProductGridItem v-for="product in productsdata" :key="product.id" :product='product'/>

    </div>

</template>

<script>

import ProductGridItem from '../components/ProductGridItem.vue'
export default {
    components: {ProductGridItem},
    props:['productsdata']
}
</script>

<style scoped>
  /* .grid-wrap {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
  }

  @media (max-width: 900px){
    .grid-wrap {
      display: flex;
      justify-content: center;
      align-items: center;
     flex-direction: column;
    }
  } */

</style>