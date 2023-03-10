<template>
    <img :src="url" :alt=props.card_name  >
</template>

<script setup lang="ts">
import { Record } from 'pocketbase';

const url = ref("")
const props = defineProps<{
    record_id: Record,
    cart_art: string,
    card_name: string  
}>()
const pb = usePocketbase 
onMounted(()=> {
    url.value = pb.getFileUrl(props.record_id, props.cart_art)
})

onUpdated( ()=> {
    url.value = pb.getFileUrl(props.record_id, props.cart_art)
})
</script>