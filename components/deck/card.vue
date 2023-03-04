<template>
    <div :class="cardClass">
        <DeckNum :count="cardProps.card_number"/>
        <DeckSvc :name="cardProps.card_name" :pitch="cardProps.pitch" :cost="cardProps.cost"/>
        <DeckRemovebtn @click="handleClick"/>
    </div>
</template>

<script setup lang="ts">
type deck_card = {
    card_id: number
    card_name: string
    card_type: string[] | null
    pitch: number
    cost: number
    power: number | null
    defense: number | null
    rarity: string
    path?: string
    card_number: number
}

const props = defineProps<{
    cardProps: deck_card,
}>()
const emits = defineEmits<{
    (e: 'emittedCardName', type: number): void
}>()

const bladeSwitch = useBladeSwitch()
const cardClass = computed(()=> bladeSwitch.value ? 'card' : 'card-clps')

function handleClick() {
    usePickStore().addPick(props.cardProps)
    if(props.cardProps.card_number > 1)
        props.cardProps.card_number--
    else
        emits('emittedCardName', props.cardProps.card_id)
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