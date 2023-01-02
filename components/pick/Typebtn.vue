<template>
    <span class="btn" 
    @click="incrementIndex" 
    @mouseover="incrementIndex" 
    @mouseleave="decrementIndex">{{ classTypes[index] }}</span>
</template>

<script setup lang="ts">

const props = defineProps<{
    classTypes: string[]
}>()

const emits = defineEmits<{
    (e: 'cardtype', type: string): void
}>()
const index = ref(0)

function incrementIndex() {
    const len = props.classTypes.length
    index.value++
    if(index.value >= len)
     index.value = 0
    emits('cardtype', props.classTypes[index.value])
}

function decrementIndex() {
    const len = props.classTypes.length
    index.value--
    if(index.value < 0)
        index.value = len-1
    emits('cardtype', props.classTypes[index.value])
}
</script>

<style scoped>
    .btn {
        @apply 
        w-24 h-12 bg-darkteal text-white text-2xl
    }
</style>