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
    fixed flex flex-row flex-wrap w-screen h-screen 
    md:(top-10 pt-0 w-3/5 left-12 justify-center)
    xl:(top-16 left-8 pb-16 items-start justify-center w-10/12 mx-auto) overflow-auto 
    top-36 left-0 pb-60 pt-4
    scrollbar scrollbar-w-0
}
</style>