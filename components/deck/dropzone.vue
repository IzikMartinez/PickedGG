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
        const card = usePickStore().picks.find(x=> x.card_id.toString() === cardName.value)
        if(card) {
            deck.value.push(card)
            deck.value.sort((x, y) => x.card_id - y.card_id)
            usePickStore().removePick(card)
        }
    }
}

function handleEmit(cardName: string) {
    const index = deck.value.findIndex(x => x.card_name === cardName)
    if (index > -1)  {
        deck.value.splice(index, 1)
    }
}

</script>

<style>
.blade {
 @apply fixed flex w-70 h-screen right-0 xl:top-14 top-28 bg-teal-700 hover:bg-teal-400 text-center justify-center font-display text-xl text-white
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