<template>
    <div :class="appstyle" >
        <slot />
    </div>
</template>

<script setup lang="ts">
    const appstyle = computed(()=> {
        if(useSetName().value === "out")
            return "app-body-out"
        else
            return "app-body-upr" })
</script>

<style scoped>
.app-body-out {
    @apply fixed flex justify-center text-center
    xl:(top-0 left-0)
    top-0 left-0
    w-screen h-screen
    overflow-auto
    bg-gradient-to-b from-blue-gray-900 to-black
    transition-all ease-in duration-300
}

.app-body-upr {
    @apply fixed flex justify-center text-center
    xl:(top-0 left-0)
    top-0 left-0
    w-screen h-screen
    overflow-auto
    bg-gradient-to-b from-red-900 to-black
    transition-all ease-in duration-300
}
</style>