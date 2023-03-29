<template>
    <div class="">
        <div class="flex lg:flex-row sm:flex-col">
            <PickArray :picks="picks" />
        </div>
    </div>
</template>

<script setup lang="ts">

const picks = computed( useSearchPicks )

</script>