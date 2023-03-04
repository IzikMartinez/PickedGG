<template>
    <NuxtLink to="/">
        <span class="nextbtn">{{ buttonText }}</span>
    </NuxtLink>
</template>


<script setup lang="ts">
const props = defineProps<{
    buttonText: string
}>()

</script>

<style>
    .nextbtn {
        @apply
        h-14 w-40 flex rounded-r-md bg-darkteal bg-teal-500
        xl:(rounded-l-md top-0 right-0 left-auto) bottom-0 left-0 z-1 absolute p-2
        justify-center items-center 
        hover:(bg-sky-400 rounded-l-3xl)
        font-display text-white text-center text-3xl 
        transition-all ease-linear duration-100 
    }
</style>