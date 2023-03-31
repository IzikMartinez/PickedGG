<template>
    <div :class="barStyle">
        <div>
            <PickbarSearch />
        </div>
        <span class="flex flex-row justify-center md:(fixed right-2 w-1/2) xl:relative" >
            <div v-for="hero in heroes">
                <PickbarBtn :text="hero"/>
            </div>
        </span>
        <!--<DeckNextbtn button-text="Finish Deck"/>-->
    </div>
</template>

<script setup lang="ts"> 

const heroes = useHeroes() 
const barStyle = computed(()=> "bar-" + useSetName().value)

</script>

<style>

.bar-out {
    @apply
    fixed flex flex-wrap w-screen bg-red-900 top-0 left-0 
    sm:(h-32 flex-row)
    md:(justify-center h-10 flex-row)
    xl:(items-center justify-center h-14 flex-row)
}

.bar-upr {
    @apply
    fixed flex flex-row w-screen xl:h-14 h-28 bg-darkteal top-0 left-0 items-center justify-center
}

</style>
