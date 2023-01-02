<template>
    <div v-for="card in current_pack?.cards" :key="card.card_in_pack">
      <Card 
        :card-props="card" 
        :picked-flag="false"
        @click="clickPick(card.card_in_pack)">
        :key="card.card_id"
      </Card>
    </div>
</template>

<script setup lang="ts">
import Picker from '~~/composables/picker';


const PACK_SIZE=14
const PLAYER_NUM=7
const draft = useDraft()
const store = usePickStore()
const timerStore = useTimerStore()

const current_pack_index = computed(()=>store.getPickIndex % PLAYER_NUM)
const current_round = computed( ()=> {const round = draft.getRound(store.getRoundIndex ); return (round) ? round : null} )
const current_pack = computed(()=> { return (current_round.value) ? current_round.value.getPack(current_pack_index.value) : null})
const cards_remaining = computed(()=> {if(store.getPickIndex) return PACK_SIZE - store.getPickIndex % PACK_SIZE; else return 1})
const pick_number = computed(()=> (store.getPickIndex % PACK_SIZE))
const picker: Picker = new Picker(draft, store.getRoundIndex, current_pack_index.value)

const emit = defineEmits(['clickedCard'])
defineExpose({ timeoutPick })

function pick(card_in_pack_id: number) {
    current_pack.value?.removeCard(card_in_pack_id)
    picker.pickCards(0, cards_remaining.value, store.getRoundIndex, current_pack_index.value)
    store.incrementIndex()
}

function timeoutPick() {
  console.log("Caught timeout on: ", current_pack_index.value)
  timerStore.setTimer(store.getInversePickIndex)
  pick(current_pack_index.value)
}

function clickPick(card_in_pack_id: number | undefined) {
  if(card_in_pack_id != null) {
    emit('clickedCard')
    timerStore.setTimer(store.getInversePickIndex)
    pick(card_in_pack_id)
  }
}

</script>

<style scoped>


</style>