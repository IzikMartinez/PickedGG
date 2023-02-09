<template>
    <div class="flex md:flex-row sm:flex-col w-screen justify-center">
        <div class="flex md:flex-row sm:flex-col ">
            <PickArray :picks="picks" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { card } from 'composables/types/card';


const picks = computed( useSearchPicks )

</script>