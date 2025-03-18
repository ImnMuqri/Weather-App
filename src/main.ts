import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import store from "../store"; // Import Vuex store
import router from "./router";
import UiInput from "./UIComponent/UiInput.vue";
import UiIcon from "./UIComponent/UiIcon.vue";
import SearchComponent from "./components/SearchComponent.vue";
import ListComponent from "./components/ListComponent.vue";

const app = createApp(App);

// Register components globally
app.component("SearchComponent", SearchComponent);
app.component("ListComponent", ListComponent);

app.component("UiInput", UiInput);
app.component("UiIcon", UiIcon);

app.use(store); // Use Vuex store before mounting
app.use(router);
app.mount("#app");
