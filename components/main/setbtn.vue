<template>
        <span v-if="chosenFlag" class="flex flex-col justify-center ">
            <NuxtLink :to="DraftLink">
                <MainDraftsealed btn-text="draft" :set="setname"/>
            </NuxtLink>
            <MainSetimg :setname="setname" :chosen="chosenFlag" @click="chosenFlag = false" />
            <NuxtLink :to="SealedLink">
                <MainDraftsealed btn-text="sealed" :set="setname"/>
            </NuxtLink>
        </span>
        <span v-else>
            <MainSetimg :setname="setname" :chosen="chosenFlag" @click="chosenFlag = true"/>
        </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    setname: string
}>()

const chosenFlag = ref(false)
const DraftLink = computed(()=> "drafts/" + props.setname)
const SealedLink = computed(()=> "sealed/" + props.setname)

function handleClick() {
   chosenFlag.value = true 
}
</script>

<style scoped>
</style>