<template>
    <NuxtLink :to="link">
    <img
        :src="path"
        :class="setClass"
        @click="handleClick"
        @mouseenter="useSetName().value = setname"
    >
    </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
    setname: string
}>()

const link = computed(()=> "drafts/" + props.setname)

const path = computed(()=> props.setname + "_logo.png")

const setClass = computed(()=> {
    if(props.setname == 'out')
        return "out"
    else if(props.setname === 'upr') 
        return "upr"
    else return "black"
})

function handleClick() {
    
}
</script>

<style scoped>
.out {
    @apply w-230 h-80 mx-2 my-4 p-6 rounded-3xl bg-outsiders
}
.upr {
    @apply w-230 h-80 mx-2 my-4 p-6 rounded-3xl bg-uprising
}
</style>