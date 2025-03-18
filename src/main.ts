import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "../store"; // Import Vuex store
import router from "./router";
const app = createApp(App);

app.use(store); // Use Vuex store before mounting
app.use(router);
app.mount("#app");
