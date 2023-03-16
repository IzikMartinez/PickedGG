<template>
    <span
    class="flex text-5xl font-display xl:w-230 w-90 py-4 text-center justify-center text-white items-center cursor-pointer"
    bg="out"
    :border="roundTB"
    >{{ btnText }}</span>
</template>

<script setup lang="ts">
const props = defineProps<{
    btnText: string
    set: string
}>()

const roundTB = computed(()=> props.btnText === "draft" ? "rounded-t-3xl" : "rounded-b-3xl")

</script>
