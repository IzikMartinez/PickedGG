<template>
    <span class="nextbtn" @click="clickHandler">{{ buttonText }}</span>
</template>


<script setup lang="ts">
const props = defineProps<{
    buttonText: string
}>()

function clickHandler() {

    const decksize = useState('deck-size').value as number
    const router = useRouter()
    if (decksize >= 30)
        router.push("/")
}


</script>

<style>
    .nextbtn {
        @apply
        h-14 w-40 flex rounded-l-md bg-darkteal bg-teal-500
        xl:top-0 xl:right-0 xl:left-auto bottom-0 z-1 left-0 absolute p-2
        justify-center items-center hover:(bg-sky-400 rounded-l-3xl)
        font-display text-white text-center text-3xl 
        transition-all ease-linear duration-100 
    }
</style>