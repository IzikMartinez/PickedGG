<template>
    <span class="timerBug">{{timerStore.getMinutes}}:{{timerStore.getSeconds}}</span>
</template>

<script setup lang="ts">
    const timerStore = useTimerStore()
    const emit = defineEmits(['timeoutTimer'])
    let clickedFlag=false


   onMounted(()=> {
    timerStore.setTimer(14)
   })
</script>

<style>
.timerBug {
    @apply justify-center items-center flex
    h-16 w-16 p-2 bg-white text-black rounded-sm
    font-display text-2xl
}
</style>