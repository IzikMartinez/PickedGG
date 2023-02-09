<template>
    <div class="flex md:flex-row sm:flex-col w-screen justify-center">
        <div class="flex md:flex-row sm:flex-col ">
            <DeckArray :picks="picks" />
        </div>
    </div>
</template>

<script setup lang="ts">

const picks = computed( useSearchPicks )

</script>