<template>
    <img :src="props.path" :alt=props.card_name  >
</template>

<script setup>
const props= defineProps({
    path: String,
    card_name: String
})


</script>