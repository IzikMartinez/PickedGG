<template>
    <img :src="url" :alt=props.card_name  >
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';

const props = defineProps<{
    record_id: Record,
    cart_art: string,
    card_name: string  
}>()
const pb = usePocketbase 
const url = pb.getFileUrl(props.record_id, props.cart_art)

</script>