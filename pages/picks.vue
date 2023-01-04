<template>
    <div class="flex flex-col items-center justify-center overflow-x-hidden">
        <div class="m-2">
        <PickNextbtn></PickNextbtn>
        </div>
        <div class="flex flex-wrap flex-row w-7/8 overflow-auto overflow-x-hidden">
            <PickRow :heroTypes="['ice', 'wizard', 'elemental']"   draggable="true"/>
            <PickDropZone />
            <PickRow :heroTypes="['draconic', 'ninja', 'illusionist']" />
            <PickRow :heroTypes="['generic']" />
        </div>
    </div>

</template>

<script setup lang="ts">
    const draconicFilter = ref("draconic")



</script>