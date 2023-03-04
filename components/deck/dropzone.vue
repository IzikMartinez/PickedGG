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

// Nuxt went crazy and wouldn't let me use an imported card type, so I had to recreate it in-component 
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


const deck = ref<Array<deck_card>>([])
const cardName = ref("")

const decksize = ()=> useState('deck-size', ()=> ref(deck.value.length))

const bladeSwitch = useBladeSwitch()
const bladeClass = computed(()=> bladeSwitch.value ? 'blade' : 'blade-clps')
const btnClass = computed(()=> bladeSwitch.value ? "blade-btn-col" : "blade-btn")

/* FilterFunction(card) {
    name = card.name
    if(!names.find(name)) 
        names.push(name)
    else 
        card.number++
    
}
*/
// filteredArray = deck.filter(FilterFunction)
function onDrop(event: DragEvent) {
    if(event.dataTransfer) {
        cardName.value = event.dataTransfer.getData('cardData')
        const card = usePickStore().picks.find(x=> x.card_id.toString() === cardName.value) as card
        if(card) {
            addCardToDeck(card)
        }
    }
}

function handleEmit(cardID: number) {
    const index = deck.value.findIndex(x => x.card_id === cardID)
    if (index > -1)  {
        deck.value.splice(index, 1)
    }
}

function convertToDeckcard(card: card): deck_card {
    const new_card = {
        card_id: card.card_id,
        card_name: card.card_name,
        card_type: card.card_type,
        pitch: card.pitch,
        cost: card.cost,
        power: card.power,
        defense: card.defense,
        rarity: card.rarity,
        path: card.path,
        card_number: 1
    }
    return new_card
}



/////////////////   INCREMENT CARD COUNTER ///////////////////////////////////////////
function existsFlag(card: card) {
    if(deck.value.find(x => x.card_id === card.card_id)) return true
    else return false
}

function findIndex(card: card) {
    if( deck.value.findIndex(x => x.card_id === card.card_id) > -1) 
        return deck.value.findIndex(x => x.card_id === card.card_id) 
    else
        return -1
}

function incrementCount(index: number) {
    deck.value.at(index)!.card_number += 1
}

function addCardToDeck(card: card) {
    // check if the card is already in the deck
    if(existsFlag(card)) {
        // then find index of existing card
        const index = findIndex(card)
        // increment card_num
        incrementCount(index)
    } else {
        const deckcard = convertToDeckcard(card)
        deck.value.push(deckcard)
        deck.value.sort((x, y) => x.card_id - y.card_id)
    }
    usePickStore().removePick(card)
}

</script>

<style>
.blade {
 @apply fixed flex w-70 xl:w-70 h-screen right-0 xl:top-14 top-28 bg-teal-700 hover:bg-teal-400 text-center justify-center font-display text-xl text-white
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