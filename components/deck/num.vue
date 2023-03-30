<template>
    <span :class="numClass">
        {{ count }}
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    count: number
}>()

const numClass = computed(()=> useBladeSwitch().value === false ? 'closed' : 'open')
</script>

<style>
.open {
    @apply
    flex relative right-5 bg-pink-900 
    h-12 w-8 rounded-l-md 
    items-center justify-center 
    text-center
    text-white text-2xl font-medium
}
.closed {
    @apply
    flex relative right-5 bg-pink-900 h-12 w-0 xl:w-8 rounded-l-md items-center justify-center text-center
}
</style>