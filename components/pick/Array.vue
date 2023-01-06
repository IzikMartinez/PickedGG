<template>
    <span class="list">
    <div v-for="pick in props.picks" >
        <Card :cardProps="pick" :picked-flag="true" class="hover:z-1"></Card>
    </div>
    </span>
</template>

<script setup lang="ts">
import { card } from '~~/composables/types/card';

const props = defineProps<{
    picks: card[]
}>()
</script>

<style scoped>
.list{
    @apply
    flex lg:flex-row md:flex-col flex-wrap w-408 
}
</style>