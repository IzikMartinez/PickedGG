<template>
  <div class="pick-info">
    pack {{packNo}} pick: {{pickNo}}
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  packNo: Number,
  pickNo: Number
})

</script>

<style scoped>

</style>