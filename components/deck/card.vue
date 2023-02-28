<template>
    <div :class="cardClass">
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

const bladeSwitch = useBladeSwitch()
const cardClass = computed(()=> bladeSwitch.value ? 'card' : 'card-clps')

function handleClick() {
    usePickStore().addPick(props.cardProps)
    emits('emittedCardName', props.cardProps.card_name)
}
</script>

<style scoped>
.card-clps {
    @apply fixed relative flex flex-row justify-center items-center my-1 w-0
}
.card {
    @apply fixed relative flex flex-row justify-center items-center my-1 w-58
}
</style>