<template>
  <div class="text-black">
    <div>
      <div class="bg-blue-600 p-12 shadow-md grid gap-3 text-white">
        <div class="flex justify-between items-center">
          <UiIcon
            :icon="['fas', 'chevron-left']"
            size="md"
            @click="$router.push('/')" />
          <span class="font-semibold">{{ weatherData.current.name }}</span>
          <UiIcon
            :icon="['fas', 'trash-can']"
            size="md"
            class="hover:text-red-400 cursor-pointer" />
        </div>
        <p>{{ formattedNow }}</p>
        <div>
          <UiIcon :icon="['fas', 'cloud-sun-rain']" class="text-[5rem]" />
        </div>
        <p class="text-2xl">{{ weatherData.current.temp }}°C</p>
        <p class="text-lg font-bold capitalize">
          {{ weatherData.current.weather[0]?.description || "No data" }}
        </p>
        <span class="flex justify-center gap-2 items-center">
          Last Update
          <p class="uppercase">{{ formattedLastUpdate }}</p>
        </span>
      </div>

      <div class="bg-white px-1">
        <div class="m-4 grid gap-4">
          <h2 class="text-xl text-left font-semibold">Hourly Forecast</h2>
          <div class="flex overflow-scroll space-x-2 no-scrollbar">
            <div
              v-for="(hour, index) in weatherData.hourly"
              :key="index"
              class="p-2 bg-slate-100 rounded-lg text-center min-w-[100px]">
              <UiIcon
                :icon="['fas', 'cloud-sun-rain']"
                class="text-[1.5rem] text-slate-500" />
              <p class="text-lg font-semibold">{{ hour.temp }}°C</p>
              <p class="font-light">{{ formatTime(hour.dt) }}</p>
            </div>
          </div>
        </div>

        <div class="m-4 grid gap-4">
          <h2 class="text-xl text-left font-semibold">Weekly Forecast</h2>
          <div class="grid gap-4">
            <div
              v-for="(day, index) in weatherData.weekly"
              :key="index"
              class="p-4 bg-blue-100 rounded-xl flex justify-between items-center">
              <div class="flex gap-4">
                <UiIcon
                  :icon="['fas', 'cloud-sun-rain']"
                  class="text-[1.5rem] text-white bg-blue-400 rounded-full" />
                <div>
                  <p class="font-semibold">{{ formatDate(day.dt) }}</p>
                  <p>{{ day.weather[0]?.description || "No data" }}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <p class="text-lg font-semibold">{{ day.temp.day }}°C</p>
                <UiIcon :icon="['fas', 'chevron-right']" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const weatherData = ref({
  current: {
    name: "Kuala Lumpur",
    weather: [{ description: "Clear sky" }],
    temp: 30,
  },
  hourly: [
    { dt: 1677829200, temp: 30, weather: [{ description: "Clear sky" }] },
    { dt: 1677832800, temp: 29, weather: [{ description: "Clear sky" }] },
    { dt: 1677836400, temp: 28, weather: [{ description: "Few clouds" }] },
    { dt: 1677840000, temp: 28, weather: [{ description: "Few clouds" }] },
  ],
  weekly: [
    {
      dt: 1677770400,
      temp: { day: 30 },
      weather: [{ description: "Clear sky" }],
    },
    {
      dt: 1677856800,
      temp: { day: 29 },
      weather: [{ description: "Few clouds" }],
    },
    { dt: 1677943200, temp: { day: 28 }, weather: [{ description: "Cloudy" }] },
    {
      dt: 1678029600,
      temp: { day: 27 },
      weather: [{ description: "Light rain" }],
    },
    {
      dt: 1678116000,
      temp: { day: 26 },
      weather: [{ description: "Light rain" }],
    },
    {
      dt: 1678202400,
      temp: { day: 25 },
      weather: [{ description: "Clear sky" }],
    },
    {
      dt: 1678288800,
      temp: { day: 24 },
      weather: [{ description: "Clear sky" }],
    },
  ],
});

const currentDate = new Date();
const formattedNow = currentDate.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const lastUpdateDate = new Date(currentDate.getTime() - 2 * 60 * 60 * 1000);
const formattedLastUpdate = lastUpdateDate.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});

const formatTime = (timestamp: number) =>
  new Date(timestamp * 1000)
    .toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/^0/, "");

const formatDate = (timestamp: number) =>
  new Date(timestamp * 1000).toLocaleDateString(undefined, { weekday: "long" });
</script>

<style scoped>
.no-scrollbar {
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
