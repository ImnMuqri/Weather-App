<template>
  <div
    class="bg-white rounded-lg shadow-md h-[45rem] overflow-scroll no-scrollbar">
    <router-view />
  </div>
</template>
<style scoped>
/* .no-bottom-scrollbar {
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-width: thin;
  -ms-overflow-style: auto;
}

.no-bottom-scrollbar::-webkit-scrollbar {
  width: 8px;
  height: 0px;
} */

.no-scrollbar {
  overflow: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* Chrome, Safari */
}
</style>
