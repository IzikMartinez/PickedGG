<template>
    <div :class="barStyle">
        <div>
            <PickbarSearch />
        </div>
        <div class="flex flex-row" v-for="hero in heroes">
            <PickbarBtn :text="hero"/>
        </div>
    </div>
</template>

<script setup lang="ts"> 

const heroes = useHeroes() 
const barStyle = computed(()=> "bar-" + useSetName().value)

</script>

<style>

.bar-out {
    @apply
    flex flex-row w-screen flex-wrap xl:h-14 h-36 bg-red-900 top-0 left-0 items-center justify-center
}

.bar-upr {
    @apply
    flex flex-row w-screen xl:h-14 h-28 bg-darkteal top-0 left-0 items-center justify-center
}

</style>