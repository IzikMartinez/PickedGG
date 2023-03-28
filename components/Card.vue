<template>
  <!-- store.cardSizeClass.at(0) returns the class, "card", "card-sml", or "card-big".
  It will return "card" by default.  -->
  <span :class="cardClass" @click="addPick">
      <CardTooltip group-hover="xl:scale-100 scale-0 z-0 delay-700" :card-props="cardProps"/>
      <CardImage :record_id="cardProps" :card_name="cardProps.card_name" :cart_art="cardProps.card_art"/>
  </span>

</template>

<script setup lang="ts">
import {card} from 'composables/types/card';
import { Record } from 'pocketbase';

const picks = usePickStore()
const props = defineProps<{
  cardProps: Record 
  pickedFlag: boolean
}>()

const emit = defineEmits<{
  (e: 'cardClicked', type: Record): void
}>()

const cardClass = useCardClass() 
const artPath = ref("")

function addPick() {
  if (props.pickedFlag === true) {
    console.log("Cannot add ", props.cardProps.card_name, " As it has already been picked.")
  }
  else {
    picks.addPick(props.cardProps)
    console.log("Added ", props.cardProps.card_name, " (", props.cardProps.pitch, ")")
  }
  emit('cardClicked', props.cardProps)
}
</script>

<style scoped>

.card-picked {
  @apply flex-none bottom-0 
  xl:w-[14rem] xl:h-[19rem]
  w-[9rem] h-[12rem]
  hover:bg-gray-100
}

.card-small {
  @apply 
  flex relative items-center justify-center text-center
  my-0 p-0.5
  xl:(w-60 h-84)
  w-8rem h-11.1rem
  bg-black hover:bg-gray-100
}
.card-medium {
  @apply 
  flex relative items-center justify-center text-center
  m-0 p-0.5
  xl:(w-68 h-95)
  w-48 h-67
  bg-black hover:bg-gray-100
}
.card-large {
  @apply 
  flex relative items-center justify-center text-center
  m-0 p-0.5
  xl:(w-88 h-123)
  w-70 h-96
  bg-black hover:bg-gray-100
}


</style>