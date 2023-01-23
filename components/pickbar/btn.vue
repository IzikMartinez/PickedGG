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
    w-22 h-12 mx-2 
    font-display text-white text-xl bg-blue-gray-800 rounded-xl
    cursor-pointer
    hover:(bg-red-600 rounded-md)
    transition-all duration-100 ease-linear
}

.pickbtn-active {
    @apply
    flex items-center justify-center text-center
    w-24 h-12 mx-2 
    font-display text-white text-2xl bg-red-700 rounded-md
    transition-all duration-100 ease-linear
}
</style>