<template>
  <div id="card-box" >
    <transition name="cardbody" appear>
      <!-- <span v-if="useIsLoading">Loading...</span>
      <span v-else> -->
        <div class="flex flex-col items-center justify-center w-screen">
          <DraftInfo ref="infoRef"/>
          <span :class="cardBoxClass">
           <CardBox @cardbox-clicked="onCardEvent('clicked')" ref="cardboxRef" :set_name="SET_NAME"/> 
            <!-- 
           <Card :card-props="cardData!.at(0) as Record" :picked-flag="false"></Card>
           <Card :card-props="cardData!.at(12) as Record" :picked-flag="false"></Card>
           <Card :card-props="cardData!.at(3) as Record" :picked-flag="false"></Card>
           <Card :card-props="cardData!.at(4) as Record" :picked-flag="false"></Card> -->
          </span>
        </div>
      <!-- </span> -->
    </transition>
  </div>
</template>

<script setup lang="ts">

definePageMeta({ layout: 'default'})
//const supabase = useSupabaseClient()
const route = useRoute()
const cardBoxClass = useCardBoxClass()
const store = usePickStore()
const styles = useStyleStore()
const timerStore = useTimerStore()

const SET_NAME = route.params.id as string

const {data, pending, error} = await useAsyncData('cards',
  ()=> useRecords
)

const cardDataStore = useState('card-data', ()=> data)

store.$subscribe( (mutation, state)=> {
  const router = useRouter()
  if(state.roundIndex === 2) {
    router.push({path: "/deckbuilder"})
  }
  else if(state.pickIndex / state.packSize === 1 && state.roundIndex !== 2)  {
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
  xl:w-90rem w-72
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
  flex flex-wrap justify-center 
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