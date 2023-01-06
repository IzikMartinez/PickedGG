<template>
    <PickBar /> 
    <div class="pick-body">
        <slot />
    </div>
</template>

<script setup lang="ts">

</script>

<style>
.pick-body {
    @apply fixed flex justify-center text-center
    top-16 left-0
    w-screen h-screen
    overflow-auto
    bg-gradient-to-b from-red-900 to-black
}
</style>