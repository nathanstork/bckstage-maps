import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import panZoom from "vue-panzoom";

import "./assets/main.css";

createApp(App).use(router).use(panZoom).mount("#app");
