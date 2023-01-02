<template>
    <span class="tooltip" >
        {{cardProps.card_name}} <br> 
        Pitch: {{cardProps.pitch}} Cost: {{cardProps.cost}} <br>
        Type: {{stringifyType}}
    </span>
</template>

<script setup lang="ts">
import { card } from '~~/composables/types/card';
const props=defineProps({
    cardData: {},
})
const cardProps = computed(()=> props.cardData as card)
const stringifyType = computed(()=> {
  let type_string = ""
  if(cardProps.value.card_type)
    cardProps.value.card_type.forEach(type => type_string += type + " ")
  return type_string
})
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