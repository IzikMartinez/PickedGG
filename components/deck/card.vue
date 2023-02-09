<template>
    <div class="flex flex-row flex-wrap justify-center items-center my-1">
        <DeckNum />
        <DeckSvc :name="cardProps.card_name" :pitch="cardProps.pitch" :cost="cardProps.cost"/>
        <DeckRemovebtn @click="handleClick"/>
    </div>
</template>

<script setup lang="ts">

import { card } from '~~/composables/types/card';
const props = defineProps<{
    cardProps: card,
}>()
const emits = defineEmits<{
    (e: 'emittedCardName', type: string): void
}>()

function handleClick() {
    usePickStore().addPick(props.cardProps)
    emits('emittedCardName', props.cardProps.card_name)
}
</script>