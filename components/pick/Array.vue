<template>
    <span class="list">
    <div v-for="pick in props.picks" >
        <Card :cardProps="pick" :picked-flag="true" class="hover:z-1"></Card>
    </div>
    </span>
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';
import { card } from '~~/composables/types/card';

const props = defineProps<{
    picks: Record[]
}>()
</script>

<style scoped>
.list{
    @apply
    fixed flex flex-row flex-wrap w-screen h-screen 
    md:(top-10 pb-20 pt-0)
    xl:(top-16 left-6 pb-16 items-start justify-center) overflow-auto 
    top-36 left-0 pb-60 pt-8
}
</style>