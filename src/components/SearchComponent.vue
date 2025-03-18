<template>
  <div class="grid gap-2 w-full h-full relative">
    <div
      class="w-full bg-white rounded-sm text-black flex items-center gap-2 border border-gray-300 focus-within:border-blue-500 px-2 py-1">
      <UiIcon
        :icon="['fas', 'magnifying-glass']"
        size="sm"
        class="text-gray-500" />
      <input
        ref="inputRef"
        type="text"
        class="w-full py-1 outline-none"
        placeholder="Search for a city or airport"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput" />
    </div>

    <!-- Search Suggestions -->
    <ul
      v-if="(suggestions.length || loading) && isFocused"
      class="p-2 absolute top-full left-0 w-full bg-white border border-gray-300 rounded-sm z-10 text-black text-left text-sm"
      :class="{ 'mt-1': suggestions.length || loading }">
      <li v-if="loading" class="p-2 text-gray-500">Loading...</li>
      <li
        v-for="(place, index) in suggestions"
        :key="index"
        @mousedown.prevent="selectCity(place)"
        class="p-2 hover:bg-gray-200 cursor-pointer">
        {{ place.display_name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { useStore } from "vuex";

const emit = defineEmits(["focus", "blur"]);
const store = useStore();

const isFocused = ref(false);
const loading = ref(false);
const suggestions = ref<any[]>([]);

const fetchCitySuggestions = async (query: string) => {
  if (!query) return (suggestions.value = []);

  loading.value = true;
  try {
    const data = await (
      await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${
          import.meta.env.VITE_API_KEY
        }`
      )
    ).json();
    suggestions.value = data.length
      ? data.map((place: any) => ({
          display_name: `${place.name}, ${place.country}`,
          city: place.name,
          country_code: place.country,
        }))
      : [{ display_name: "No results found" }];
  } catch {
    suggestions.value = [{ display_name: "Error fetching data" }];
  } finally {
    loading.value = false;
  }
};

const handleInput = (event: Event) =>
  fetchCitySuggestions((event.target as HTMLInputElement).value);
const selectCity = (place: any) => {
  store.dispatch("updateCity", `${place.city},${place.country_code}`);
  suggestions.value = [];
  isFocused.value = false;
  emit("blur");
};

const handleFocus = () => {
  isFocused.value = true;
  emit("focus");
};
const handleBlur = () =>
  setTimeout(() => {
    isFocused.value = false;
    emit("blur");
  }, 200);
</script>
