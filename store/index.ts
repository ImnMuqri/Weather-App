import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";

const vuexPersist = new VuexPersistence({
  storage: localStorage, // Persist state in localStorage
  key: "weather_app", // Key for localStorage
});

export default createStore({
  state: {
    selectedCities: ["Kuala_Lumpur,MY"], // Default city
  },

  mutations: {
    setCity(state, city: string) {
      if (!city || typeof city !== "string") return;

      // Remove duplicate city
      state.selectedCities = state.selectedCities.filter((c) => c !== city);

      // Add city to the beginning of the array
      state.selectedCities.unshift(city);

      // Limit stored cities to 5
      if (state.selectedCities.length > 5) {
        state.selectedCities.pop();
      }
    },
  },

  actions: {
    updateCity({ commit }, city: string) {
      commit("setCity", city);
    },
  },

  getters: {
    getCities: (state) => state.selectedCities,
  },

  plugins: [vuexPersist.plugin], // Enable vuex-persist
});
