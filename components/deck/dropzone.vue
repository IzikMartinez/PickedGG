<template>
    <div 
    :class="bladeClass" 
    @drop="onDrop($event)"
    @dragover.prevent
    @dragenter.prevent
    @click="bladeSwitch = !bladeSwitch"
    >
        <span v-if="deck.length === 0"> </span>
        <span v-else>
            <span v-for="card in deck">
                <DeckCard :card-props="card" @emitted-card-name="handleEmit"/>
            </span>
        </span>
    </div>
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';


// Nuxt went crazy and wouldn't let me use an imported card type, so I had to recreate it in-component 
type deck_card = {
    card: Record
    card_number: number
}

const deck = ref<Array<deck_card>>([])
const cardName = ref("")

const decksize = ()=> useState('deck-size', ()=> ref(deck.value.length))
const bladeSwitch = useBladeSwitch()
const bladeClass = computed(()=> bladeSwitch.value ? 'blade' : 'blade-clps')
const btnClass = computed(()=> bladeSwitch.value ? "blade-btn-col" : "blade-btn")


function onDrop(event: DragEvent) {
    if(event.dataTransfer) {
        cardName.value = event.dataTransfer.getData('cardData')
        const card = usePickStore().picks.find(x=> x.card_id.toString() === cardName.value) as Record
        if(card) {
            addCardToDeck(card)
        }
    }
}

function handleEmit(cardID: string) {
    const index = deck.value.findIndex(x => x.card.id === cardID)
    if (index > -1)  {
        deck.value.splice(index, 1)
    }
}

function buildDeckCard(card: Record): deck_card {
    const new_card: deck_card = {
        card,
        card_number: 1
    }
    return new_card
}



/////////////////   INCREMENT CARD COUNTER ///////////////////////////////////////////
function existsFlag(card: Record) {
    if(deck.value.find(x => x.card.card_id === card.card_id)) return true
    else return false
}

function findIndex(card: Record) {
    if( deck.value.findIndex(x => x.card.card_id === card.card_id) > -1) 
        return deck.value.findIndex(x => x.card.card_id === card.card_id) 
    else
        return -1
}

function incrementCount(index: number) {
    deck.value.at(index)!.card_number += 1
}

function addCardToDeck(card: Record) {
    // check if the card is already in the deck
    if(existsFlag(card)) {
        // then find index of existing card
        const index = findIndex(card)
        // increment card_num
        incrementCount(index)
    } else {
        const deckcard = buildDeckCard(card)
        deck.value.push(deckcard)
        deck.value.sort((x, y) => x.card.card_id - y.card.card_id)
    }
    usePickStore().removePick(card)
}

</script>

<style>
.blade {
 @apply fixed flex w-70 xl:w-90 h-screen right-0 xl:top-14 top-28 bg-teal-700 hover:bg-teal-400 text-center justify-center font-display text-xl text-white
 transition-all duration-150
 transform z-0
}

.blade-clps {
 @apply fixed flex w-10 h-screen right-0 xl:top-14 top-28 bg-teal-700 hover:bg-teal-400 text-center justify-center font-display text-xl text-white
 transition-all duration-150
}

.blade-btn {
    @apply bg-teal-700 hover:bg-teal-500 active:bg-teal-300 h-10 w-12 top-28 right-66 flex fixed rounded-l-lg cursor-pointer
 transition-all duration-150
}

.blade-btn-col {
    @apply bg-teal-700 hover:bg-teal-500 active:bg-teal-300 h-10 w-12 top-28 right-17 flex fixed rounded-l-lg cursor-pointer
 transition-all duration-150
}

</style>