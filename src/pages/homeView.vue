<template>
  <div class="p-8">
    <div class="grid gap-4 w-full h-full">
      <div class="w-full flex justify-between items-end text-white pb-2">
        <p class="text-left text-3xl text-black font-semibold">Weather</p>
        <UIIcon
          icon="user"
          size="lg"
          class="text-gray-500 hover:text-blue-500 cursor-pointer"
          @click="$router.push('/profile')" />
      </div>
      <SearchComponent
        @focus="isOpenSearch = true"
        @blur="isOpenSearch = false" />
      <div v-if="!isOpenSearch">
        <ListComponent />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UIIcon from "../UIComponent/UiIcon.vue";
import SearchComponent from "../components/SearchComponent.vue";
import ListComponent from "../components/ListComponent.vue";

const isOpenSearch = ref(false);
</script>
