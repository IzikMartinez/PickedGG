<template>
    <div class="flex md:flex-row sm:flex-col w-screen justify-center">
        <div class="flex md:flex-row sm:flex-col ">
            <DeckArray :picks="picks" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { card } from 'composables/types/card';


function findDromai(item: string) {
    return item === 'illusionist' 
}

function findFai(item: string) {
    return item === 'ninja' || (item !== 'illusionist' && item === 'draconic')
}

const picks = computed( ()=> {
    switch(useActiveBtn().value) {
        case "generic": 
            return usePickStore().picks.filter(x=> x.card_type?.find(y => y === "generic"))
            break;
        case "fai": 
            return usePickStore().picks.filter(x=> !x.card_type?.includes("illusionist") && x.card_type?.includes('draconic') )
            break;
        case "dromai": 
            return usePickStore().picks.filter(x=> !x.card_type?.includes("ninja") && x.card_type?.includes('draconic') )
            break;
        case "iyslander": 
            return usePickStore().picks.filter(x=>
                x.card_type?.find(y=>y==="ice" || y==="wizard" || y==="elemental"))
            break;
        default: 
            return usePickStore().picks
            break;
    }
})

</script>