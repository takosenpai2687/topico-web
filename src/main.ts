import { createApp } from "vue";
import "@/styles/setup.css";
import "@/styles/global.scss";
import App from "./App.vue";
import router from "@/routes/router";
import { createPinia } from "pinia";
import VWave from "v-wave";
import FontAwesomeIcon from "@/util/icons";

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(VWave, {});

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");
