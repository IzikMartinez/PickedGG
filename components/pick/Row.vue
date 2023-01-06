<template>
    <div class="flex md:flex-row sm:flex-col w-screen items-center justify-center">
        <div class="flex md:flex-row sm:flex-col items-center">
            <PickArray :picks="picks" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { card } from 'composables/types/card';


function findDromai(item: string) {
    return item === 'illusionist' 
}

function findFai(item: string) {
    return item === 'ninja'
}

const picks = computed( ()=> {
    switch(useActiveBtn().value) {
        case "generic": 
            return usePickStore().picks.filter(x=> x.card_type?.find(y => y === "generic"))
            break;
        case "fai": 
            return usePickStore().picks.filter(x=> x.card_type?.find(findFai))
            break;
        case "dromai": 
            return usePickStore().picks.filter(x=> x.card_type?.find(findDromai))
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