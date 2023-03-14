<template>
    <PickBar /> 
    <div :class="appStyle">
        <slot />
    </div>
</template>

<script setup lang="ts">
    const appStyle = computed(()=> "app-body-" + useSetName().value)
</script>

<style>
.app-body-out {
    @apply fixed flex flex-wrap justify-center xl:items-center overflow-auto
    xl:(top-14) top-28 
    w-screen h-screen
    bg-gradient-to-b from-blue-gray-800 to-black
}

.app-body-upr {
    @apply fixed flex flex-wrap justify-center xl:items-center overflow-auto
    xl:(top-14) top-28 
    w-screen h-screen
    bg-gradient-to-b from-red-900 to-black
}

</style>