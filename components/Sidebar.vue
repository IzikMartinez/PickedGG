<template>
  <div class="nav-bar">
     <!--- <NuxtLink to="/">
        <SidebarIcon file-name="home" tool-tip="Go home"></SidebarIcon>
      </NuxtLink> -->
      <SidebarIcon file-name="card-big" tool-tip="Big cards" @click="setCardSize('large')"></SidebarIcon>
      <SidebarIcon file-name="card-med" tool-tip="Medium cards" @click="setCardSize('medium')"></SidebarIcon>
      <SidebarIcon file-name="card-small" tool-tip="Small cards" @click="setCardSize('small')"></SidebarIcon>
      <!----<NuxtLink to="/about">
        <SidebarIcon file-name="about" tool-tip="About"></SidebarIcon>
      </NuxtLink>-->
  </div>

</template>

<script setup lang="ts">

function setCardSize(size: string) {
  const cardClass = useCardClass();
  const cardBoxClass = useCardBoxClass();
  if(size === "small") { cardClass.value = 'card-small group'; cardBoxClass.value = 'cardbox-small' } 
  else if (size=== "medium") { cardClass.value = 'card-medium group'; cardBoxClass.value = 'cardbox-medium'}
  else { cardClass.value = 'card-large group'; cardBoxClass.value = 'cardbox-large'}
}
</script>

<style scoped>
.nav-bar{
  @apply
  fixed xl:flex-col flex top-0 left-0
  justify-center
  xl:h-screen xl:w-16
  h-16 w-screen
  bg-gray-900 shadow-2xl
}

.card-btn-box {
  @apply fixed flex-col left-0 bottom-0 w-16 h-48 justify-center items-center bg-white
}


</style>