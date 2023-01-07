<template>
    <div class="flex flex-wrap md:flex-row sm:flex-col w-screen overflow-auto overflow-x-hidden  justify-center">
        <PickRow draggable="true"/>
    </div>

</template>

<script setup lang="ts">
    const draconicFilter = ref("draconic")
    definePageMeta({ layout: "picklayout"})

</script>