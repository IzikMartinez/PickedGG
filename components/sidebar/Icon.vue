<template>
  <div class="side-btn group">
    <img :src=iconPath :alt="iconPath" />
    <span class="tooltip lg:group-hover:scale-100 group-hover:scale-0 z-10">{{props.toolTip}}</span>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  fileName: String,
  toolTip: String
})

const iconPath = computed( () => "/" + props.fileName + ".svg" )
</script>

<style scoped>
.side-btn {
  @apply relative flex items-center justify-center
  w-12 h-12 p-1.5
  md:(w-10 h-10 p-1.5 mx-1)
  xl:(w-12 h-12 my-2 mx-auto)
  mx-2 my-2
  bg-red-800 hover:bg-green-300
  rounded-3xl hover:rounded
  transition-all duration-150
  cursor-pointer
  hover:z-10
}


.tooltip {
  @apply absolute w-auto min-w-max 
  lg:p-2 lg:m-4  md:p-1 m-2
  lg:left-12  md:left-auto
  lg:top-auto md:top-12 
  rounded-md shadow-md
  text-white bg-gray-900
  z-0
  text-xs font-bold
  transform scale-0 
  transition-all scale-0 duration-100 origin-left
}

</style>