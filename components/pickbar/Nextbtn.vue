<template>
    <NuxtLink to="/">
        <span class="nextbtn">NEXT ROUND</span>
    </NuxtLink>
</template>

<style>
    .nextbtn {
        @apply
        h-12 w-52 flex rounded-md bg-darkteal bg-teal-500
        justify-center items-center hover:(bg-sky-400 rounded-3xl)
        font-display text-white text-center text-4xl 
        transition-all ease-linear duration-100 
    }
</style>