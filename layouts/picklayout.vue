<template>
    <div :class="appStyle">
        <PickBar class="fixed z-2 top-0"/> 
        <Sidebar class="z-1"/>
        <slot />
    </div>
</template>

<script setup lang="ts">
    const appStyle = computed(()=> "app-body-" + useSetName().value)
</script>

<style scoped>
.app-body-out {
    @apply fixed flex flex-wrap justify-center xl:items-center 
    w-screen h-screen
    scrollbar scrollbar-w-0
    bg-gradient-to-b from-blue-gray-800 to-black
}

.app-body-upr {
    @apply fixed flex flex-wrap justify-center xl:items-center overflow-auto
    xl:(top-14) top-28 
    w-screen h-screen
    bg-gradient-to-b from-red-900 to-black
}

</style>