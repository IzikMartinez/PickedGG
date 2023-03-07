<template>
    <span class="tooltip" >
        {{cardProps.card_name}} <br> 
        Pitch: {{cardProps.pitch}} Cost: {{cardProps.cost}} <br>
        Type: {{cardProps.card_type}}
    </span>
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';
const props= defineProps<{
    cardProps: Record 
}>()

</script>

<style scoped>
.tooltip {
  @apply 
  absolute 
  w-40 m-2 p-2 min-w-max rounded-md shadow-md bg-gray-900
  text-white text-xs font-bold
  cursor-default
  transform scale-0
  transition-all duration-100 delay-100 origin-bottom
}
</style>