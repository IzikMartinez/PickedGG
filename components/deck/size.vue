<template>
    <span :class="textColor">
        {{ decksize }}/30
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    decksize: number
}>()

const textColor = computed(()=> props.decksize < 30 ? "bad": "good" )
</script>

<style scoped>
.good {
    @apply flex w-30 h-10 bg-green-600 text-white text-center items-center justify-center text-3xl rounded-md
}

.bad {
    @apply flex w-30 h-10 bg-red-600 text-white text-center items-center justify-center text-3xl rounded-md
}
</style>