<template>
    <div class="flex flex-row flex-wrap justify-center items-center my-1">
        <DeckNum />
        <DeckSvc :name="name" :pitch="pitch" :cost="cost"/>
        <DeckRemovebtn />
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    name: string,
    pitch: number,
    cost: number,
}>()
</script>