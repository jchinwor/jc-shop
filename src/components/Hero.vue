<template>
  <div class="flex  mt-4">
    <div class="flex-1 justify-content-end items-align-end ">
        <div class="card ">         
            <Galleria :value="SliderImages" :numVisible="5"  containerStyle="max-width: 100%" :showThumbnails="false"
                :showIndicators="true" :circular="true" :autoPlay="true" :transitionInterval="2000" :changeItemOnIndicatorHover="true" :showIndicatorsOnItem="inside" :indicatorsPosition="position">
                <template #item="slotProps">
                    <router-link to="/shop/">
                        <img :src="slotProps.item.itemImageSrc" class="border-round" :alt="slotProps.item.alt" style="width: 100%; display: block" />
                    </router-link>
                </template>
            </Galleria>
        </div>
    </div>
</div>
</template>

<script setup>

import { ref, onMounted } from "vue";

const inside = ref(true);
const position = ref('bottom');

onMounted(() => {
    // PhotoService.getImages().then((data) => (images.value = data));
});

const SliderImages = ref([
    {
    itemImageSrc: require("../assets/slider/SLIDER4.png")
    },
    {
    itemImageSrc: require("../assets/slider/SLIDER2.png")
    },
    {
    itemImageSrc: require("../assets/slider/SLIDER3.png")
    },
    {
    itemImageSrc: require("../assets/slider/SLIDER1.png")
    },
    ]);

    
const responsiveOptions = ref([
    {
        breakpoint: '1300px',
        numVisible: 4
    },
    {
        breakpoint: '575px',
        numVisible: 1
    }
]);

</script>

<style>

</style>