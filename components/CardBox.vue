<template>
    <div v-for="card in current_pack!.cards" :key="card.card_in_pack">
      <Card 
        :card-props="card" 
        :picked-flag="false"
        @card-clicked="clickPick">
        :key="card.card_id"
      </Card>
    </div>
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';
import Picker from '~~/composables/picker';

const PACK_SIZE=14
const PLAYER_NUM=7

const props = defineProps<{
  set_name: string
}>()

const thisdraft = useDraft()
const store = usePickStore()
const timerStore = useTimerStore()

const current_pack_index = computed(()=>store.getPickIndex % PLAYER_NUM)
const current_pack = computed(()=> { return thisdraft.getRound(store.getRoundIndex)?.getPack(current_pack_index.value)})
const pick_number = computed(()=> (store.getPickIndex % PACK_SIZE))
const picker: Picker = new Picker(thisdraft, store.getRoundIndex, current_pack_index.value)

const emit = defineEmits(['cardboxClicked'])
defineExpose({ timeoutPick })

function pick(card_in_pack_id: Record) {
    current_pack.value?.removeCard(card_in_pack_id)
    picker.pickCards(0, store.getInversePickIndex, store.getRoundIndex, current_pack_index.value)
    store.incrementIndex()
}

function timeoutPick() {
  console.log("Caught timeout on: ", current_pack_index.value)
  timerStore.setTimer(store.getInversePickIndex)
  pick(current_pack.value?.Cards.at(0)!)
}

function clickPick(card_in_pack: Record ) {
  console.log("Cardbox received ", card_in_pack)
  if(card_in_pack != null) {
    emit('cardboxClicked')
    timerStore.setTimer(store.getInversePickIndex)
    pick(card_in_pack)
  }
}


</script>

<style scoped>


</style>