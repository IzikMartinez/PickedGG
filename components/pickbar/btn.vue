<template>
<span :class="btnstyle" @click="useActiveBtn().value = text">{{text}}</span>
</template>

<script setup lang="ts">
    const props = defineProps<{
        text: string
    }>()

    const btnstyle = computed(()=> useActiveBtn().value === props.text ? "pickbtn-active" : "pickbtn")
</script>

<style>
.pickbtn {
    @apply
    flex items-center justify-center text-center 
    w-18 h-10 mx-1 p-1 rounded-md
    md:(w-12 h-8 text-sm rounded-md)
    xl:(w-22 h-12 p-0 text-xl rounded-xl)
    font-display text-white text-xl bg-blue-gray-800 
    cursor-pointer
    hover:(bg-red-600 rounded-md)
    transition-all duration-100 ease-linear
}

.pickbtn-active {
    @apply
    flex items-center justify-center text-center p-2
    w-19 h-10 text-md mx-1 rounded-md
    md:(w-14 h-8 text-sm rounded-md mx-1)
    xl:(w-24 h-12 p-0 text-xl rounded-xl)
    font-display text-white text-2xl bg-blue-700 
    transition-all duration-100 ease-linear
}
</style>