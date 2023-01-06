<template>
    <div 
    @dragenter="toggleActive" 
    @dragleave="toggleActive"
    @dragover.prevent
    >
    <span :class="btnstyle"></span>
    </div>
</template>

<script setup lang="ts">
const active = ref(false)
const btnstyle = computed(()=> active.value ? "btn-active" : "btn")

function toggleActive() {
    active.value = !active.value;
}

function onDrop(payload: string[]) {
    console.log(payload)
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
        w-32 h-12 text-white text-2xl bg-sky-400
        rounded-none
        justify-center items-center
        cursor-pointer
        font-display
        transition-all duration-75 ease-in
    }
</style>