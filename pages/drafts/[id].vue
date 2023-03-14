<template>
  <div id="card-box" >
    <transition name="cardbody" appear>
      <span v-if="pending">Loading...</span>
      <span v-else> 
           <CardBox @cardbox-clicked="onCardEvent('clicked')" ref="cardboxRef" :set_name="SET_NAME"/> 
      </span> 
    </transition>
  </div>
</template>

<script setup lang="ts">

//const supabase = useSupabaseClient()
const route = useRoute()
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

</style>