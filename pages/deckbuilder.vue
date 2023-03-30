<template>
        <NuxtLayout name="sealed">
                <DeckArray :picks="picks" />
                <DeckDropzone />
        </NuxtLayout>
</template>

<script setup lang="ts">
const picks = computed( useSearchPicks )
</script>