<template>
    <div class="flex lg:flex-row flex-col w-screen h-screen xl:(justify-center)">
        <div class="flex lg:flex-row sm:flex-col">
            <PickArray :picks="picks" />
        </div>
    </div>
</template>

<script setup lang="ts">

const picks = computed( useSearchPicks )

</script>