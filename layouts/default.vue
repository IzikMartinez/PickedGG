<template>
    <div class="app-body">
        <Sidebar />
        <slot />
    </div>
</template>

<style>
.app-body {
    @apply fixed flex justify-center text-center
    xl:(top-0 left-16)
    top-16 left-0
    w-screen h-screen
    overflow-auto
    bg-gradient-to-b from-red-900 to-black
}
</style>