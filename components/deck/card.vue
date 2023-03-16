<template>
    <div :class="cardClass">
        <DeckNum :count="cardProps.card_number"/>
        <DeckSvc :name="cardProps.card_name" :pitch="cardProps.pitch" :cost="cardProps.cost"/>
        <DeckRemovebtn @click="removeClick"/>
    </div>
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';

type deck_card = {
    card: Record
    card_number: number
}

const props = defineProps<{
    cardProps: Record,
    cardNumber: number
}>()
const emits = defineEmits<{
    (e: 'emittedCardName', type: string): void
}>()

const bladeSwitch = useBladeSwitch()
const cardClass = computed(()=> bladeSwitch.value ? 'card' : 'card-clps')

function removeClick() {
    usePickStore().addPick(props.cardProps)
    if(props.cardProps.cardNumber > 1)
        props.cardProps.cardNumber--
    else
        emits('emittedCardName', props.cardProps.id)
}
</script>

<style scoped>
.card-clps {
    @apply fixed relative flex flex-row justify-center items-center my-1 w-0
}
.card {
    @apply fixed relative flex flex-row justify-center items-center my-1 w-58 xl:w-70
}
</style>