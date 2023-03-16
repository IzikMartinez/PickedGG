<template>
        <img
            :src="path"
            :class="setClass"
            :border="rounded"
            @mouseenter="useSetName().value = setname"
            @click="rounded = 'rounded-none'"
        >
</template>

<script setup lang="ts">
    const props = defineProps<{
        setname: string
    }>()
    const path = computed(()=> props.setname + "_logo.png")
    const setClass = computed(()=> {
        if(props.setname == 'out')
            return "out"
        else if(props.setname === 'upr') 
            return "upr"
        else return "black"
    })
    const rounded = ref("rounded-3xl")
</script>

<style scoped>
.out {
    @apply xl:(w-230 h-80) w-90 h-40 p-6 bg-out cursor-pointer
}
.upr {
    @apply xl:(w-230 h-80) w-90 h-40 mx-2 my-4 p-6 rounded-3xl bg-upr cursor-pointer 
}
</style>