<template>
    <span class="list">
    <div v-for="pick in props.picks" draggable="true" @dragstart="startDrag($event, pick)">
        <Card :cardProps="pick" :picked-flag="true" class="hover:z-1"></Card>
    </div>
    </span>
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';
import { card } from '~~/composables/types/card.js';

const props = defineProps<{
    picks: Record[]
}>()

function startDrag(event: DragEvent, pick: Record) {
    if(event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('cardData', pick.card_id.toString())
    }
}
</script>

<style scoped>
.list{
    @apply
    flex lg:flex-row md:flex-col flex-wrap 
}
</style>