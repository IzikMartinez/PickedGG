<template>
    <NuxtLayout name="sealed">
        <span v-if="pending">Loading..</span>
        <span v-else class="fixed flex flex-row flex-wrap w-10/12 h-screen top-16 left-20 pb-16 overflow-y-scroll overflow-x-hidden z-0">
                <div v-for="card in searchPicks" class="overflow-auto" @dragstart="startDrag($event, card)">
                    <Card :card-props="card" :picked-flag="true" />
                </div>
        </span>
        <DeckDropzone />
    </NuxtLayout>
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';
import Pack from '~~/composables/pack';

const route = useRoute()
const picks = usePickStore()
useCardClass().value = 'card-large'
const SET_NAME = route.params.id as string
const {data, pending, error} = await useAsyncData('cards',
  ()=> useRecords
)
const cardDataStore = useState('card-data', ()=> data)
useSetName().value = SET_NAME
const searchPicks = computed(useSearchPicks)

function startDrag(event: DragEvent, pick: Record) {
    if(event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('cardData', pick.card_id.toString())
    }
}

onBeforeMount(()=>{
    const packs = computed(()=>{
        let pack = [[]] as [Record[]]
        for(var i = 0; i<6; i++) {
            pack.push(useBuildPack())
        }
        return pack
    })
    packs.value.forEach(
        pack => pack.forEach(card => picks.addPick(card as Record)))
})
</script>
