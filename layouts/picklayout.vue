<template>
    <PickBar class="flex flex-row w-screen xl:h-14 h-28 bg-darkteal top-0 left-0 items-center justify-center"/> 
    <div class="pick-body">
            <slot />
    </div>
</template>

<script setup lang="ts">

</script>

<style>

.pick-body {
    @apply fixed flex flex-wrap justify-center xl:items-center overflow-auto
    xl:(top-14) top-28 
    w-screen h-screen
    bg-gradient-to-b from-red-900 to-black
}
</style>