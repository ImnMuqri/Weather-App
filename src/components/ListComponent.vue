<template>
  <div v-if="weatherList.length">
    <div
      v-if="currentLocationWeather"
      class="w-full rounded-2xl p-4 text-white mb-4 cursor-pointer"
      @click="
        $router.push({
          name: 'Detail',
        })
      "
      :style="{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }">
      <div class="flex justify-between items-center">
        <div class="text-left">
          <p class="font-semibold text-xl">My Location</p>
          <p>{{ currentLocationWeather.location }}</p>
        </div>
        <p class="text-5xl">
          {{ currentLocationWeather.temperature.slice(0, -1) }}
        </p>
      </div>
      <div class="flex justify-between items-center mt-4">
        <p>{{ currentLocationWeather.condition }}</p>
        <p>
          H: {{ currentLocationWeather.high.slice(0, -1) }} L:
          {{ currentLocationWeather.low.slice(0, -1) }}
        </p>
      </div>
    </div>

    <div
      v-for="(weather, index) in weatherList"
      :key="index"
      @click="
        $router.push({
          name: 'Detail',
          params: { weatherKey: weather.location },
        })
      "
      class="w-full rounded-2xl p-4 text-white mb-4 cursor-pointer"
      :style="{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }">
      <div class="flex justify-between items-center">
        <div class="text-left">
          <p class="font-semibold text-xl">{{ weather.location }}</p>
          <p class="text-md">{{ weather.time }}</p>
        </div>
        <p class="text-5xl">{{ weather.temperature.slice(0, -1) }}</p>
      </div>
      <div class="flex justify-between items-center mt-4">
        <p>{{ weather.condition }}</p>
        <p>
          H: {{ weather.high.slice(0, -1) }} L: {{ weather.low.slice(0, -1) }}
        </p>
      </div>
    </div>
  </div>
  <p v-else class="py-10 text-center text-gray-500">Loading weather data...</p>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from "vue";
import { useStore } from "vuex";

interface WeatherData {
  location: string;
  condition: string;
  temperature: string;
  high: string;
  low: string;
  time: string | null;
}
const store = useStore();
const selectedCities = computed(() => store.getters.getCities || []);
const weatherList = ref<WeatherData[]>([]);
const currentLocationWeather = ref<WeatherData | null>(null);

const apiKey = import.meta.env.VITE_API_KEY;

const backgroundImage = computed(() => {
  const currentHour = new Date().getHours();
  if (currentHour >= 19 || currentHour < 7) {
    return "src/assets/nightSky.jpeg"; // night image
  } else {
    return "src/assets/skyDay.jpg"; // day image
  }
});

function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

async function fetchWeather() {
  weatherList.value = [];

  for (const city of selectedCities.value) {
    const geoRes = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
    );
    const geoData = await geoRes.json();
    if (!geoData.length) continue;

    const { lat, lon } = geoData[0];

    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
    );
    const weatherData = await weatherRes.json();

    weatherList.value.push({
      location: `${weatherData.name}, ${weatherData.sys.country}`,
      condition: weatherData.weather[0].description,
      temperature: `${Math.round(weatherData.main.temp)}°C`,
      high: `${Math.round(weatherData.main.temp_max)}°C`,
      low: `${Math.round(weatherData.main.temp_min)}°C`,
      time: formatTime(weatherData.dt),
    });
  }
}

async function fetchCurrentLocation() {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      const city = await fetchCityName(latitude, longitude);
      if (city) await fetchWeatherForLocation(latitude, longitude);
    },
    () => {}
  );
}

async function fetchCityName(lat: number, lon: number): Promise<string | null> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.name ? `${data.name}, ${data.sys.country}` : null;
}

async function fetchWeatherForLocation(lat: number, lon: number) {
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
  );
  const weatherData = await weatherRes.json();

  currentLocationWeather.value = {
    location: `${weatherData.name}, ${weatherData.sys.country}`,
    condition: weatherData.weather[0].description,
    temperature: `${Math.round(weatherData.main.temp)}°C`,
    high: `${Math.round(weatherData.main.temp_max)}°C`,
    low: `${Math.round(weatherData.main.temp_min)}°C`,
    time: null,
  };
}

onMounted(() => {
  fetchCurrentLocation();
  fetchWeather();
});

watch(selectedCities, async () => {
  await nextTick();
  fetchWeather();
});
</script>
