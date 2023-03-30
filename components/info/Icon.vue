<template>
    <div :class="pick_pack_body">
        <div class="small-text">{{props.picksPacks}}<br>
          <div class="pText">{{pick_pack_data}}</div>
        </div>
    </div>
</template>

<script setup lang="ts">

const store = usePickStore()

const props = defineProps({
  picksPacks: String,
  toolTip: String
})

const pick_pack_data = computed( ()=>  props.picksPacks==="pick" ? (store.getPickIndex % 14)+1 : useRoundIndex().value +1)
const pick_pack_body = computed( ()=> "icon-" + props.picksPacks + "-" + useSetName().value + " group" )


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');


.icon-pick-upr {
  @apply flex items-center justify-center
  w-17 h-16 p-2
  mx-3 my-2
  z-11
  bg-darkteal
  text-white
  rounded-r-lg hover:rounded
  transition-all duration-151
}

.icon-pack-upr {
  @apply flex items-center justify-center
  w-17 h-16 p-2
  mx-3 my-2
  z-11
  bg-darkteal
  text-white
  rounded-l-lg hover:rounded
  transition-all duration-151
}

.icon-pick-out {
  @apply flex items-center justify-center
  w-17 h-16 p-2
  mx-3 my-2
  z-11
  bg-red-900
  text-white
  rounded-r-lg hover:rounded
  transition-all duration-151
}

.icon-pack-out {
  @apply flex items-center justify-center
  w-17 h-16 p-2
  mx-3 my-2
  z-11
  bg-red-900
  text-white
  rounded-l-lg hover:rounded
  transition-all duration-151
}

.small-text{
  @apply 
  font-display
  text-sm
}

.pText {
  @apply
  font-display
  text-4xl
}


.tool-tip {
  @apply absolute w-auto p-2 m-4 min-w-max left-12 rounded-md shadow-md
  text-white bg-gray-900
  text-xs font-bold
  transition-all scale-0 duration-100 origin-left
}
</style>