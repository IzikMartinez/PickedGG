<template>
        <span class="nextbtn">{{ buttonText }}</span>
</template>


<script setup lang="ts">
const props = defineProps<{
    buttonText: string
}>()


</script>

<style>
    .nextbtn {
        @apply
        absolute 
        flex 
        bg-darkteal bg-teal-500 h-12 w-20
        font-display text-white text-center justify-center items-center
        xl:(rounded-l-md rounded-r-none h-14 w-30 text-2xl right-0 top-0 z-3)
        xl:hover:(rounded-l-2xl bg-blue-400 text-gray-800)
        bottom-16 right-0 rounded-l-lg z-3
        transition-all duration-100 ease-linear


    }
</style>