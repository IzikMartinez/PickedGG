<template>
    <div 
    class="flex w-120 h-screen left-0 top-0 bg-teal-700 hover:bg-teal-400 text-center justify-center font-display text-xl text-white" 
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
    >
        <span v-if="deck.length === 0">Drop cards here
        </span>
        <span v-else>
            <span v-for="card in deck">
                <DeckCard :card-props="card" @emitted-card-name="handleEmit"/>
            </span>
        </span>
    </div>
</template>

<script setup lang="ts">
// Nuxt went crazy and wouldn't let me use an imported card type, so I had to recreate it in-component 
type card = {
    card_id: number
    card_in_pack?: number
    card_name: string
    card_type: string[] | null
    pitch: number
    cost: number
    power: number | null
    defense: number | null
    rarity: string
    picked?: boolean
    path?: string
}

const deck = ref<Array<card>>([])
const cardName = ref("")

function onDrop(event: DragEvent) {
    if(event.dataTransfer) {
        cardName.value = event.dataTransfer.getData('cardData')
        const card = usePickStore().picks.find(x=> x.card_id.toString() === cardName.value)
        if(card) {
            deck.value.push(card)
            deck.value.sort((x, y) => x.card_id - y.card_id)
            usePickStore().removePick(card)
        }
    }
}

function handleEmit(cardName: string) {
    const index = deck.value.findIndex(x => x.card_name = cardName)
    if (index > -1)  deck.value.splice(index, 1)
}

</script>