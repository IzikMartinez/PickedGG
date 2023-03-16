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
    @apply text-white
}

.bad {
    @apply text-red-600
}
</style>