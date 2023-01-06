<template>
    <div draggable="true" @dragstart="onDrag" class="flex absolute top-0">
        <div :class="btnstyle" @click="visibleFlag = !visibleFlag" >{{text}}</div>
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


const heroTypes = ["all", "draconic, iyslander"]
const heroSubtypes = ["ninja", "illusionist", "ice", "wizard", "elemental"]

const text = ref(props.classTypes.at(0))
const visibleFlag = ref(false)
const style = computed(()=> visibleFlag.value ? "list-vis" : "list-invis")
const btnstyle = computed( ()=> visibleFlag.value ? "btn-active" : "btn")
const background = "bg-darkteal"

function onClick(classtype: string) {
    emit('heroType', classtype)
    text.value = classtype
    visibleFlag.value = false
}

function onDrag() {
    console.log(props.classTypes)
}
</script>

<style scoped>
    .btn {
        @apply 
        flex flex-col
        w-32 h-12 text-white text-2xl bg-darkteal
        rounded-md
        justify-center items-center
        cursor-pointer
        font-display
    }
    .btn-active {
        @apply
        flex flex-col
        w-32 h-12 text-white text-2xl bg-teal-600
        rounded-none
        justify-center items-center
        cursor-pointer
        font-display
        transition-all duration-75 ease-in
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