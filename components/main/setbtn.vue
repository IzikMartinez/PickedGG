<template>
    <span v-if="setPickedFlag" class="flex flex-col justify-center ">
        <NuxtLink :to="DraftLink">
            <MainDraftsealed btn-text="draft" :set="setname"/>
        </NuxtLink>
        <MainSetimg :setname="setname" @click="setPickedFlag = false"/>
        <NuxtLink :to="SealedLink">
            <MainDraftsealed btn-text="sealed" :set="setname"/>
        </NuxtLink>
    </span>
    <span v-else>
        <MainSetimg :setname="setname" @click="setPickedFlag = true"/>
    </span>
</template>

<script setup lang="ts">
const props = defineProps<{
    setname: string
}>()

const setPickedFlag = ref(false)
const DraftLink = computed(()=> "drafts/" + props.setname)
const SealedLink = computed(()=> "sealed/" + props.setname)

function handleClick() {
   setPickedFlag.value = true 
}
</script>
