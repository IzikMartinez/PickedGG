<template>
    <span
    :class="styleTB"
    bg="out"
    >{{ btnText }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
    btnText: string
    set: string
}>()

const roundTB = computed(()=> props.btnText === "draft" ? "rounded-t-3xl" : "rounded-b-3xl")
const styleTB = computed(()=> props.btnText === "draft" ? 'top' : 'btm')

</script>

<style>
.top { @apply flex text-5xl font-display xl:w-230 w-90 py-4 text-center 
    justify-center text-white rounded-t-3xl items-center cursor-pointer 
    transform
    transition-all duration-150
}

.btm { @apply flex text-5xl font-display xl:w-230 w-90 py-4 
    text-center justify-center text-white rounded-b-3xl items-center cursor-pointer 
    transform
    transition-all duration-150
}
</style>
