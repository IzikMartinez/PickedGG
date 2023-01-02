<template>
    <div>
        <div class="btn" @click="visibleFlag = !visibleFlag" >{{text}}</div>
        <li :class="style" v-for="classtype in classTypes">
            <ul @click="onClick(classtype)">{{ classtype }}</ul>
        </li>
    </div>

</template>

<script setup lang="ts">

const props = defineProps<{
    classTypes: string[]
}>()
const emit = defineEmits<{
    (e: 'heroType', type: string): void
}>()

const text = ref(props.classTypes.at(0))
const visibleFlag = ref(false)
const style = computed(()=> visibleFlag.value ? "list-vis" : "list-invis")
const background = "bg-darkteal"

function onClick(classtype: string) {
    emit('heroType', classtype)
    text.value = classtype
    visibleFlag.value = false
}
</script>

<style scoped>
    .btn {
        @apply 
        flex flex-col
        w-32 h-12 text-white text-2xl bg-darkteal
        justify-center items-center
        cursor-pointer
        font-display

    }
    .list-invis {
        @apply 
        flex flex-col
        w-32 h-12 bg-cyan-900 text-white text-2xl 
        items-center justify-center
        font-display
        text-sm
        transform scale-0
        transition-all duration-100 ease-linear
    }
    .list-vis {
        @apply 
        flex flex-col
        w-32 h-12 bg-cyan-900 text-white text-2xl hover:bg-cyan-800
        items-center justify-center
        cursor-pointer
        font-display
        text-sm
        transform scale-100
        transition-all duration-100 ease-in
    }
</style>