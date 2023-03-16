<template>
    <span class="flex relative right-5 bg-purple-900 h-12 w-8 rounded-l-md items-center justify-center text-center">
        {{ count }}
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    count: number
}>()
</script>