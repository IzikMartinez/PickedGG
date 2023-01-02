<template>
    <PickNextbtn></PickNextbtn>
    <div class="flex flex-wrap flex-row w-5/6 overflow-auto">
    <PickRow :heroTypes="['ice', 'wizard', 'elemental']" />
    <PickRow :heroTypes="['draconic', 'ninja', 'illusionist']" />
    <PickRow :heroTypes="['generic']" />
    </div>

</template>

<script setup lang="ts">
    const draconicFilter = ref("draconic")



</script>