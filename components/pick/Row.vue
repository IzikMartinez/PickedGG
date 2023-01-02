<template>
    <div class="flex flex-row items-center">
        <PickDropdown :class-types="heroTypes" @hero-type="(classtype)=> heroType = classtype"/>
        <PickArray :picks="picks" />
    </div>
</template>

<script setup lang="ts">
import { card } from 'composables/types/card';

const props = defineProps<{
    heroTypes: string[]
}>()

const heroType=ref(props.heroTypes.at(0))
const picks = computed(()=>usePickStore().picks.filter(x => x.card_type?.find(y=> y===heroType.value)))

</script>