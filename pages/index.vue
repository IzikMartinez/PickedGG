<template>
  <!--
  <div>
    <PickInfo :pack-no="round_number + 1" :pick-no="pick_number + 1"/>
  </div>
  -->
  <div id="card-box" >
    <transition name="cardbody" appear>
      <span v-if="isLoading">Loading...</span>
      <span v-else>
        <div class="flex flex-col items-center ">
          <DraftInfo ref="infoRef"/>
          <span :class="cardBoxClass">
            <CardBox @cardbox-clicked="onCardEvent('clicked')" ref="cardboxRef" />
          </span>
        </div>
      </span>
    </transition>
  </div>


</template>

<script setup lang="ts">
import { query } from 'composables/types/query'

const cardBoxClass = useCardBoxClass()
const supabase = useSupabaseClient()
const store = usePickStore()
const styles = useStyleStore()
const timerStore = useTimerStore()

const {data: cardData, pending: isLoading, error: err} = await useAsyncData(async ()=> {
    const {data } = await supabase
    .from('spells')
    .select('*')
    .eq('set_id', 7)
    return data as query[] 
})

const cardDataStore = useState('card-data', ()=> cardData)

store.$subscribe( (mutation, state)=> {
  if(state.pickIndex / state.packSize === 1)  {
    const router = useRouter()
    router.push({path: "/picks"})
    state.roundIndex++
    state.pickIndex = 0
  }
})

timerStore.$subscribe((mutation, state)=> {
    if(state.time <= 0 && store.getRoundIndex < 4) {
      console.log("timeout")
      timerStore.setTimer(10)
      onCardEvent("timeout")
    }
})

const animationClass = ref("cards-center")
const cardboxRef = ref<null | { timeoutPick: ()=> null }>(null)

async function onCardEvent(eventType: string) {
  if(eventType === "timeout"){
    cardboxRef.value?.timeoutPick()
  } else if (eventType === "clicked") {
    //console.log("caught click")
  }
  await styles.screenWipe(store.getRoundIndex % 2 === 0 ? true : false)
}

</script>

<style scoped>

.cardbox-small {
  @apply
  flex flex-wrap
  xl:w-92rem w-30rem
  gap-1 justify-center overflow-auto overflow-hidden
  transition-all duration-150 ease-linear
}
.cardbox-medium {
  @apply
  flex flex-wrap
  lg:w-88rem w-30rem
  gap-1 justify-center overflow-auto overflow-hidden
  transition-all duration-150 ease-linear
}
.cardbox-large {
  @apply
  flex flex-wrap
  xl:w-90rem w-64
  gap-1 justify-center overflow-auto overflow-hidden
  transition-all duration-150 ease-linear
}

.cardbox-left {
  @apply
  flex flex-wrap justify-center 
  xl:w-90 w-60
  gap-1 overflow-auto
  transform
  translate-x-full opacity-0
  transition-all duration-150 ease-linear
}

.cardbox-right {
  @apply
  flex absolute flex-wrap justify-center 
  xl:w-90 w-60
  gap-1 overflow-auto
  transform
  -translate-x-full opacity-0
  transition-all duration-150 ease-linear
}


.cardbody-enter-from { @apply opacity-0 }
.cardbody-enter-active {@apply transition-all duration-200 ease-linear}
.cardbody-enter-to {@apply opacity-100}


</style>