<template>
    <div class="flex flex-row w-screen xl:w-auto xl:absolute left-3 xl:top-2 top-0">
        <input type="text" id="searchbar" name="searchbar" class="search-bar" v-model="search_text" @focus="search_text = ''" @focusout="search_text='SEARCH...'">
        <img src="/trash.svg" class="w-10 h-10 md:(h-8 w-8) xl:(w-9 h-10) bg-blue-gray-600 rounded-r-lg p-1.5 cursor-pointer" @click="search_text = 'SEARCH...'">
    </div>
</template>

<script setup lang="ts">
const search_text = useState('search', ()=> ref('SEARCH...'))

</script>

<style scoped>

.search-bar {
@apply
h-10 w-96  p-2
md:(h-8 w-64)
xl:(h-10 w-96)
rounded-tl-lg
opacity-70
focus:(opacity-100 rounded-tl-none rounded-bl-lg outline-none)
transition-all duration-150 ease-linear
}
</style>