<template >
  <img src="/arrow.svg" @click="styles.toggleSlider()" alt="open-close slider" :class=styles.slideBtn>
  <div :class=styles.slider>
    <template v-for="pick in store.getPicks" :key="pick.card_in_pack">
      <Card :card-props="pick" :art-path="pick.path" :picked="true" :pickedClassFlag="true"></Card>
    </template>
  </div>

</template>

<script setup lang="ts">

const styles = useStyleStore();
const store = usePickStore();
const refClass = ref(styles.slider)
const styleRef = ref("pick-info")

</script>

<style scoped>
.pick-bar {
    @apply fixed xl:flex xl:flex-wrap
    xl:bottom-0 xl:left-16
    xl:w-screen xl:h-2/3
    bottom-0 left-0 top-16 xl:top-auto
    w-1/2 h-screen
    bg-gray-600
    transition-all duration-100
    overflow-auto
}

.pick-bar-collapsed {
    @apply fixed w-screen h-0
    xl:bottom-1 xl:left-16
    left-0 bottom-0
    transition-all duration-100
}


.slide-btn {
    @apply fixed w-12 h-12 py-2
    xl:rotate-180 -rotate-90 
    xl:bottom-2/3 xl:left-16
    bottom-0 left-1/2
    bg-black text-white
    transition-all duration-100
    cursor-pointer
}
.slide-btn-cl {
    @apply fixed w-12 h-12 py-2
    xl:rotate-0 rotate-90
    xl:bottom-0 xl:left-16
    bottom-0 left-0
    bg-black fill-white
    transition-all duration-100
    cursor-pointer
}
</style>