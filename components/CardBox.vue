<template>
    <div class="fixed flex flex-col w-10/12 xl:(top-0 left-16) top-16 left-0 justify-center items-center">
      <div>
        <DraftInfo class="xl:top-0 top-16" ref="infoRef"/>
      </div>
      <span :class="cardBoxClass" >
        <div v-for="card in current_pack!.cards" :key="card.card_in_pack">
            <Card 
              :card-props="card" 
              :picked-flag="false"
              @card-clicked="clickPick">
              :key="card.card_id"
            </Card>
        </div>
      </span>
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

const cardBoxClass = computed(()=> 'cardbox-' + useCardBoxClass().value)
const current_pack_index = computed(()=>store.getPickIndex % PLAYER_NUM)
const current_pack = computed(()=> { return thisdraft.getRound(store.getRoundIndex)?.getPack(current_pack_index.value)})
//const pick_number = computed(()=> (store.getPickIndex % PACK_SIZE))
const picker: Picker = new Picker(thisdraft, store.getRoundIndex, current_pack_index.value)

const emit = defineEmits(['cardboxClicked'])
defineExpose({ timeoutPick })

function pick(card_in_pack_id: Record) {
    current_pack.value?.removePick(card_in_pack_id.id)
    usePickCards(thisdraft.getRound(store.getRoundIndex)!, current_pack.value!.pack_id)
    store.incrementIndex()
}

function getRandomInt(max: number, min: number): number {
        let num = Math.floor(Math.random() * max)// start at 1
        return num
        //return this.lcg(21, 3, 7, seed, 3)[1] % max
    }

function timeoutPick() {
  timerStore.setTimer(store.getInversePickIndex)
  const idx = getRandomInt(current_pack.value!.Cards.length, 0)
  pick(current_pack.value?.Cards.at(idx)!)
}

function clickPick(card_in_pack: Record ) {
  if(card_in_pack != null) {
    emit('cardboxClicked')
    timerStore.setTimer(store.getInversePickIndex)
    pick(card_in_pack)
  }
}


</script>

<style scoped>

.cardbox-small {
  @apply
  fixed flex flex-wrap
  xl:(w-screen top-30 left-8) w-30rem
  scrollbar scrollbar-w-0
  gap-1 justify-center overflow-auto overflow-hidden
  transition-all duration-150 ease-linear
}
.cardbox-medium {
  @apply
  fixed flex flex-row flex-wrap top-20 left-20 pb-20
  lg:w-11/12 w-30rem h-screen
  scrollbar scrollbar-w-0
  gap-1 items-center justify-center overflow-auto 
  transition-all duration-150 ease-linear
}
.cardbox-large {
  @apply
  fixed flex flex-wrap pb-20
  xl:(w-screen left-10 right-8 top-20) w-72 h-screen
  scrollbar scrollbar-w-0
  gap-1 justify-center overflow-auto 
  transition-all duration-150 ease-linear
}


.cardbox-medium-left {
  @apply
  fixed flex flex-row flex-wrap top-20 left-16 
  lg:w-11/12 w-30rem 
  gap-0 items-center justify-center overflow-auto 
  transform
  translate-x-full opacity-0
  transition-all duration-150 ease-linear
}
.cardbox-large-left {
  @apply
  fixed flex flex-row flex-wrap top-20 left-16 
  lg:w-11/12 w-30rem 
  gap-0 items-center justify-center overflow-auto 
  transform
  translate-x-full opacity-0
  transition-all duration-150 ease-linear
}
.cardbox-small-left {
  @apply
  fixed flex flex-row flex-wrap top-20 left-16 
  lg:w-11/12 w-30rem 
  gap-0 items-center justify-center overflow-auto 
  transform
  translate-x-full opacity-0
  transition-all duration-150 ease-linear
}

.cardbox-medium-right {
  @apply  
  fixed flex flex-row flex-wrap top-20 left-16 
  lg:w-11/12 w-30rem 
  gap-0 items-center justify-center overflow-auto 
  transform
  -translate-x-full opacity-0
  transition-all duration-150 ease-linear
}
.cardbox-large-right {
  @apply  
  fixed flex flex-row flex-wrap top-20 left-16 
  lg:w-11/12 w-30rem 
  gap-0 items-center justify-center overflow-auto 
  transform
  -translate-x-full opacity-0
  transition-all duration-150 ease-linear
}
.cardbox-small-right {
  @apply  
  fixed flex flex-row flex-wrap top-20 left-16 
  lg:w-11/12 w-30rem 
  gap-0 items-center justify-center overflow-auto 
  transform
  -translate-x-full opacity-0
  transition-all duration-150 ease-linear
}

.cardbody-enter-from { @apply opacity-0 }
.cardbody-enter-active {@apply transition-all duration-200 ease-linear}
.cardbody-enter-to {@apply opacity-100}



</style>