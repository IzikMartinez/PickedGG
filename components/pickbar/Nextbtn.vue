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
        flex rounded-r-md bg-darkteal bg-teal-500 h-10 w-20
        xl:(rounded-l-md top-0 right-0 left-auto h-14 w-40 ) 
        bottom-0
        justify-center items-center
        cursor-pointer
        hover:(bg-sky-400 rounded-l-3xl)
        font-display text-white text-center xl:text-3xl text-lg
        transition-all ease-linear duration-100 
    }
</style>