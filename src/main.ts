import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";
import { VueQueryPlugin } from "vue-query";

import "./assets/main.css";
import store from "@/store";

createApp(App).use(router).use(VueQueryPlugin).mount("#app");
