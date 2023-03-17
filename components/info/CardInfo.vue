<template>
  <div class="fixed w-16 h-8 bg-gray-600 shadow-2xl top-8 z-1">
    <div class="info-text"></div>
  </div>

</template>

<script setup lang="ts">
import {reactive} from "vue";

const cardInfo = reactive({
  cardName: String,
  cardText: "",
  power: 0,
  defense: 0,
  pitch: 0,
})
</script>

<style scoped>
.info-box {
  @apply fixed w-16 h-8 bg-gray-600 shadow-2xl top-8 z-1
}
.info-text {
  @apply text-fuchsia-300 font-sans font-semibold
}

</style>